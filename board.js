
export class Board {
    constructor() {
        this.squares = Array(15).fill(null).map(sq => Array(15).fill(null));
    }
}