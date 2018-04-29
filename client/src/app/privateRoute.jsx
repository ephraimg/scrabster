
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './home';

export const PrivateRoute = ({ component: Component, customProps, ...rest }) =>
    <Route {...rest} render={ props => customProps.user && customProps.user.id 
        /* checked for logged in user */
        ? <Component {...{...props, ...customProps}} />
        : <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
    }/>

// Note: use of {...{...props, ...customProps}} is necessary.
// Error is thrown by {...props, ...customProps}