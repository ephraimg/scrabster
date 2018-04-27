
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

    getOtherName(game) {
        return this.props.user.id === game.player1.id
            ? this.getObjName(game.player2) : this.getObjName(game.player1);
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
                            You vs. {this.getOtherName(game)}, 
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
        <div className="ctr-horiz" style={{marginTop: "4em"}}>
            <h1> Welcome to Scrabster{this.props.user ? `, ${this.props.user.getName()}!` : '!'} </h1>
            <br/>
            <p> Select a previous game to resume </p>
            <select value={this.props.selectedGameId} onChange={this.props.handleGameSelect}>
                {this.state.gameOptions}
            </select>
            <br/><br/>
            <p> Or select an opponent for a new game </p>
            <select value={this.props.selectedOpponentId} onChange={this.props.handleOpponentSelect}>
                {this.state.opponentOptions}
            </select>
            <br/><br/>
            <Link to="/game"> <button>Go!</button></Link>
            
        </div>);  
    }

}

