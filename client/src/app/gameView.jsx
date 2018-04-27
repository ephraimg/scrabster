
import React from 'react';
import { cloneDeep } from 'lodash';

import { Game } from '../gameLogic/game.js';
import { UIBoard } from './board';
import { Footer } from './footer';

const sampleGame = {"squares":[[{"row":0,"col":0,"bonus":"tws"},{"row":0,"col":1},{"row":0,"col":2},{"row":0,"col":3,"bonus":"dls"},{"row":0,"col":4},{"row":0,"col":5},{"row":0,"col":6},{"row":0,"col":7,"bonus":"tws"},{"row":0,"col":8},{"row":0,"col":9},{"row":0,"col":10},{"row":0,"col":11,"bonus":"dls"},{"row":0,"col":12},{"row":0,"col":13},{"row":0,"col":14,"bonus":"tws"}],[{"row":1,"col":0},{"row":1,"col":1,"bonus":"dws"},{"row":1,"col":2},{"row":1,"col":3},{"row":1,"col":4},{"row":1,"col":5,"bonus":"tls"},{"row":1,"col":6},{"row":1,"col":7},{"row":1,"col":8},{"row":1,"col":9,"bonus":"tls"},{"row":1,"col":10},{"row":1,"col":11},{"row":1,"col":12},{"row":1,"col":13,"bonus":"dws"},{"row":1,"col":14}],[{"row":2,"col":0},{"row":2,"col":1},{"row":2,"col":2,"bonus":"dws"},{"row":2,"col":3},{"row":2,"col":4},{"row":2,"col":5},{"row":2,"col":6,"bonus":"dls"},{"row":2,"col":7},{"row":2,"col":8,"bonus":"dls"},{"row":2,"col":9},{"row":2,"col":10},{"row":2,"col":11},{"row":2,"col":12,"bonus":"dws"},{"row":2,"col":13},{"row":2,"col":14}],[{"row":3,"col":0,"bonus":"dls"},{"row":3,"col":1},{"row":3,"col":2},{"row":3,"col":3,"bonus":"dws"},{"row":3,"col":4},{"row":3,"col":5},{"row":3,"col":6},{"row":3,"col":7,"bonus":"dls"},{"row":3,"col":8},{"row":3,"col":9},{"row":3,"col":10},{"row":3,"col":11,"bonus":"dws"},{"row":3,"col":12},{"row":3,"col":13},{"row":3,"col":14,"bonus":"dls"}],[{"row":4,"col":0},{"row":4,"col":1},{"row":4,"col":2},{"row":4,"col":3},{"row":4,"col":4,"bonus":"dws"},{"row":4,"col":5},{"row":4,"col":6},{"row":4,"col":7},{"row":4,"col":8},{"row":4,"col":9},{"row":4,"col":10,"bonus":"dws"},{"row":4,"col":11},{"row":4,"col":12},{"row":4,"col":13},{"row":4,"col":14}],[{"row":5,"col":0},{"row":5,"col":1,"bonus":"tls"},{"row":5,"col":2},{"row":5,"col":3},{"row":5,"col":4},{"row":5,"col":5,"bonus":"tls"},{"row":5,"col":6},{"row":5,"col":7},{"row":5,"col":8},{"row":5,"col":9,"bonus":"tls"},{"row":5,"col":10},{"row":5,"col":11},{"row":5,"col":12},{"row":5,"col":13,"bonus":"tls"},{"row":5,"col":14}],[{"row":6,"col":0},{"row":6,"col":1},{"row":6,"col":2,"bonus":"dls"},{"row":6,"col":3},{"row":6,"col":4},{"row":6,"col":5},{"row":6,"col":6,"bonus":"dls"},{"row":6,"col":7},{"row":6,"col":8,"bonus":"dls"},{"row":6,"col":9},{"row":6,"col":10},{"row":6,"col":11},{"row":6,"col":12,"bonus":"dls"},{"row":6,"col":13},{"row":6,"col":14}],[{"row":7,"col":0,"bonus":"tws"},{"row":7,"col":1},{"row":7,"col":2},{"row":7,"col":3,"bonus":"dls"},{"row":7,"col":4},{"row":7,"col":5},{"row":7,"col":6},{"row":7,"col":7,"bonus":"star","tile":{"letter":"M","points":3,"id":"M0"}},{"row":7,"col":8},{"row":7,"col":9},{"row":7,"col":10},{"row":7,"col":11,"bonus":"dls"},{"row":7,"col":12},{"row":7,"col":13},{"row":7,"col":14,"bonus":"tws"}],[{"row":8,"col":0},{"row":8,"col":1},{"row":8,"col":2,"bonus":"dls"},{"row":8,"col":3},{"row":8,"col":4},{"row":8,"col":5},{"row":8,"col":6,"bonus":"dls","tile":{"letter":"D","points":2,"id":"D0"}},{"row":8,"col":7,"tile":{"letter":"O","points":1,"id":"O6"}},{"row":8,"col":8,"bonus":"dls","tile":{"letter":"U","points":1,"id":"U1"}},{"row":8,"col":9,"tile":{"letter":"C","points":3,"id":"C1"}},{"row":8,"col":10},{"row":8,"col":11},{"row":8,"col":12,"bonus":"dls"},{"row":8,"col":13},{"row":8,"col":14}],[{"row":9,"col":0},{"row":9,"col":1,"bonus":"tls"},{"row":9,"col":2},{"row":9,"col":3},{"row":9,"col":4},{"row":9,"col":5,"bonus":"tls"},{"row":9,"col":6},{"row":9,"col":7,"tile":{"letter":"B","points":3,"id":"B0"}},{"row":9,"col":8},{"row":9,"col":9,"bonus":"tls"},{"row":9,"col":10},{"row":9,"col":11},{"row":9,"col":12},{"row":9,"col":13,"bonus":"tls"},{"row":9,"col":14}],[{"row":10,"col":0},{"row":10,"col":1},{"row":10,"col":2},{"row":10,"col":3},{"row":10,"col":4,"bonus":"dws"},{"row":10,"col":5},{"row":10,"col":6},{"row":10,"col":7,"tile":{"letter":"A","points":1,"id":"A2"}},{"row":10,"col":8},{"row":10,"col":9},{"row":10,"col":10,"bonus":"dws"},{"row":10,"col":11},{"row":10,"col":12},{"row":10,"col":13},{"row":10,"col":14}],[{"row":11,"col":0,"bonus":"dls"},{"row":11,"col":1},{"row":11,"col":2},{"row":11,"col":3,"bonus":"dws"},{"row":11,"col":4},{"row":11,"col":5},{"row":11,"col":6},{"row":11,"col":7,"bonus":"dls"},{"row":11,"col":8},{"row":11,"col":9},{"row":11,"col":10},{"row":11,"col":11,"bonus":"dws"},{"row":11,"col":12},{"row":11,"col":13},{"row":11,"col":14,"bonus":"dls"}],[{"row":12,"col":0},{"row":12,"col":1},{"row":12,"col":2,"bonus":"dws"},{"row":12,"col":3},{"row":12,"col":4},{"row":12,"col":5},{"row":12,"col":6,"bonus":"dls"},{"row":12,"col":7},{"row":12,"col":8,"bonus":"dls"},{"row":12,"col":9},{"row":12,"col":10},{"row":12,"col":11},{"row":12,"col":12,"bonus":"dws"},{"row":12,"col":13},{"row":12,"col":14}],[{"row":13,"col":0},{"row":13,"col":1,"bonus":"dws"},{"row":13,"col":2},{"row":13,"col":3},{"row":13,"col":4},{"row":13,"col":5,"bonus":"tls"},{"row":13,"col":6},{"row":13,"col":7},{"row":13,"col":8},{"row":13,"col":9,"bonus":"tls"},{"row":13,"col":10},{"row":13,"col":11},{"row":13,"col":12},{"row":13,"col":13,"bonus":"dws"},{"row":13,"col":14}],[{"row":14,"col":0,"bonus":"tws"},{"row":14,"col":1},{"row":14,"col":2},{"row":14,"col":3,"bonus":"dls"},{"row":14,"col":4},{"row":14,"col":5},{"row":14,"col":6},{"row":14,"col":7,"bonus":"tws"},{"row":14,"col":8},{"row":14,"col":9},{"row":14,"col":10},{"row":14,"col":11,"bonus":"dls"},{"row":14,"col":12},{"row":14,"col":13},{"row":14,"col":14,"bonus":"tws"}]],"tiles":[{"letter":"_","points":0,"id":"_0"},{"letter":"_","points":0,"id":"_1"},{"letter":"A","points":1,"id":"A0"},{"letter":"A","points":1,"id":"A1"},{"letter":"A","points":1,"id":"A4"},{"letter":"A","points":1,"id":"A5"},{"letter":"A","points":1,"id":"A6"},{"letter":"A","points":1,"id":"A7"},{"letter":"A","points":1,"id":"A8"},{"letter":"B","points":3,"id":"B1"},{"letter":"C","points":3,"id":"C0"},{"letter":"D","points":2,"id":"D1"},{"letter":"D","points":2,"id":"D2"},{"letter":"D","points":2,"id":"D3"},{"letter":"E","points":1,"id":"E0"},{"letter":"E","points":1,"id":"E3"},{"letter":"E","points":1,"id":"E4"},{"letter":"E","points":1,"id":"E6"},{"letter":"E","points":1,"id":"E7"},{"letter":"E","points":1,"id":"E8"},{"letter":"E","points":1,"id":"E9"},{"letter":"E","points":1,"id":"E10"},{"letter":"E","points":1,"id":"E11"},{"letter":"F","points":4,"id":"F0"},{"letter":"F","points":4,"id":"F1"},{"letter":"G","points":2,"id":"G0"},{"letter":"G","points":2,"id":"G1"},{"letter":"H","points":4,"id":"H0"},{"letter":"H","points":4,"id":"H1"},{"letter":"I","points":1,"id":"I0"},{"letter":"I","points":1,"id":"I1"},{"letter":"I","points":1,"id":"I3"},{"letter":"I","points":1,"id":"I4"},{"letter":"I","points":1,"id":"I5"},{"letter":"I","points":1,"id":"I6"},{"letter":"I","points":1,"id":"I7"},{"letter":"I","points":1,"id":"I8"},{"letter":"J","points":8,"id":"J0"},{"letter":"K","points":5,"id":"K0"},{"letter":"L","points":1,"id":"L0"},{"letter":"L","points":1,"id":"L3"},{"letter":"M","points":3,"id":"M1"},{"letter":"N","points":1,"id":"N0"},{"letter":"N","points":1,"id":"N2"},{"letter":"N","points":1,"id":"N3"},{"letter":"N","points":1,"id":"N4"},{"letter":"O","points":1,"id":"O0"},{"letter":"O","points":1,"id":"O1"},{"letter":"O","points":1,"id":"O2"},{"letter":"O","points":1,"id":"O5"},{"letter":"O","points":1,"id":"O7"},{"letter":"P","points":3,"id":"P0"},{"letter":"P","points":3,"id":"P1"},{"letter":"Q","points":10,"id":"Q0"},{"letter":"R","points":1,"id":"R0"},{"letter":"R","points":1,"id":"R1"},{"letter":"R","points":1,"id":"R2"},{"letter":"R","points":1,"id":"R3"},{"letter":"R","points":1,"id":"R4"},{"letter":"R","points":1,"id":"R5"},{"letter":"S","points":1,"id":"S0"},{"letter":"S","points":1,"id":"S1"},{"letter":"S","points":1,"id":"S2"},{"letter":"S","points":1,"id":"S3"},{"letter":"T","points":1,"id":"T1"},{"letter":"T","points":1,"id":"T3"},{"letter":"T","points":1,"id":"T4"},{"letter":"T","points":1,"id":"T5"},{"letter":"U","points":1,"id":"U0"},{"letter":"U","points":1,"id":"U2"},{"letter":"U","points":1,"id":"U3"},{"letter":"V","points":4,"id":"V0"},{"letter":"V","points":4,"id":"V1"},{"letter":"W","points":4,"id":"W0"},{"letter":"W","points":4,"id":"W1"},{"letter":"X","points":8,"id":"X0"},{"letter":"Y","points":4,"id":"Y0"},{"letter":"Y","points":4,"id":"Y1"},{"letter":"Z","points":10,"id":"Z0"}],"player1":{"id":123456,"name":"Ephraim","rack":{"tiles":[{"letter":"T","points":1,"id":"T2"},{"letter":"L","points":1,"id":"L2"},{"letter":"T","points":1,"id":"T0"},{"letter":"A","points":1,"id":"A3"},{"letter":"L","points":1,"id":"L1"},{"letter":"E","points":1,"id":"E2"},{"letter":"N","points":1,"id":"N1"}]},"score":16},"player2":{"id":234567,"name":"Tyler","rack":{"tiles":[{"letter":"I","points":1,"id":"I2"},{"letter":"O","points":1,"id":"O3"},{"letter":"N","points":1,"id":"N5"},{"letter":"E","points":1,"id":"E5"},{"letter":"O","points":1,"id":"O4"},{"letter":"G","points":2,"id":"G2"},{"letter":"E","points":1,"id":"E1"}]},"score":10},"playHistory":[{"player":123456,"score":8,"playNumber":0,"startRack":[{"letter":"M","points":3,"id":"M0"},{"letter":"T","points":1,"id":"T2"},{"letter":"O","points":1,"id":"O6"},{"letter":"L","points":1,"id":"L2"},{"letter":"T","points":1,"id":"T0"},{"letter":"A","points":1,"id":"A2"},{"letter":"A","points":1,"id":"A3"}],"placements":[{"row":7,"col":7,"bonus":"star","tile":{"letter":"M","points":3,"id":"M0"}},{"row":8,"col":7,"tile":{"letter":"O","points":1,"id":"O6"}}]},{"player":234567,"score":10,"playNumber":1,"startRack":[{"letter":"I","points":1,"id":"I2"},{"letter":"O","points":1,"id":"O3"},{"letter":"U","points":1,"id":"U1"},{"letter":"C","points":3,"id":"C1"},{"letter":"N","points":1,"id":"N5"},{"letter":"D","points":2,"id":"D0"},{"letter":"E","points":1,"id":"E5"}],"placements":[{"row":8,"col":6,"bonus":"dls","tile":{"letter":"D","points":2,"id":"D0"}},{"row":8,"col":8,"bonus":"dls","tile":{"letter":"U","points":1,"id":"U1"}},{"row":8,"col":9,"tile":{"letter":"C","points":3,"id":"C1"}}]},{"player":123456,"score":8,"playNumber":2,"startRack":[{"letter":"T","points":1,"id":"T2"},{"letter":"L","points":1,"id":"L2"},{"letter":"T","points":1,"id":"T0"},{"letter":"A","points":1,"id":"A2"},{"letter":"A","points":1,"id":"A3"},{"letter":"B","points":3,"id":"B0"},{"letter":"L","points":1,"id":"L1"}],"placements":[{"row":9,"col":7,"tile":{"letter":"B","points":3,"id":"B0"}},{"row":10,"col":7,"tile":{"letter":"A","points":1,"id":"A2"}}]}]};

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

    componentWillMount() {
        console.log('game id: ', this.props.selectedGameId);
        if (this.props.selectedGameId === "") {
            this.setState({ 
                game: new Game(sampleGame.player1, sampleGame.player2) 
            });
        } else {
            // get game (just a sample for now)
            const currentGame = sampleGame;
            // start the game with supplied data
            const game = new Game(
                currentGame.player1, 
                currentGame.player2,
                123456, // game id
                currentGame.squares,
                currentGame.tiles,
                currentGame.playHistory
            );
            console.log('Current game: ', game);
            this.setState({ game });
        }
    }

    selectTile(tile, e) {
        e.stopPropagation();
        if (!this.state.selectedTile || this.state.selectedTile.id !== tile.id) {
            this.setState({selectedTile: tile});
        } else {
            this.setState({selectedTile: null});
        }
    }

    selectSquareOrRack(square) {
        const selected = this.state.selectedTile;
        const rackTiles = this.state.game.currentPlayer.rack.tiles;
        const placements = this.state.game.currentPlay.placements;
        const isPlaced = tile => placements.map(p => p.tile).includes(tile);
        if (selected && (rackTiles.includes(selected) || isPlaced(selected))) {
            const newGame = cloneDeep(this.state.game);
            const oldSq = placements.filter(p => p.tile && p.tile.id === selected.id)[0];
            if (square.row !== undefined) { // check if it's a square
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
        newGame.currentPlayer.rack.shuffle();
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
        const cap = function(str) {
            return str[0].toUpperCase() + str.slice(1);
        };
        // const savedGame = function(liveGame) {
        //     return {
        //         squares: liveGame.board.squares,
        //         tiles: liveGame.bag.tiles,
        //         player1: liveGame.player1,
        //         player2: liveGame.player2,
        //         playHistory: liveGame.playHistory
        //     };
        // }
        return (
            <div>
                {
                // Welcome{this.props.user ? `, ${cap(this.props.user.name.givenName)}!` : ' to Scrabster!'}
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
                    selectTile={this.selectTile}
                    selectedTile={this.state.selectedTile}
                    selectSquareOrRack={this.selectSquareOrRack}
                    handleShuffleClick={this.handleShuffleClick}
                    handleClearClick={this.handleClearClick}
                    handleExchangeClick={this.handleExchangeClick}
                    handleSubmitClick={this.handleSubmitClick}/>
            </div> )
    }

}
