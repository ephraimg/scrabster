import React from 'react';

export class UITileLetter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span className="tile-letter">
                {this.props.letter !== '_' ? this.props.letter : ' '}
            </span>
        )
    }
}