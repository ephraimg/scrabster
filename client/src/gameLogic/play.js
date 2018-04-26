
import { cloneDeep } from 'lodash';

import { getAllWords, crossesCenter, formsLine, isContiguous, isConnected } from './playHelpers';

export class Play {
    constructor(playNumber, board, player) {
        this.playNumber = playNumber;
        this.board = board;
        this.player = player;
        this.startRack = cloneDeep(player.rack.tiles);
        this.placements = []; 
        // remember square.tile give you tile
    }
    placeTile(tile, row, col) {
        const square = this.board.getSquare(row, col);
        // console.log('placeTile called. square: ', square, '; square.tile: ', square.tile);
        // console.log('placeTile square: ', square, '; ', row, col);
        if (square.tile) { return false; }
        this.board.placeTile(tile, row, col);
        this.placements.push(square);
        this.player.rack.remove(tile);
        return true;
    }
    removeTile(tileOrSquare, row, col) {
        let square;
        let tile;
        if (tileOrSquare.row) { // check if it's a square
            square = tileOrSquare;
            if (square.tile === null) { return false; }
            tile = square.tile;
        } else if (tileOrSquare.letter) { // check if it's a tile
            tile = tileOrSquare;
            square = this.board.getSquare(row, col);
        }      
        this.board.removeTile(tile, row, col);
        const placementsIdx = this.placements.indexOf(square);
        this.placements.splice(placementsIdx, 1);
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
        const wordsPlayed = this.words;
        // console.log('Placements: ', this.placements.map(p => 'Square ' + p.row + ',' + p.col));
        console.log(`${this.player.name} played: `, wordsPlayed.map(w => {
            return w.map(sq => sq.tile.letter).join('');
        }));
        let sum = 0;
        wordsPlayed.forEach(word => {
            let wordMultiplier = 1;
            word.forEach(sq => {
                let points = sq.tile.points;
                if (this.placements.includes(sq)) {
                    if (sq.bonus === 'tls') { points *= 3; }
                    if (sq.bonus === 'dls') { points *= 2; }
                    if (sq.bonus === 'tws') { wordMultiplier *= 3; }
                    if (sq.bonus === 'dws' || sq.bonus === 'star') { wordMultiplier *= 2; }
                }
                sum += points;   
            });
            sum *= wordMultiplier;
        })
        if (this.placements.length === 7) { sum += 50; }
        console.log('Score: ', sum);
        return sum;
    }
    get isValid() {
        // if 1st play, check if word crosses center
        if (this.playNumber === 0 && !crossesCenter(this)) {
            console.log('Invalid play: First play must cross the center');
            return false; 
        } // check if word played is in a straight line
        if (!formsLine(this)) { 
            console.log('Invalid play: Play must be in a straight line');
            return false; 
        } // check if word played is contiguous (if > 1 long)
        if (!isContiguous(this)) { 
            console.log('Invalid play: Play must be contiguous');
            return false; 
        } // check if word connects to other words (if 1st play)
        if (this.playNumber > 0 && !isConnected(this)) { 
            console.log('Invalid play: Play must be attached');
            return false;            
        } // otherwise, all good!
        return true;
    }
}
