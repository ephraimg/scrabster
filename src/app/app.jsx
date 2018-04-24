
import React from 'react';
import ReactDOM from 'react-dom';
import { cloneDeep } from 'lodash';

import { Game } from '../gameLogic/game.js';
import { Square } from '../gameLogic/board.js';
import { Banner } from './Banner';
import { UIBoard } from './board';
import { Footer } from './footer';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            selectedTile: null
        };
        this.selectTile = this.selectTile.bind(this);
        this.selectSquareOrRack = this.selectSquareOrRack.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleShuffleClick = this.handleShuffleClick.bind(this);
    }
    componentWillMount() {
        const user1 = { name: 'Ephraim' };
        const user2 = { name: 'Tyler' };
        const game = new Game(user1, user2);
        this.setState({ game });
    }
    selectTile(tile) {
        if (!this.state.selectedTile || this.state.selectedTile.id !== tile.id) {
            this.setState({selectedTile: tile});
        } else {
            this.setState({selectedTile: null});
        }
    }
    selectSquareOrRack(square) {
        console.log('selectSoR square: ', square);
        const selected = this.state.selectedTile;
        const rackTiles = this.state.game.currentPlayer.rack.tiles;
        const placements = this.state.game.currentPlay.placements;
        const isPlaced = tile => placements.map(p => p.tile).includes(tile);
        if (selected && (rackTiles.includes(selected) || isPlaced(selected))) {
            const newGame = cloneDeep(this.state.game);
            console.log('old placements: ', this.state.game.currentPlay.placements);
            const oldSq = placements.filter(p => p.tile && p.tile.id === selected.id)[0];
            if (square instanceof Square) {
                const success = newGame.currentPlay.placeTile(selected, square.row, square.col);
                if (success && isPlaced(selected)) {
                    newGame.currentPlay.removeTile(selected, oldSq.row, oldSq.col);
                    console.log('new placements: ', newGame.currentPlay.placements);
                }
            } else {
                if (isPlaced(selected)) {
                    newGame.currentPlay.removeTile(selected, oldSq.row, oldSq.col);
                    newGame.currentPlayer.rack.add(selected);
                    console.log('new placements: ', newGame.currentPlay.placements); 
                }              
            }
            this.setState({ game: newGame, selectedTile: null });
        }      
    }
    handleSubmitClick(e) {
        const newGame = cloneDeep(this.state.game);
        newGame.submitPlay();
        this.setState({ game: newGame });
    }
    handleShuffleClick(e) {
        const newGame = cloneDeep(this.state.game);
        newGame.currentPlayer.rack.shuffle();
        this.setState({ game: newGame });        
    }
    render() { 
        return(
            <div>
                <Banner />
                <UIBoard board={this.state.game.board} 
                    selectTile={this.selectTile}
                    selectedTile={this.state.selectedTile}
                    selectSquareOrRack={this.selectSquareOrRack}/>
                <Footer game={this.state.game}
                    selectTile={this.selectTile}
                    selectedTile={this.state.selectedTile}
                    selectSquareOrRack={this.selectSquareOrRack}
                    handleShuffleClick={this.handleShuffleClick}
                    handleSubmitClick={this.handleSubmitClick}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
