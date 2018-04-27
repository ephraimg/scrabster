
import React from 'react';

export const UITileLetter = props =>
    <span className="tile-letter">
        { props.letter !== '_' ? props.letter : ' ' }
    </span>;
    