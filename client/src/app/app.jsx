
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import axios from 'axios';

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
            selectedGameId: ''
        };
        this.handleGameSelect = this.handleGameSelect.bind(this);
    }

    componentDidMount() {
        axios.get('/user')
            .then(({ data }) => {
                console.log('Received user data: ', data);
                this.setState({ user: data });
            });
    }

    handleGameSelect(e) {
        console.log('selected a game id: ', e.target.value);
        this.setState({ selectedGameId: e.target.value });
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
                    handleGameSelect: this.handleGameSelect
                })}
                component={Home} 
            />
            <PrivateRoute exact path="/game" 
                customProps={({
                    user: this.state.user,
                    selectedGameId: this.state.selectedGameId,
                    handleGameSelect: this.handleGameSelect
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
