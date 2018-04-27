
import React from 'react';
import { UISquare } from './square';
import { UITile } from './tile';

export const UIRack = props =>
    <div className="ui-rack ctr-horiz">
        <div className="ui-rack-letters">
            { props.rack.tiles.map((tile, i) => 
                <UITile tile={tile} key={`tile-${i}`}
                    selectTile={props.selectTile}
                    selectedTile={props.selectedTile} />
            )}
        </div>
    </div>;