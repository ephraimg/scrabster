
// const Game = require('./game');

// import { Bag, Board, Game, Play, Player, Rack, Tile } from './classes';

const user1 = { name: 'Ephraim' };
const user2 = { name: 'Tyler' };

const game = new Game(user1, user2);

game.board.display();