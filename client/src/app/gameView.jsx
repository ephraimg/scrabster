
import React from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';

import { Game } from '../gameLogic/game.js';
import { Player } from '../gameLogic/player.js';
import { UIBoard } from './board';
import { Footer } from './footer';

export class GameView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: null,
            selectedTile: null
        };
        this.selectTile = this.selectTile.bind(this);
        this.selectSquareOrRack = this.selectSquareOrRack.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleExchangeClick = this.handleExchangeClick.bind(this);
        this.handleShuffleClick = this.handleShuffleClick.bind(this);
    }

    componentDidMount() {
        // console.log('game id: ', this.props.selectedGameId);
        if (this.props.selectedGameId === "") {
            // console.log('selectedOpponentId: ', this.props.selectedOpponentId);
            axios.get(`/users?id=${this.props.selectedOpponentId}`)
                .then(({ data }) => {
                    const player1 = new Player(this.props.user);
                    const player2 = new Player(data[0]);
                    const game = new Game(player1, player2);
                    this.setState({ game });
                });
        } else {
            axios.get(`/games?id=${this.props.selectedGameId}`)
                .then(({ data }) => {
                    const retrievedGame = data[0]
                    const game = new Game(
                        retrievedGame.player1, 
                        retrievedGame.player2,
                        retrievedGame.id,
                        retrievedGame.squares,
                        retrievedGame.tiles,
                        retrievedGame.playHistory
                    );
                    this.setState({ game });
                });
        }
    }

    selectTile(tile, e) {
        e.stopPropagation();
        if (this.props.user.id !== this.state.game.currentPlayer.id) {
            return false;
        }
        if (!this.state.selectedTile) {
            this.setState({selectedTile: tile});
        } else if (this.state.selectedTile.id === tile.id) {
            this.setState({selectedTile: null});
        } else {
            if (this.state.game.currentPlayer.rack.has(tile) &&
                this.state.game.currentPlayer.rack.has(this.state.selectedTile)) {
                this.state.game.currentPlayer.rack.swap(tile, this.state.selectedTile);
                const newGame = cloneDeep(this.state.game);
                this.setState({game: newGame, selectedTile: null});
            }
        }
    }

    selectSquareOrRack(square, e) {
        if (this.props.user.id !== this.state.game.currentPlayer.id) {
            return false;
        }
        const selected = this.state.selectedTile;
        const rackTiles = this.state.game.currentPlayer.rack.tiles;
        const placements = this.state.game.currentPlay.placements;
        const isPlaced = tile => placements.map(p => p.tile).includes(tile);
        if (selected && (rackTiles.includes(selected) || isPlaced(selected))) {
            const newGame = cloneDeep(this.state.game);
            const oldSq = placements.filter(p => p.tile && p.tile.id === selected.id)[0];
            if (square && square.row !== undefined) { // check if it's a square
                const success = newGame.currentPlay.placeTile(selected, square.row, square.col);
                if (success && isPlaced(selected)) {
                    newGame.clearExchange();
                    newGame.currentPlay.removeTile(selected, oldSq.row, oldSq.col);
                }
            } else { // user clicked on the rack, not on a square
                if (isPlaced(selected)) {
                    newGame.currentPlay.removeTile(selected, oldSq.row, oldSq.col);
                    newGame.currentPlayer.rack.add(selected);
                }              
            }
            this.setState({ game: newGame, selectedTile: null });
        }      
    }

    handleShuffleClick(e) {
        e.stopPropagation();
        const newGame = cloneDeep(this.state.game);
        if (this.props.user.id === newGame.currentPlayer.id) {
            newGame.currentPlayer.rack.shuffle();
        } else {
            newGame.otherPlayer.rack.shuffle();
        }
        this.setState({ game: newGame });        
    }

    handleClearClick(e) {
        e.stopPropagation();
        const newGame = cloneDeep(this.state.game);
        newGame.clearPlay();
        newGame.clearExchange();
        this.setState({ game: newGame });
    }

    handleExchangeClick(e) {
        e.stopPropagation();
        const rackTiles = this.state.game.currentPlayer.rack.tiles;
        const selected = this.state.selectedTile;
        if (selected && rackTiles.includes(selected)) {
            const newGame = cloneDeep(this.state.game);
            newGame.exchangeTile(selected);
            this.setState({ game: newGame, selectedTile: selected });        
        } else {
            console.log('Problem with exchangeClick! ', rackTiles, selected);
            return false;
        }
    }

    handleSubmitClick(e) {
        e.stopPropagation();
        const newGame = cloneDeep(this.state.game);
        newGame.submitPlay();
        this.setState({ game: newGame });
    }

    render() { 
        // console.log('this.state.game: ', this.state.game);
        return this.state.game === null
            ? <h1 className="ctr-horiz">Please wait a moment...</h1> 
            : <div>
                {
                // <div onClick={()=>console.log(this.state.game.playHistory)}>Log playHistory</div>
                // <div onClick={()=>console.log(JSON.stringify(this.state.game.playHistory))}>Stringify playHistory</div>
                // <div onClick={()=>console.log(savedGame(this.state.game))}>Log game</div>
                // <div onClick={()=>console.log(JSON.stringify(savedGame(this.state.game)))}>Stringify game</div>
                }
                <UIBoard board={this.state.game.board} 
                    selectTile={this.selectTile}
                    selectedTile={this.state.selectedTile}
                    selectSquareOrRack={this.selectSquareOrRack}/>
                <Footer game={this.state.game}
                    user={this.props.user}
                    selectTile={this.selectTile}
                    selectedTile={this.state.selectedTile}
                    selectSquareOrRack={this.selectSquareOrRack}
                    handleShuffleClick={this.handleShuffleClick}
                    handleClearClick={this.handleClearClick}
                    handleExchangeClick={this.handleExchangeClick}
                    handleSubmitClick={this.handleSubmitClick}/>
            </div>;
    }

}
