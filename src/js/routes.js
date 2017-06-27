import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Login from './main/Login';
import NotFound from './common/NotFound';
import Main from './main/Main';

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="/test" component={NotFound} />
        <Route path="*" component={NotFound} />
    </Route>
);
