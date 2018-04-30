
import React from 'react';
import { UITile } from './tile';
import { TriangleSet } from './triangles';

const bonusMessages = {
    'tws': ['TRIPLE', 'WORD', 'SCORE'],
    'dws': ['DOUBLE', 'WORD', 'SCORE'],
    'tls': ['TRIPLE', 'LETTER', 'SCORE'],
    'dls': ['DOUBLE', 'LETTER', 'SCORE'],
    'star': []
}

export class UISquare extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let bonusClass, bonusWords, emptyView;
        const bonus = this.props.square.bonus;
        if (bonus !== 'star') {
            bonusClass = bonus || '';
            bonusWords = bonus ? bonusMessages[bonus] : [];
            emptyView = ( // this is for a square w/o a tile on it
                <div className="bonus-message">
                { bonusWords.map((word, idx) => <div>{word}</div>) }
                </div>)
        } else {
            bonusClass = this.props.square.tile ? ' dws' : ' star';
            // take care of the center square
            emptyView = <div dangerouslySetInnerHTML={{__html: '&bigstar;'}} />
        }
        return (         
            <div className={'ui-square noselect ' + bonusClass}
                onClick={e => this.props.selectSquareOrRack(this.props.square, e)}>
                { ['l', 'r', 't', 'b'].map(side =>
                    <TriangleSet side={side}
                        bonusClass={bonusClass}
                        count={bonus ? ({t: "3", d: "2", s: "0"})[bonus[0]] : 0}/> )}
                { this.props.square.tile
                    ? <UITile tile={this.props.square.tile}
                        selectTile={this.props.selectTile}
                        selectedTile={this.props.selectedTile}/>
                    : emptyView }
            </div> )
    }
}
