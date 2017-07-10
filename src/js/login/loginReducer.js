import {
    SIGN_IN,
    SIGN_UP,
    SHOW_HOME,
    CHANGE_GIF,
    CHANGE_SIGNIN_VALUE,
    CHANGE_SIGNUP_VALUE,
    SUBMIT_LOGIN,
} from './loginActions';

const initialState = {
    signIn: {
        shown: false,
    },
    signUp: {
        shown: false,
    },
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

    case SUBMIT_LOGIN:
        return state;

    default:
        return state;
    }
}
