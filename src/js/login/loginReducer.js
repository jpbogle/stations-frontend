import {
    SIGN_IN,
    SIGN_UP,
    SHOW_HOME,
    SET_USER,
    SIGN_UP_ERROR,
} from './loginActions';

const initialState = {
    signIn: {
        shown: false,
    },
    signUp: {
        shown: false,
        error: null,
    },
    user: null,
};

/**
 * Export a single reducer to be combined in a `combineReducers`
 * call during store initialization.
 */
export default function helloReducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
    case SIGN_IN:
        return {
            ...state,
            signIn: {
                ...state.signIn,
                shown: true,
            },
            signUp: {
                ...state.signUp,
                shown: false,
            },
        };

    case SIGN_UP:
        return {
            ...state,
            signIn: {
                ...state.signIn,
                shown: false,
            },
            signUp: {
                ...state.signUp,
                shown: true,
            },
        };

    case SHOW_HOME:
        return {
            ...state,
            signIn: {
                ...state.signIn,
                shown: false,
            },
            signUp: {
                ...state.signUp,
                shown: false,
            },
        };

    case SET_USER:
        console.log(payload.user);
        return {
            ...state,
            user: payload.user,
        };

    case SIGN_UP_ERROR:
        return {
            ...state,
            signUp: {
                ...state.signUp,
                error: payload.error,
            }
        };

    default:
        return state;
    }
}
