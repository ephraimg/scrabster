
import { Rack } from './rack';

export class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.rack = new Rack(player.rack.tiles);
        this.score = player.score;
    }
    fillRack(bag) {
        while (this.rack.count < 7) {
            this.rack.add(bag.provideTile());
        }
        return this.rack;
    }
    exchange(tile, bag) {
        this.rack.remove(tile);
        this.rack.add(bag.provideTile());
        bag.receiveTile(tile);
        return this.rack;        
    }
}
