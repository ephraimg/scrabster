
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { Player } from './player';
import { Board } from './board';
import { Play } from './play';
import { Bag } from './bag';

export class Game {

    // id, squares, tiles, playHistory are optional (supply to continue a game)
    constructor(user1, user2, id, squares, tiles, playHistory) {
        this.player1 = new Player(user1);
        this.player2 = new Player(user2);
        this.id = id || uuidv4();
        this.board = new Board(squares);
        this.bag = new Bag(tiles);
        this.playHistory = playHistory || [];
        this.currentPlay = null;
        this.currentPlayer.fillRack(this.bag);
        this.nextPlay();
        this.tilesToExchange = [];
    }

    get currentPlayer() {
        return this.playHistory.length % 2 === 0
            ? this.player1 : this.player2;
    }
    
    get otherPlayer() {
        return this.playHistory.length % 2 === 0
            ? this.player2 : this.player1;
    }
    
    get gameOver() {
        return this.otherPlayer.rack.count + this.bag.count < 1
    }
    
    exchangeTile(tile) {
        if (this.currentPlay.placements.length > 0) { this.clearPlay(); }
        this.tilesToExchange.push(tile);
        this.currentPlayer.rack.remove(tile);
    }
    
    clearExchange() {
    const ttx = this.tilesToExchange;
        while (ttx.length > 0) { this.currentPlayer.rack.add(ttx.pop()); }
    }
    
    clearPlay() {
        const sqs = this.currentPlay.placements;
        for (let i = sqs.length - 1; i >= 0; i--) {
            this.currentPlayer.rack.add(sqs[i].tile);
            this.currentPlay.removeTile(sqs[i], sqs[i].row, sqs[i].col);
        }
    }
    
    submitPlay() {
        if (this.tilesToExchange.length > 0 && this.currentPlay.placements.length > 0) {
        // this shouldn't happen, so reset the play!
            return this.clearPlay();
        }
        const { board, player, ...rest } = this.currentPlay; 
        if (this.tilesToExchange.length > 0) {
        // the player is trying to exchange tiles
            this.currentPlayer.fillRack(this.bag);
            while (this.tilesToExchange.length > 0) {
                this.bag.receiveTile(this.tilesToExchange.pop());
            }
            console.log(`${player.name}'s play: 0 (tile exchange)`);
            this.playHistory.push({ player: player.id, score: 0, ...rest }); 
            // now currentPlayer has changed!
            this.savePlayToDB();
            this.nextPlay();           
        }
        if (this.currentPlay.placements.length > 0 && this.currentPlay.isValid) {
        // the player is trying to make a play
            const playScore = this.currentPlay.score
            this.currentPlayer.score += playScore;
            const plainWords = this.currentPlay.plainWords.join(', ');
            console.log(`${player.name}'s play: ${playScore} for ${plainWords}`);
            this.playHistory.push({ player: player.id, score: playScore, ...rest });
            // now currentPlayer has changed!
            this.savePlayToDB();
            this.gameOver ? this.handleGameOver() : this.nextPlay(); 
        }

    }

    savePlayToDB() {
        axios.post('/games', {            
            id: this.id,
            player1: this.player1, 
            player2: this.player2,
            squares: this.board.squares,
            tiles: this.bag.tiles,
            playHistory: this.playHistory
        })
        .then(response => {
            console.log('Received axios response: ', response);
        });
    }
    
    nextPlay() {
        this.otherPlayer.fillRack(this.bag);
        this.currentPlay = new Play(this.playHistory.length, this.board, this.currentPlayer);
    }
    
    handleGameOver() {
        console.log('Game over!');
        const pointsLeft = this.otherPlayer.rack.tiles.reduce((a, t) => a + t.points, 0);
        this.otherPlayer.score -= pointsLeft;
        this.currentPlayer.score += pointsLeft;
        console.log(
            `Scores: ${this.currentPlayer.name} ${this.currentPlayer.score}, 
            ${this.otherPlayer.name} ${this.otherPlayer.score}`
        );
    }

}
