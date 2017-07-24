import { browserHistory } from 'react-router';

export const LOADING = 'LOADING';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SHOW_HOME = 'SHOW_HOME';
export const CHANGE_GIF = 'CHANGE_GIF';
export const CHANGE_SIGNIN_VALUE = 'CHANGE_SIGNIN_VALUE';
export const CHANGE_SIGNUP_VALUE = 'CHANGE_SIGNUP_VALUE';
export const SET_USER = 'SET_USER';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function loading() {
    return {
        type: LOADING,
    };
}

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

function setUser(user) {
    return {
        type: SET_USER,
        payload: {
            user,
        },
    };
}

function signUpError(error) {
    return {
        type: SIGN_UP_ERROR,
        payload: {
            error,
        },
    };
}

function loginError(error) {
    return {
        type: LOGIN_ERROR,
        payload: {
            error,
        },
    };
}

export function signUp(user) {
    return (dispatch) => {
        dispatch(loading());
        return fetch('http://54.89.153.22:8080/api/users/create', {
            method: 'POST',
            body: JSON.stringify(user),
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    setTimeout(() => {
                        dispatch(setUser(json.user));
                        browserHistory.push('/dashboard');
                    }, 1000);
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    setTimeout(() => {
                        dispatch(signUpError(error));
                    }, 1000);
                }
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(signUpError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function login(user) {
    return (dispatch) => {
        dispatch(loading());
        return fetch('http://54.89.153.22:8080/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            mode: 'cors',
            credentials: 'include',
        })
        .then((res) => {
            return res.json().then((json) => {
                console.log(res);
                console.log(res.headers.get('set-cookie'));
                if (res.ok) {
                    setTimeout(() => {
                        dispatch(setUser(json.user));
                        browserHistory.push('/dashboard');
                    }, 1000);
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    setTimeout(() => {
                        dispatch(loginError(error));
                    }, 1000);
                }
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(loginError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function getSession() {
    return (dispatch) => {
        dispatch(loading());
        return fetch('http://54.89.153.22:8080/api/users/session', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok && json.user) {
                    dispatch(setUser(json.user));
                    browserHistory.push('/dashboard');
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    browserHistory.replace('/');
                    dispatch(loginError(error));
                }
            });
        })
        .catch((err) => {
            browserHistory.replace('/');
            setTimeout(() => dispatch(loginError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}
