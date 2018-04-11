
export class Board {
    constructor() {
        this.squares = Array(15).fill(null).map(row => 
            Array(15).fill(null).map(col => { row, col, bonus: null, tile: null });
        );
    }
    getSquare(row, col) {
        return this.squares[row][col];
    }
    placeTile(tile, row, col) {
        this.getSquare(row, col).tile === tile;
    }
    removeTile(tile, row, col) {
        this.getSquare(row, col).tile === null;
    }
    display() {
        console.log('\nCurrent board:\n', this.squares.join('\n'));
    }
}