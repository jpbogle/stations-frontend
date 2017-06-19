export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
export const REQUEST_QUOTES = 'REQUEST_QUOTES';
export const RECIEVE_QUOTES_SUCCESS = 'RECIEVE_QUOTES_SUCCESS';
export const RECIEVE_QUOTES_FAILURE = 'RECIEVE_QUOTES_FAILURE';

/* Pure actions */

export function changeMessage(id) {
    return {
        type: CHANGE_MESSAGE,
        id,
    };
}

export function requestQuotes(url) {
    return {
        type: REQUEST_QUOTES,
        payload: {
            url,
        },
    };
}

export function recieveQuotesSuccess(quotes) {
    return {
        type: RECIEVE_QUOTES_SUCCESS,
        payload: {
            quotes,
        },
    };
}

export function recieveQuotesFailure(error) {
    return {
        type: RECIEVE_QUOTES_FAILURE,
        error: true,
        payload: {
            error,
        },
    };
}

/* Complex actions */

export function onButtonClicked(id) {
    return dispatch => dispatch(changeMessage(id));
}

export function onRequestQuotes(url) {
    return (dispatch) => {
        dispatch(requestQuotes(url));

        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then((res) => {
            const { ok, status, statusText } = res;

            if (ok) {
                return res.json().then((quotes) => {
                    dispatch(recieveQuotesSuccess(quotes));
                    return { payload: quotes }; // return for testing
                });
            }

            dispatch(recieveQuotesFailure({ status, statusText }));
            return Promise.reject(res);
        })
        .catch((err) => {
            dispatch(recieveQuotesFailure({ status: err.name, statusText: err.message }));
            return Promise.reject(err);
        });
    };
}
