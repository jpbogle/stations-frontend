import {
    SET_STATION,
    STATION_ERROR,
} from './dashboardActions';

const noError = {
    status: 200,
    type: '',
    message: '',
};

const initialState = {
    station: null,
    error: noError,
};

/**
 * Export a single reducer to be combined in a `combineReducers`
 * call during store initialization.
 */
export default function helloReducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {

    case SET_STATION:
        return {
            ...state,
            station: payload.station,
            error: noError,
        };

    case STATION_ERROR:
        return {
            ...state,
            error: payload.error,
        };

    default:
        return state;
    }
}
