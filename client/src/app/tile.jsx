
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
        this.state = { rotated: {} }
    }

    componentDidMount() {
        this.setState({ rotated: randomRotation() }); 
    }

    render() {
        let selectClass = this.props.selectedTile &&
            this.props.selectedTile.id === this.props.tile.id ? ' selected' : '';
        let logoClass = this.props.inLogo === 'true' ? ' logo-tile' : '';
        let style = this.props.inLogo === 'true' ? this.state.rotated : null;
        return (
            <div className={'ui-tile noselect' + selectClass + logoClass}
                style={style} 
                onClick={e => this.props.selectTile(this.props.tile, e)}>
                <UITileLetter letter={this.props.tile.letter} />
                <UITilePoints points={this.props.tile.points} />
            </div>
        )
    }

}