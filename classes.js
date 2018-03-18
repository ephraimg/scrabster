
class Tile {
    constructor(letter, value) {
        this.letter = letter;
        this.value = value;
    }
}

class Bag {
    constructor() {
        this.tiles = [];
        const tileTypes = [
            { letter: '_', value: 0, count: 2 },
            { letter: 'A', value: 9, count: 1 },
            { letter: 'B', value: 3, count: 2 },
            { letter: 'C', value: 3, count: 2 },
            { letter: 'D', value: 2, count: 4 },
            { letter: 'E', value: 1, count: 12 },
            { letter: 'F', value: 4, count: 2 },
            { letter: 'G', value: 2, count: 3 },
            { letter: 'H', value: 4, count: 2 },
            { letter: 'I', value: 1, count: 9 },
            { letter: 'J', value: 8, count: 1 },
            { letter: 'K', value: 5, count: 1 },
            { letter: 'L', value: 1, count: 4 },
            { letter: 'M', value: 3, count: 2 },
            { letter: 'N', value: 1, count: 6 },
            { letter: 'O', value: 1, count: 8 },
            { letter: 'P', value: 3, count: 2 },
            { letter: 'Q', value: 10, count: 1 },
            { letter: 'R', value: 1, count: 6 },
            { letter: 'S', value: 1, count: 4 },
            { letter: 'T', value: 1, count: 6 },
            { letter: 'U', value: 1, count: 4 },
            { letter: 'V', value: 4, count: 2 },
            { letter: 'W', value: 4, count: 2 },
            { letter: 'X', value: 8, count: 1 },
            { letter: 'Y', value: 4, count: 2 },
            { letter: 'Z', value: 10, count: 1 },
        ];
        tileTypes.forEach(tileType => {
            for (let i = 0; i < tileType.count; i++) {
                this.tiles.push(new Tile(tileType.letter, tileType.value));
            }
        })
    }
    draw() {
        const randomIdx = Math.floor(Math.random() * this.tiles.length);
        return this.tiles.splice(randomIdx, 1)[0];
    }
    fill(rack) {
        while (rack.tiles.length < 7) {
            rack.tiles.push(this.draw());
        }
        return rack;
    }
    exchange(tile, rack) {
        const randomIdx = Math.floor(Math.random() * this.tiles.length);
        rack.indexOf(tile) = this.tiles[randomIdx];
        this.tiles[randomIdx] = tile;
        return rack;
    }
    get count() {
        return this.tiles.length;
    }
}

class Rack {
    constructor() {
        this.tiles = [];
    }
    shuffle() {
        let i = 0;
        let j = 0;
        let temp = null;
        for (i = this.tiles.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.tiles[i];
            this.tiles[i] = this.tiles[j];
            this.tiles[j] = temp;
        }
    }
}

class Player {
    constructor() {
        this.rack = new Rack();
    }
}

class Board {
    constructor() {
        this.squares = Array(15).fill(null).map(sq => Array(15).fill(null));
    }
    place(tile, square) {
        if (square[0] !== null) { return false; }
        square[0] = tile;
        return true;
    }
    remove(square) {
        if (square[0] === null) { return false; }
        return square[0];
    }
}

class Play {
    constructor() {
        // maps square => tile
        this.placements = new Map();
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
            word.forEach(tile => sum += tile.value);
        })
        return sum;
    }
    isValid() {

    }
    submit() {

    }
}

class Game {
    constructor(user1, user2) {
        this.player1 = new Player(user1);
        this.player2 = new Player(user2);
        this.board = new Board();
        this.bag = new Bag();
        this.history = [];
        this.currentPlayer = player1;
        this.currentPlay = [];
    }
}

