
import React from 'react';

const opps = { l: 'lr', r: 'lr', t: 'tb', b: 'tb'}

export const TriangleSet = props =>
    <div className={`tris tris-${opps[props.side]} tris-${props.side}`}>
        { Array(+props.count).fill(0).map(el =>
            <div className={`triangle tri-${props.side} ${props.bonusClass}`}/>) }
    </div>
