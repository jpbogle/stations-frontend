import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import hello from './hello/helloReducer';

export default combineReducers({
    routing: routerReducer,
    hello ,
});
