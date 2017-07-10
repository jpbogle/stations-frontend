import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import NotFound from './common/NotFound';
import Main from './main/Main';

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
    </Route>
);
