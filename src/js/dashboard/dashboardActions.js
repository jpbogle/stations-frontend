import { browserHistory } from 'react-router';
import BaseURI from '../common/BaseURI';

export const STATION_ERROR = 'STATION_ERROR';
export const SET_STATION = 'SET_STATION';


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

