
export class Play {
    constructor(playNumber, board) {
        this.board = board;
        this.playNumber = playNumber;
        this.placements = new Map(); // tile => [row, col]
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
    isValid() {
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


        
    }
}