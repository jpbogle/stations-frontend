import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import station from './station/stationReducer';

export default combineReducers({
    routing: routerReducer,
    station,
});
