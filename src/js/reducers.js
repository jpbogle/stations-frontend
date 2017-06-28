import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import station from './station/stationReducer';
import login from './login/loginReducer';

export default combineReducers({
    routing: routerReducer,
    station,
    login,
});
