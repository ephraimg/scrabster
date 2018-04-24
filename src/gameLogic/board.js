
// fill in upper-left quadrant, then we'll copy/flip it
const ULbonuses = {};
for (let i = 0; i < 8; i++) { ULbonuses[i] = {}; }
// triple-word scores
[0, 7].forEach(n => {
    [0, 7].forEach(m => ULbonuses[n][m] = 'tws');
});
// triple-letter scores
[1, 5].forEach(n => {
    [1, 5].forEach(m => ULbonuses[n][m] = 'tls');
});
// double-word scores
[1, 2, 3, 4, 7].forEach(n => {
    ULbonuses[n][n] = 'dws';
});
// double-letter scores
[[0, 3], [2, 6], [3, 7], [6, 6]].forEach(nm => {
    ULbonuses[nm[0]][nm[1]] = 'dls';
    ULbonuses[nm[1]][nm[0]] = 'dls';
})
// copy / flip UL quadrant to complete board
const bonuses = Object.assign({}, ULbonuses);
for (let i = 8; i < 15; i++) { bonuses[i] = {}; }
for (let i = 0; i < 8; i++) { 
    for (let j = 0; j < 8; j++) { 
        bonuses[i][14 - j] = ULbonuses[i][j];
        bonuses[14 - i][j] = ULbonuses[i][j];
        bonuses[14 - i][14 - j] = ULbonuses[i][j];        
    }
}
// fix the center
bonuses[7][7] = 'star';


export class Board {
    constructor() {
        this.squares = Array(15).fill(null).map((row, ridx) => {
            return Array(15).fill(null).map((col, cidx) => {
                return new Square(ridx, cidx, bonuses[ridx][cidx]);
            });
        });
    }
    getSquare(row, col) {
        if (!this.squares[row]) { return undefined; }
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

export class Square {
    constructor(row, col, bonus, tile) {
        this.row = row;
        this.col = col;
        this.bonus = bonus;
        this.tile = tile;
    }
}