
import { Rack } from './rack';

export class Player {
    constructor(user) {
        this.name = user.name;
        this.rack = new Rack();
        this.score = 0;
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
