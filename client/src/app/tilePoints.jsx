import React from 'react';

export class UITilePoints extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span className="tile-points">
                {this.props.points > 0 ? this.props.points : ' '}
            </span>
        )
    }
}