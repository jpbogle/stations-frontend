import { Router } from 'react-router';
import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import createStoreAndHistory from './store';
import routes from './routes';
import DevTools from './common/DevTools';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const { store, history } = createStoreAndHistory();

ReactDOM.render(
    <Provider  store={store}>
        <div>
            <Router history={ history}>
                { routes }
            </Router>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('content')
);
