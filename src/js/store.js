import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import reducer from './reducers';
import DevTools from './common/DevTools';

const history = browserHistory;

export default function createStoreAndHistory(initialState) {
    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(thunk, routerMiddleware(history)),
            DevTools.instrument(),
        ),
    );
    const syncedHistory = syncHistoryWithStore(history, store);

    return { store, history: syncedHistory };
}

