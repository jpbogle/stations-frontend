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
            error: {
                status: error.status,
                statusText: error.statusText.message,
            },
        },
    };
}

export function signUp(user) {
    return (dispatch) => {
        dispatch(loading());
        return fetch('http://localhost:8080/api/users/create', {
            method: 'POST',
            body: JSON.stringify(user),
            mode: 'cors',
        })
        .then((res) => {
            const { ok, status, statusText } = res;
            if (ok) {
                return res.json().then((json) => {
                    setTimeout(() => {
                        dispatch(setUser(json.User));
                        browserHistory.push('/dashboard');
                    }, 1000);
                });
            }
            return dispatch(signUpError({ status, statusText }));
        })
        .catch((err) => {
            setTimeout(() => dispatch(signUpError({ status: 500, statusText: err })), 1000);
        });
    };
}

// export function login() {
//     return (dispatch) => {
//         //Dispatch loading here if we want
//         return fetch('http://localhost:8080/api/users/create', {
//             method: 'GET',
//             mode: 'cors',
//         })
//         .then((res) => {
//             const { ok, status, statusText } = res;
//             if (ok) {
//                 return res.json().then((imageObj) => {
//                     console.log(imageObj);
//                     dispatch(getImage(imageObj));
//                 });
//             }
//             return dispatch(errorAction({ status, statusText }));
//         })
//         .catch(() => {
//             dispatch(errorAction({ status: 500, statusText: 'Connection refused, please try again later' }));
//         });
//     };
// }
