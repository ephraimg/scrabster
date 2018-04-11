
export class Play {
    constructor(playNumber, board, player) {
        this.playNumber = playNumber;
        this.board = board;
        this.player = player;
        // for convenience, get from placed tiles to squares
        this.placements = new Map(); // tile => square
    }
    placeTile(tile, row, col) {
        const square = this.board.getSquare(row, col);
        if (square.tile !== null) { return false; }
        this.board.placeTile(tile, row, col);
        this.currentPlay.placements.set(tile, square);
        this.player.rack.remove(tile);
        return true;
    }
    removeTile(tile, row, col) {
        const square = this.board.getSquare(row, col);
        if (square.tile === null) { return false; }
        this.board.removeTile(tile, row, col);
        this.currentPlay.placements.delete(tile);
        this.player.rack.add(tile);
        return true;
    }
    get squares() {
        const compare = (sq1, sq2) => {
            if (sq1[0] === sq2[0]) { return sq1[1] - sq2[1]; }
            return sq1[0] - sq2[0];
        }
        return Array.from(this.placements.values()).sort(compare);
    }
    get words() {
        const wordsPlayed = new Set();
        // check all rows and cols with placements?
        // words will be arrays of tiles?
        return wordsPlayed;
    }
    get score() {
        let sum = 0;
        this.words.forEach(word => {
            word.forEach(tile => sum += tile.points);
        })
        return sum;
    }
    get isValid() {
        const playSquares = this.squares;
        // if this is first play, check that it crosses center
        if (this.playHistory.length === 0) {
            if (!playSquares.some(sq => sq[0] === 8 && sq[1] === 8)) { return false; }
        }
        // check if word played is in a straight line
        let rowAligned = true;
        let colAligned = true;
        for (let i = 1; i < playSquares.length; i++) {
            if (playSquares[i][0] !== playSquares[i - 1][0]) { rowAligned = false; }
            if (playSquares[i][1] !== playSquares[i - 1][1]) { colAligned = false; }
        }
        if (!rowAligned && !colAligned) { return false; }
        // check if word played is contiguous (if > 1)
        if (playSquares.length > 1 && rowAligned) {
            for (let i = 0; i < playSquares.length; i++) {
                if (playSquares[i][0] === null) { return false; }
            }
        } else if (playSquares.length > 1 && colAligned) {
            for (let i = 0; i < playSquares.length; i++) {
                if (playSquares[i][1] === null) { return false; }
            }
        }
        // check if word abuts previous word

        return true;
        
    }
}