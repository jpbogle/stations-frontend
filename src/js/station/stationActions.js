import { browserHistory } from 'react-router';

export const LOADING = 'LOADING';
export const SET_STATION = 'SET_STATION';
export const STATION_ERROR = 'STATION_ERROR';


export function loading() {
    return {
        type: LOADING,
    };
}

function setStation(station) {
    return {
        type: SET_STATION,
        payload: {
            station,
        },
    };
}

function stationError(error) {
    return {
        type: STATION_ERROR,
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

export function getStation(stationRoute) {
    console.log(stationRoute);
    return (dispatch) => {
        dispatch(loading());
        return fetch(`http://localhost:8080/api${stationRoute}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    dispatch(setStation(json.station));
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    dispatch(stationError(error));
                }
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(stationError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}
