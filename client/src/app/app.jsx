
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
            user: {}
        };
    }
    componentDidMount() {
        axios.get('/user')
            .then(({ data }) => {
                console.log('Received data: ', data);
                this.setState({ user: data });
            })
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
            <PrivateRoute exact path="/home" user={this.state.user} component={Home} />
            <PrivateRoute exact path="/game" user={this.state.user} component={GameView} />
        </div>
    )}    
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('app'));
