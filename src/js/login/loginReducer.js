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
    gif: 0,
    signIn: {
        shown: false,
        username: '',
        password: '',
    },
    signUp: {
        shown: false,
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
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
        };

    case SIGN_UP:
        return {
            ...state,
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

    case CHANGE_GIF:
        return {
            ...state,
            gif: payload.gifNumber,
        };

    case CHANGE_SIGNIN_VALUE:
        return {
            ...state,
            signIn: {
                ...state.signIn,
                [payload.type]: payload.value,
            },
        };

    case CHANGE_SIGNUP_VALUE:
        return {
            ...state,
            signUp: {
                ...state.signUp,
                [payload.type]: payload.value,
            },
        };

    case SUBMIT_LOGIN:
        return state;

    default:
        return state;
    }
}
