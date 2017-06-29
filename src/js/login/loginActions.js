export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SHOW_HOME = 'SHOW_HOME';
export const CHANGE_GIF = 'CHANGE_GIF';
export const CHANGE_SIGNIN_VALUE = 'CHANGE_SIGNIN_VALUE';
export const CHANGE_SIGNUP_VALUE = 'CHANGE_SIGNUP_VALUE';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export function showSignIn() {
    return {
        type: SIGN_IN,
    };
}

export function showSignUp() {
    return {
        type: SIGN_UP,
    };
}

export function showHome() {
    return {
        type: SHOW_HOME,
    };
}

export function submitLogin() {
    return {
        type: SUBMIT_LOGIN,
    };
}
