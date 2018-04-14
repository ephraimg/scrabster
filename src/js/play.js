
class Play {
    constructor(playNumber, board, player) {
        this.playNumber = playNumber;
        this.board = board;
        this.player = player;
        this.placements = []; 
        // remember square.tile give you tile
    }
    placeTile(tile, row, col) {
        const square = this.board.getSquare(row, col);
        if (square.tile !== null) { return false; }
        this.board.placeTile(tile, row, col);
        this.placements.push(square);
        this.player.rack.remove(tile);
        return true;
    }
    removeTile(tile, row, col) {
        const square = this.board.getSquare(row, col);
        if (square.tile === null) { return false; }
        this.board.removeTile(tile, row, col);
        this.placements.splice(this.placements.indexOf(tile), 1);
        this.player.rack.add(tile);
        return true;
    }
    get squares() {
        const compare = (sq1, sq2) => {
            if (sq1.row === sq2.row) { return sq1.col - sq2.col; }
            return sq1.row - sq2.row;
        }
        return Array.from(this.placements).sort(compare);
    }
    get words() {
        return getAllWords(this);
    }
    get plainWords() {
        return getAllWords(this).map(w => {
            return w.map(sq => sq.tile.letter).join('');
        });
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
        if (this.playNumber === 0) {
            if (!playSquares.some(sq => sq.row === 7 && sq.col === 7)) { return false; }
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

// module.exports = Play;
