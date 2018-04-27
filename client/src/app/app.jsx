
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

import { Player } from '../gameLogic/Player';
import { Login } from './login';
import { Home } from './home';
import { Banner } from './banner';
import { GameView } from './gameView';
import { PrivateRoute } from './PrivateRoute';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            selectedGameId: '',
            selectedOpponentId: null
        };
        this.handleGameSelect = this.handleGameSelect.bind(this);
        this.handleOpponentSelect = this.handleOpponentSelect.bind(this);
    }

    componentDidMount() {
        axios.get('/user')
            .then(({ data }) => {
                this.setState({ user: new Player(data), selectedOpponentId: data.id });
            });
    }

    handleGameSelect(e) {
        // console.log('selected a game id: ', e.target.value);
        this.setState({ selectedGameId: e.target.value });
    }

    handleOpponentSelect(e) {
        // console.log('selected an opponent id: ', e.target.value);
        this.setState({ selectedOpponentId: e.target.value });
    }

    render() { return (
        <div id="routes-view">
            <Route render={({ location }) => 
                location.pathname === '/home' || location.pathname === '/game' 
                    ? <Banner /> : null
            }/>
            <Route exact path="/" render={() => 
                this.state.user.name 
                    ? <Redirect to="/home" /> : <Login />
            }/>
            <PrivateRoute exact path="/home"
                customProps={({
                    user: this.state.user,
                    selectedGameId: this.state.selectedGameId,
                    handleGameSelect: this.handleGameSelect,
                    selectedOpponentId: this.state.selectedOpponentId,
                    handleOpponentSelect: this.handleOpponentSelect
                })}
                component={Home} 
            />
            <PrivateRoute exact path="/game" 
                customProps={({
                    user: this.state.user,
                    selectedGameId: this.state.selectedGameId,
                    handleGameSelect: this.handleGameSelect,
                    selectedOpponentId: this.state.selectedOpponentId,
                    handleOpponentSelect: this.handleOpponentSelect
                })}
                component={GameView} 
            />
        </div>
    )}    
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('app'));
