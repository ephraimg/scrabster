
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './logo';

export const Banner = props =>
    <div className="banner">  
        <Logo />
        <ul>
          <li> <Link to="/home">Home</Link> </li>
          <li> <Link to="/game">Game</Link> </li>
        </ul>
    </div>;
