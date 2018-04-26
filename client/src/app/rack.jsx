
import React from 'react';
import { UISquare } from './square';
import { UITile } from './tile';

export class UIRack extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui-rack ctr-horiz">
                <div className="ui-rack-letters">
                    {this.props.rack.tiles.map((tile, i) => 
                        <UITile tile={tile} key={`tile-${i}`}
                            selectTile={this.props.selectTile}
                            selectedTile={this.props.selectedTile}/>)}
                </div>
            </div>
        )
    }
}