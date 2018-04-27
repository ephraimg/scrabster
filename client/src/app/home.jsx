
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

    componentDidMount() {
        axios.get('/games')
            .then(({ data }) => {
                const dateFromObjectId = objectId =>
                    new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
                const gameOptions = [<option value=""> New game </option>]
                    .concat(data.map(game =>
                        <option value={game.id}> 
                            Game from {dateFromObjectId(game._id).toString()} 
                        </option>));
                this.setState({ games: data, gameOptions });
            });
        axios.get('/users')
            .then(({ data }) => {
                const opponentOptions = [<option value={this.props.user.id}>{this.props.user.getName()}</option>]
                    .concat(data.filter(opp => opp.id !== this.props.user.id)
                        .map(opponent =>
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

