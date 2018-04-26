
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './home';


export const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return <Route {...rest} 
    render={props => {
        return user && user.name /* checking for logged in user here */
            ? (<Component user={user} {...props} />) 
            : (<Redirect to={{ pathname: "/", state: { from: props.location }}}/>)}
    }
  />
};
