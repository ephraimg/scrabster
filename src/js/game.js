
// const Player = require('./player');
// const Board = require('./board');
// const Play = require('./play');
// const Bag = require('./bag');

// import { Player } from './player';
// import { Board } from './board';
// import { Play } from './play';
// import { Bag } from './bag';

class Game {
    constructor(user1, user2, /* to continue: */ board, bag, playHistory, currentPlayer, currentPlay) {
        this.player1 = new Player(user1);
        this.player2 = new Player(user2);
        this.board = board || new Board();
        this.bag = bag || new Bag();
        this.playHistory = playHistory || [];
        this.currentPlayer = currentPlayer || this.player1;
        this.currentPlay = currentPlay || new Play(this.playHistory.length, this.board, this.currentPlayer);
        this.player1.fillRack(this.bag);
        this.player2.fillRack(this.bag);
    }
    get otherPlayer() {
        return this.currentPlayer === this.player1
            ? this.player2 : this.player1;
    }
    // resume(gameData) {
    //     // make sure this game hasn't been started already!
    //     if (this.playHistory.length > 0) { return; } // throw error?
    //     // set all game properties to be the provided values
    //     this.player1 = gameData.player1;
    //     this.player2 = gameData.player2;
    //     this.board = gameData.board;
    //     this.bag = gameData.bag;
    //     this.playHistory = gameData.playHistory;
    //     this.currentPlayer = gameData.player1;
    //     this.currentPlay = new Play(gameData.playHistory.length, gameData.board);
    // }
    submitPlay() {
        if (this.currentPlay.isValid) {
            this.currentPlayer.score += this.currentPlay.score;
            this.currentPlayer.fillRack(this.bag);
            this.playHistory.push(this.currentPlay);
            if (!this.gameOver) {
                this.nextPlay();
            }
        } else {
            console.log('Error: Invalid play');
        }
    }
    nextPlay() {
        this.currentPlayer = this.otherPlayer;
        this.currentPlay = new Play(this.playHistory.length, this.board, this.currentPlayer);
    }
    get gameOver() {
        if (this.currentPlayer.rack.count + this.bag.count < 1) {
            console.log('Game over!');
            const pointsLeft = otherPlayer.rack.tiles.reduce((a, t) => a + t.points, 0);
            otherPlayer.score -= pointsLeft;
            currentPlayer.score += pointsLeft;
            console.log(`Scores: ${currentPlayer.name} ${currentPlayer.score}, ${otherPlayer.name} ${otherPlayer.score}`)
            // deal with storing stuff in data archives
        }
    }
}

// module.exports = Game;
