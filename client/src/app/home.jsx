
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cap = str => str[0].toUpperCase() + str.slice(1);

const getName = props => props.user.name.givenName
    ? cap(props.user.name.givenName)
    : cap(props.user.displayName.split(' ')[0]);

export class Home extends React.Component {

    constructor(props) {
        console.log('Home props, ', props);
        super(props);
        this.state = { gameIds: [] }
    }

    componentDidMount() {

    }

    render() { return (
        <div>
            <p> Welcome to Scrabster{props.user ? `, ${getName(props)}!` : '!'} </p>
            <p> Select a game </p>
            <select value={props.selectedGameId} onChange={props.handleGameSelect}>
                <option value=""> New game </option>
                <option value="123456"> 123456 </option>
            </select>
            <button>
                <Link to="/game"> Go! </Link>
            </button>
        </div>);  
    }

}

