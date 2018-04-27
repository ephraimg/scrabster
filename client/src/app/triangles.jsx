
import React from 'react';

export const TripleTriangle = props =>
    <div className={'triple-triangle tris-' + props.side}>
        <div className={'tri-' + props.bonusClass.trim() + ' triangle'}></div>
        <div className={'tri-' + props.bonusClass.trim() + ' triangle'}></div>
        <div className={'tri-' + props.bonusClass.trim() + ' triangle'}></div>
    </div>;

export const DoubleTriangle = props =>
    <div className={'double-triangle tris-' + props.side}>
        <div className={'tri-' + props.bonusClass.trim() + ' triangle'}></div>
        <div className={'tri-' + props.bonusClass.trim() + ' triangle'}></div>
    </div>;