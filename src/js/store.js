import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';

import thunk from 'redux-thunk';
import createHistory from 'react-router/node_modules/history/lib/createHashHistory';
import reducer from './reducers';
import DevTools from './common/DevTools';

const history = useRouterHistory(createHistory)({
    basename: '/',
});

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
