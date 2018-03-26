
export class Game {
    constructor(user1, user2) {
        this.player1 = new Player(user1);
        this.player2 = new Player(user2);
        this.board = new Board();
        this.bag = new Bag();
        this.playHistory = [];
        this.currentPlayer = this.player1;
        this.currentPlay = new Play(this.playHistory.length, this.board);
    }
    placeTile(tile, row, col) {
        if (this.board[row][col] !== null) { return false; }
        this.board[row][col] = tile;
        this.currentPlay.placements.set(tile, [row, col]);
        this.currentPlayer.rack.splice(this.currentPlayer.rack.indexOf(tile), 1);
        return true;
    }
    removeTile(tile, square) {
        if (this.board[row][col] === null) { return false; }
        this.currentPlay.placements.delete(tile);
        this.currentPlayer.rack.push(tile);
        return true;
    }
    submitPlay() {
        if (this.currentPlay.isValid()) {
            this.playHistory.push(this);
            this.nextPlay();
        }
    }
    nextPlay() {
        this.currentPlayer = this.currentPlayer === this.player1
            ? this.player2
            : this.player1;
        this.currentPlay = new Play(this.playHistory.length, this.board);
    }
}