import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AuthenticateUser from './common/AuthenticateUser';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Station from './station/Station';
import NotFound from './common/NotFound';
import Main from './main/Main';

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route component={AuthenticateUser}>
            <Route path="dashboard" component={Dashboard} />
            <Route path=":username/:stationName" component={Station} />
        </Route>
        <Route path="*" component={NotFound} />
    </Route>
);
