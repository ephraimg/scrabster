
import React from 'react';
import { UITile } from './tile';
import { TripleTriangle, DoubleTriangle } from './triangles';

const bonusMessages = {
    'tws': 'TRIPLE WORD SCORE',
    'dws': 'DOUBLE WORD SCORE',
    'tls': 'TRIPLE LETTER SCORE',
    'dls': 'DOUBLE LETTER SCORE',
    'star': ''
}

export class UISquare extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bonusClass, bonusMessage, emptyView;
        const bonus = this.props.square.bonus;
        if (bonus !== 'star') {
            bonusClass = bonus ? ' ' + bonus : '';
            bonusMessage = bonus ? bonusMessages[bonus].split(' ') : '';
            emptyView = (
                <div className="bonus-message">
                    <div>{bonusMessage[0]}</div>
                    <div>{bonusMessage[1]}</div>
                    <div>{bonusMessage[2]}</div>
                </div>)
        } else {
            bonusClass = this.props.square.tile ? ' dws' : ' star';
            emptyView = (
                <div dangerouslySetInnerHTML={{__html: '&bigstar;'}}>
                </div>)
        }
        return (         
            <div className={'ui-square noselect' + bonusClass}
                onClick={e => this.props.selectSquareOrRack(this.props.square)}>


                {['left', 'right', 'top', 'bot'].map(side => {
                    return bonus && bonus[0] === 't' 
                        ? <TripleTriangle bonusClass={bonusClass} side={side}/> 
                        : null})
                }
                {['left', 'right', 'top', 'bot'].map(side => {
                    return bonus && bonus[0] === 'd' 
                        ? <DoubleTriangle bonusClass={bonusClass} side={side}/> 
                        : null})
                }
                                
                {this.props.square.tile
                    ? <UITile tile={this.props.square.tile}
                        selectTile={this.props.selectTile}
                        selectedTile={this.props.selectedTile}/>
                    : emptyView}

            </div>
        )
    }
}
