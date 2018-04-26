
import { cloneDeep } from 'lodash';

import { Player } from './player';
import { Board } from './board';
import { Play } from './play';
import { Bag } from './bag';

export class Game {
    // squares, tiles, playHistory are optional (supply to continue a game)
    constructor(user1, user2, squares, tiles, playHistory) {
        this.player1 = new Player(user1);
        this.player2 = new Player(user2);
        this.board = new Board(squares);
        this.bag = new Bag(tiles);
        this.playHistory = playHistory || [];
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
    clearExchange() {
        const ttx = this.tilesToExchange;
        while (ttx.length > 0) {
            this.currentPlayer.rack.add(ttx.pop());
        }
    }
    exchangeTile(tile) {
        if (this.currentPlay.placements.length > 0) {
            this.clearPlay();
        }
        this.tilesToExchange.push(tile);
        this.currentPlayer.rack.remove(tile);
        console.log('New ttx: ', this.tilesToExchange);
        console.log('New rack: ', this.currentPlayer.rack);
    }
    clearPlay() {
        const sqs = this.currentPlay.placements;
        for (let i = sqs.length - 1; i >= 0; i--) {
            this.currentPlayer.rack.add(sqs[i].tile);
            this.currentPlay.removeTile(sqs[i], sqs[i].row, sqs[i].col);
        }
    }
    submitPlay() {
        if (this.tilesToExchange.length > 0 && this.currentPlay.isValid) {
            // this shouldn't happen, so reset the play!
            this.clearPlay();
        } else if (this.tilesToExchange.length > 0) {
            // the player is trying to exchange tiles
            this.currentPlayer.fillRack(this.bag);
            while (tilesToExchange.length > 0) {
                this.bag.receiveTile(tilesToExchange.pop());
            }
            const { board, player, ...rest } = this.currentPlay; 
            this.playHistory.push({
                player: player.id,
                score: playScore,
                ...rest
            }); // now currentPlayer has changed!
            this.nextPlay();           
        } else if (this.currentPlay.isValid) {
            // the player is trying to make a play
            const playScore = this.currentPlay.score
            this.currentPlayer.score += playScore;
            const { board, player, ...rest } = this.currentPlay; 
            this.playHistory.push({
                player: player.id,
                score: playScore,
                ...rest
            }); // now currentPlayer has changed!
            if (!this.gameOver) { 
                this.nextPlay(); 
            } else {
                this.handleGameOver();
            }
        }
    }
    nextPlay() {
        this.otherPlayer.fillRack(this.bag);
        this.currentPlay = new Play(this.playHistory.length, this.board, this.currentPlayer);
        // console.log('this.currentPlay: ', this.currentPlay);
    }
    get gameOver() {
        return this.currentPlayer.rack.count + this.bag.count < 1
    }
    handleGameOver() {
        console.log('Game over!');
        const pointsLeft = otherPlayer.rack.tiles.reduce((a, t) => a + t.points, 0);
        otherPlayer.score -= pointsLeft;
        currentPlayer.score += pointsLeft;
        console.log(`Scores: ${currentPlayer.name} ${currentPlayer.score}, ${otherPlayer.name} ${otherPlayer.score}`)
    }
}
