
import React from 'react';
import { UISquare } from './square';

export class UIBoard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ui-board">
            { Array(15).fill(null).map((row, i) => 
                <div className="ui-row" key={`row-${i}`}>
                { Array(15).fill(null).map((sq, j) => 
                    <UISquare key={`square-${i}-${j}`}
                        id={`square-${i}-${j}`} 
                        square={this.props.board.getSquare(i, j)}
                        selectSquareOrRack={this.props.selectSquareOrRack}
                        selectTile={this.props.selectTile}
                        selectedTile={this.props.selectedTile}/>)
                }
                </div>) 
            }
            </div>
        )
    }
}
