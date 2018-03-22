
class Tile {
    constructor(letter, value) {
        this.letter = letter;
        this.points = points;
    }
}

class Bag {
    constructor() {
        this.tiles = [];
        const tileTypes = [
            { letter: '_', points: 0, count: 2 },
            { letter: 'A', points: 9, count: 1 },
            { letter: 'B', points: 3, count: 2 },
            { letter: 'C', points: 3, count: 2 },
            { letter: 'D', points: 2, count: 4 },
            { letter: 'E', points: 1, count: 12 },
            { letter: 'F', points: 4, count: 2 },
            { letter: 'G', points: 2, count: 3 },
            { letter: 'H', points: 4, count: 2 },
            { letter: 'I', points: 1, count: 9 },
            { letter: 'J', points: 8, count: 1 },
            { letter: 'K', points: 5, count: 1 },
            { letter: 'L', points: 1, count: 4 },
            { letter: 'M', points: 3, count: 2 },
            { letter: 'N', points: 1, count: 6 },
            { letter: 'O', points: 1, count: 8 },
            { letter: 'P', points: 3, count: 2 },
            { letter: 'Q', points: 10, count: 1 },
            { letter: 'R', points: 1, count: 6 },
            { letter: 'S', points: 1, count: 4 },
            { letter: 'T', points: 1, count: 6 },
            { letter: 'U', points: 1, count: 4 },
            { letter: 'V', points: 4, count: 2 },
            { letter: 'W', points: 4, count: 2 },
            { letter: 'X', points: 8, count: 1 },
            { letter: 'Y', points: 4, count: 2 },
            { letter: 'Z', points: 10, count: 1 },
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
        this.score = 0;
    }
}

class Board {
    constructor() {
        this.squares = Array(15).fill(null).map(sq => Array(15).fill(null));
    }
}

class Play {
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

class Game {
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

