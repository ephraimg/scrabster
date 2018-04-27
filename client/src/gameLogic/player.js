
import { Rack } from './rack';

export class Player {

    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.rack = player.rack 
            ? new Rack(player.rack.tiles)
            : new Rack();
        this.score = player.score || 0;
    }

    getName() {
        const name = this.name.givenName
            ? this.name.givenName
            : this.displayName.split(' ')[0];
        return name[0].toUpperCase() + name.slice(1);
    }

    fillRack(bag) {
        while (this.rack.count < 7 && bag.count > 0) {
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
