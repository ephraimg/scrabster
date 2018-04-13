
class Board {
    constructor() {
        this.squares = Array(15).fill(null).map((row, ridx) => 
            Array(15).fill(null).map((col, cidx) => ({ row: ridx, col: cidx, bonus: null, tile: null }))
        );
    }
    getSquare(row, col) {
        return this.squares[row][col];
    }
    placeTile(tile, row, col) {
        this.squares[row][col].tile = tile;
    }
    removeTile(tile, row, col) {
        this.squares[row][col].tile = null;
    }
    display() {
        const disp = this.squares.map(row => {
            return row.map(sq => sq.tile ? `[${sq.tile.letter}]` : '[ ]').join(' ');
        })
        console.log('\nCurrent board:\n');
        console.log(disp.join('\n\n'));
    }
}

// module.exports = Board;
