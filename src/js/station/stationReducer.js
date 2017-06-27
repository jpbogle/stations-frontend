import {
    REQUEST_QUOTES,
    RECIEVE_QUOTES_SUCCESS,
    RECIEVE_QUOTES_FAILURE,
    CHANGE_MESSAGE,
} from './stationActions';

function getMessage(id, quotes) {
    const idx = id % quotes.length;
    return quotes[idx];
}

const initialState = {
    text: 'Hello World!',
    quotes: [],
    fetching: false,
    error: null,
};

/**
 * Export a single reducer to be combined in a `combineReducers`
 * call during store initialization.
 */
export default function helloReducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case REQUEST_QUOTES:
            return {
                ...state,
                fetching: true,
            };

        case RECIEVE_QUOTES_SUCCESS:
            return {
                ...state,
                fetching: false,
                quotes: [...payload.quotes],
            };

        case RECIEVE_QUOTES_FAILURE:
            return {
                ...state,
                fetching: false,
                error: payload.error,
            };

        case CHANGE_MESSAGE:
            return {
                ...state,
                text: getMessage(action.id, state.quotes),
            };

        default:
            return state;
    }
}
