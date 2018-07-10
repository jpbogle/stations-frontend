import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AuthenticateUser from './login/AuthenticateUser';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Station from './station/Station';
import NotFound from './common/NotFound';

export default (
    <Route path="/">
        <IndexRoute component={Login} />
        <Route path="/" component={AuthenticateUser}>
            <Route path="dashboard" component={Dashboard} />
        </Route>
        <Route path=":username/:stationName" component={Station} />
        <Route path="*" component={NotFound} />
    </Route>
);
