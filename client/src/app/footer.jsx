
import React from 'react';
import { UIRack } from './rack';

export const Footer = props => {
    console.log('props.game.currentPlay: ', props.game.currentPlay);
    return (
    <div className="footer"
        onClick={props.selectSquareOrRack}>
        <div className="banner-info">
            <div>
                Turn {props.game.currentPlay.playNumber + 1}: {props.game.currentPlayer.name}<br/>
                Score: {props.game.currentPlay.score}
            </div>
            <hr />
            <div>
                {props.game.player1.name}: {props.game.player1.score}
            </div>
            <div>
                {props.game.player2.name}: {props.game.player2.score}
            </div>
        </div>  
        <UIRack rack={props.game.currentPlayer.rack}
            selectTile={props.selectTile}
            selectedTile={props.selectedTile}/>
        <br/><div className="ctr-horiz">
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
        </div>
    </div>)
};


// <div>
//     This play: {props.game.currentPlay 
//         ? props.game.currentPlay.score : 0}
// </div>