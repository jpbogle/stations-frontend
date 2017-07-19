import {
    SIGN_IN,
    SIGN_UP,
    SHOW_HOME,
    SET_USER,
    SIGN_UP_ERROR,
    LOADING,
    LOGIN_ERROR,
} from './loginActions';

const noError = {
    status: 200,
    type: '',
    message: '',
};

const initialState = {
    signIn: {
        shown: false,
        error: noError,
    },
    signUp: {
        shown: false,
        error: noError,
    },
    user: null,
    loading: false,
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

    case LOADING:
        return {
            ...state,
            loading: true,
            signUp: {
                ...state.signUp,
                error: noError,
            },
            signIn: {
                ...state.signIn,
                error: noError,
            },
        };

    case SET_USER:
        return {
            ...state,
            user: payload.user,
            loading: false,
        };

    case SIGN_UP_ERROR:
        return {
            ...state,
            signUp: {
                ...state.signUp,
                error: payload.error,
            },
            loading: false,
        };

    case LOGIN_ERROR:
        return {
            ...state,
            signIn: {
                ...state.signIn,
                error: payload.error,
            },
            loading: false,
        };

    default:
        return state;
    }
}
