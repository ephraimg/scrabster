
import React from 'react';
import { Link } from 'react-router-dom';

import { UIRack } from './rack';
import { Rack } from '../gameLogic/rack';

export const Footer = props => {

    let buttonRow;
    let userRack;

    // hide action buttons (except shuffle) if not user's turn
    if (props.game.gameOver) {
        buttonRow = (
            <div className="ctr-horiz"><br/><br/>
                Game Over!
            </div>);
    } else if (props.user.id === props.game.currentPlayer.id) {
        userRack = props.game.currentPlayer.rack;
        buttonRow = (
            <div className="ctr-horiz">
                <button onClick={props.handleShuffleClick}>
                    Shuffle Tiles
                </button>
                <button onClick={props.handleExchangeClick}>
                    Exchange Tile
                </button>
                <button onClick={props.handleClearClick}>
                    Clear Play
                </button>
                <button className="submit" onClick={props.handleSubmitClick}>
                    Submit Play
                </button>
            </div>);
    } else if (props.user.id === props.game.otherPlayer.id) {
        userRack = props.game.otherPlayer.rack;
        buttonRow = (
            <div className="ctr-horiz">
                <button onClick={props.handleShuffleClick}>
                    Shuffle Tiles
                </button>
                <span style={{"margin-left": "1.5em", "color": "white", "font-size": "1rem"}}>
                    Waiting for your turn...
                </span>
            </div>);
    } else {
        userRack = new Rack([]);
        buttonRow = (
            <div className="ctr-horiz">
                <span style={{"margin-left": "1.5em", "color": "white", "font-size": "1rem"}}>
                    You are not a player in this game...
                </span>
            </div>);
    }

    // combine above results with usual bottom info bar
    return (
        <div>
            <div className="footer" onClick={props.selectSquareOrRack}>
                <UIRack rack={userRack}
                    selectTile={props.selectTile}
                    selectedTile={props.selectedTile}>
                </UIRack><br/>
                {buttonRow}
            </div>
            <div className="info-bar">
                <div className="banner-info left-mid">
                    <div style={{"float": "left", "margin-right": "1em"}}>
                        Turn {props.game.currentPlay.playNumber + 1}: {props.game.currentPlayer.getName()}
                        <br/> Pending score: {props.game.currentPlay.score}
                    </div>
                    <div style={{"float": "left", "margin-left": "1em"}}>
                        {props.game.player1.getName()}'s total: {props.game.player1.score}
                        <br/>{props.game.player2.getName()}'s total: {props.game.player2.score}
                    </div>
                </div>
                <div className="banner-info right-mid">
                    <Link to="/home"><button> Home </button></Link>
                </div>
            </div>
        </div>);
};

