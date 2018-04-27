
import React from 'react';
import { UISquare } from './square';

export const UIBoard = props =>
    <div className="ui-board">
        { Array(15).fill(null).map((row, i) => 
            <div className="ui-row" key={`row-${i}`}>
                { Array(15).fill(null).map((sq, j) => 
                    <UISquare key={`square-${i}-${j}`}
                        id={`square-${i}-${j}`} 
                        square={props.board.getSquare(i, j)}
                        selectSquareOrRack={props.selectSquareOrRack}
                        selectTile={props.selectTile}
                        selectedTile={props.selectedTile} />
                )}
            </div>
        )}
    </div>;
