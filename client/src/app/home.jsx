
import React from 'react';
import { Link } from 'react-router-dom';

const cap = function(str) {
    return str[0].toUpperCase() + str.slice(1);
};

const getName = function(props) {
    if (props.user.name.givenName) {
        return cap(props.user.name.givenName);
    } else {
        return cap(props.user.displayName.split(' ')[0]);
    }
}

export const Home = props => (
    <div>
        <p>Welcome to Scrabster{props.user ? `, ${getName(props)}!` : '!'}</p>
        <ul>
          <li> <Link to="/game">Go to game</Link> </li>
        </ul>
    </div>
)
