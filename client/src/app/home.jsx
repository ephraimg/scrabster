
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Home extends React.Component {

    constructor(props) {
        // console.log('Home props, ', props);
        super(props);
        this.state = { 
            games: [], gameOptions: [], 
            opponents: [], opponentOptions: [] 
        };
    }

    dateFromObjectId(objectId) {
        return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    }

    // Useful because objects from db don't have Player methods!
    getObjName(userObj) {
        return this.props.user.getName.call(userObj);
    }

    cleanNames(users) {
        // alphabetize users by name
        users.sort((a, b) => this.getObjName(a) < this.getObjName(b));
        // exclude this.user, since list will already have user's profile
        return users.filter(user => user.id !== this.props.user.id);
    }

    componentDidMount() {
        axios.get('/games')
            .then(({ data }) => {
                const gameOptions = [<option value=""> New game </option>]
                    .concat(data.reverse().map(game =>
                        <option value={game.id}> 
                            {this.getObjName(game.player1)} vs. {this.getObjName(game.player2)}, 
                            started {this.dateFromObjectId(game._id).toLocaleString("en-us")} 
                        </option>));
                this.setState({ games: data, gameOptions });
            });
        axios.get('/users')
            .then(({ data }) => {
                const opponentOptions = [<option value={this.props.user.id}>{this.props.user.getName()}</option>]
                    .concat(this.cleanNames(data).map(opponent =>
                        <option value={opponent.id}> 
                            {opponent.displayName} 
                        </option>));
                this.setState({ 
                    opponents: data, 
                    opponentOptions
                });
            });
    }

    render() { return (
        <div className="ctr-horiz">
            <h1> Welcome to Scrabster{this.props.user ? `, ${this.props.user.getName()}!` : '!'} </h1>
            <div className="game-selection">
                <p> Select a previous game to resume: </p>
                <select value={this.props.selectedGameId} onChange={this.props.handleGameSelect}>
                    {this.state.gameOptions}
                </select>
                <p> Or select an opponent for a new game: </p>
                <select value={this.props.selectedOpponentId} onChange={this.props.handleOpponentSelect}>
                    {this.state.opponentOptions}
                </select>
                <Link to="/game"> <button>Go!</button></Link>    
            </div>
            <hr/>
            <div className="instructions">
                <h2> Instructions </h2>
                <ul>
                    <li>To appear in the opponent menu, users must have logged in at least once. 
                        In order to log in, users must contact the admin for pre-approval.</li>
                    <li>To place a tile, click to select it and then select a square.
                        You may remove a selected tile from the board by clicking next to your other tiles.</li>
                    <li>Fake words are not automatically blocked.</li>
                    <li>An option to challenge words is coming soon!</li>
                </ul>
            </div>
        </div>);  
    }

}

