import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateEmployerRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('company')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/loginEmployer', state: { from: props.location } }} />
    )} />
)