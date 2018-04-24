
import React from 'react';
import { UIRack } from './rack';

export const Footer = props => (
    <div className="footer"
        onClick={props.selectSquareOrRack}>
        <div className="banner-info">
            <div>
                {props.game.currentPlayer.name + '\'s turn'}
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
            <button onClick={()=>{}}>
                Clear Play
            </button>
            <button className="submit" onClick={props.handleSubmitClick}>
                Submit Play
            </button>
        </div>
    </div>
);