

import React from 'react';
import { UITile } from './tile';

const logoTiles = [
    { letter: 'S', points: 1 }, 
    { letter: 'C', points: 3 },
    { letter: 'R', points: 1 }, 
    { letter: 'A', points: 1 },
    { letter: 'B', points: 3 }, 
    { letter: 'S', points: 1 },
    { letter: 'T', points: 1 }, 
    { letter: 'E', points: 1 },
    { letter: 'R', points: 1 }
]

export const Logo = props => (
    <div className="logo ctr-horiz">
        {logoTiles.map(logoTile => (
            <UITile inLogo="true" tile={logoTile}/>
        ))}
    </div>
);
