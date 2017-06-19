import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { default as Hello } from './hello/Hello';

import MainView from './main/MainView';
import NotFound from './common/NotFound';
import ToDo from './main/ToDo';

export default (
    <Route path="/" component={MainView}>
      <IndexRoute component={ToDo} />
      <Route path="*" component={NotFound} />
    </Route>
);
