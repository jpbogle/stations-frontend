import {
    SET_STATION,
    STATION_ERROR,
    ADD_CODE,
    SIGN_OUT,
} from './dashboardActions';

const noError = {
    status: 200,
    type: '',
    message: '',
};

const initialState = {
    station: null,
    accounts: {},
    error: noError,
};

/**
 * Export a single reducer to be combined in a `combineReducers`
 * call during store initialization.
 */
export default function helloReducer(state = initialState, action) {
    const { payload } = action;
    const x = {
        ...state,
        accounts: {
            ...state.accounts,
            [payload.source]: payload.code,
        },
    };
    console.log(x);
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
    case ADD_CODE:
        return {
            ...state,
            accounts: {
                ...state.accounts,
                [payload.source]: payload.code,
            },
        };

    default:
        return state;
    }
}
