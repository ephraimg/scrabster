
export class Rack {

    constructor(tiles) {
        this.tiles = tiles || [];
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

    remove(tile) {
        this.tiles = this.tiles.filter(el => el.id !== tile.id);
        return this.tiles;
    }

    add(tile) {
        this.tiles.push(tile);
        return this.tiles;
    }

    get count() {
        return this.tiles.length;
    }

}
