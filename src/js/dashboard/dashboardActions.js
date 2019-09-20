import querystring from 'querystring';
import { browserHistory } from 'react-router';
import BaseURI from '../common/BaseURI';
import { setUser } from '../login/loginActions';
export const STATION_ERROR = 'STATION_ERROR';
export const SET_STATION = 'SET_STATION';
export const ADD_CODE = 'ADD_CODE';
export const SIGN_OUT = 'SIGN_OUT';


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

export function addCode(username, source, code) {
    return (dispatch) => {
        return fetch(`http://${BaseURI}/api/users/${username}/accounts`, {
            method: 'POST',
            body: JSON.stringify({
                source,
                code,
            }),
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    dispatch(setUser(json.user));
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

export function createStation(username, stationName) {
    return (dispatch) => {
        return fetch(`http://${BaseURI}/api/stations/create`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                station_name: stationName,
            }),
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    dispatch(setStation(json.station));
                    browserHistory.push(`/${username}/${json.station.name}`);
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

export function authSpotify() {
    const str = querystring.stringify({
        client_id: 'bec7cb795af042689409eb98a961e77e',
        redirect_uri: 'http://localhost:4000/dashboard',
        response_type: 'code',
        show_dialog: 'true',
    });
    window.location = `https://accounts.spotify.com/authorize?${str}&scope=streaming%20user-read-birthdate%20user-read-email%20user-read-private`;
}

export function refreshSpotify(username) {
    return (dispatch) => {
        return fetch(`http://${BaseURI}/api/users/${username}/refresh/spotify`, {
            method: 'GET',
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    dispatch(setUser(json.user));
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

export function authSoundcloud() {

}

export function authApplemusic() {

}

export function loginSpotify(accessToken) {
    // return (dispatch) => {
    console.log(accessToken);
    return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((res) => {
        console.log(res);
        if (res.status === 401) {
            return 401;
        }
        return res.json();
    })
    .then((json) => {
        return json;
    })
    .catch((err) => {
        console.log(err);
        return null;
    });
}

export function removeAccount(username, source) {
    return (dispatch) => {
        return fetch(`http://${BaseURI}/api/users/${username}/accounts/${source}`, {
            method: 'DELETE',
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    console.log(json.user)
                    dispatch(setUser(json.user));
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
