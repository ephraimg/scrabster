
import React from 'react';

export const UITilePoints = props =>
    <span className="tile-points">
        { props.points > 0 ? props.points : ' ' }
    </span>;