
export class Player {
    constructor() {
        this.rack = new Rack();
        this.score = 0;
    }
    fillRack(bag) {
        while (this.rack.count < 7) {
            this.rack.add(bag.provideTile());
        }
        return rack;
    }
    exchange(tile, bag) {
        this.rack.remove(tile);
        this.rack.add(bag.provideTile());
        bag.receiveTile(tile);
        return rack;        
    }
}