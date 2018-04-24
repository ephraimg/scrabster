
import React from 'react';

import { UITileLetter } from './tileLetter';
import { UITilePoints } from './tilePoints';

const randomTurn = () => {
    return Math.random() * 0.1 * (Math.random() > 0.5 ? 1 : -1);
};

const randomRotation = () => ({
    transform: 'rotate(' + randomTurn() + 'turn)',
    msTransform: 'rotate(' + randomTurn() + 'turn)',
    WebkitTransform: 'rotate(' + randomTurn() + 'turn)'
});

export class UITile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let selectClass = this.props.selectedTile === this.props.tile ? ' selected' : '';
        let logoClass = this.props.inLogo === 'true' ? ' logo-tile' : '';
        let style = this.props.inLogo === 'true' ? randomRotation() : null;
        return (
            <div className={'ui-tile noselect' + selectClass + logoClass}
                style={style} 
                onClick={e => this.props.selectTile(this.props.tile)}>
            <UITileLetter letter={this.props.tile.letter}/>
            <UITilePoints points={this.props.tile.points}/>
            </div>
        )
    }
}