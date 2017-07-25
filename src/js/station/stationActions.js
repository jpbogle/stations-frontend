import SC from 'soundcloud';
import { browserHistory } from 'react-router';
import BaseURI from '../common/BaseURI';

export const LOADING_SEARCH = 'LOADING_SEARCH';
export const LOADING_STATION = 'LOADING_STATION';
export const SET_STATION = 'SET_STATION';
export const SET_SOUNDCLOUD_SONGS = 'SET_SOUNDCLOUD_SONGS';
export const STATION_ERROR = 'STATION_ERROR';
export const SPOTIFY_ERROR = 'SPOTIFY_ERROR';
export const SOUNDCLOUD_ERROR = 'SOUNDCLOUD_ERROR';
export const APPLEMUSIC_ERROR = 'APPLEMUSIC_ERROR';

const dev = true;
SC.initialize({
    client_id: dev ? 'oG45iJyWRj8McdpinDKk4QSgRm8C1VzL' : 'GwGiygexslzpWR05lHIGqMBPPN0blbni',
});

import jwt from 'jsonwebtoken';

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
//backdate a jwt 30 seconds
var older_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');

// sign asynchronously
jwt.sign({ foo: 'bar' }, 'test', { algorithm: 'HS256' }, function(err, token) {
  console.log(token);
});

jwt.sign({ iss: '2EXVDJ88N2' }, 'K85QWRBW9T', { algorithm: 'ES256', keyid: 'K85QWRBW9T', expiresIn: '10000' }, function(err, token) {
  console.log(token);
});

jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  data: 'foobar'
}, 'secret');
function loadingStation() {
    return {
        type: LOADING_STATION,
    };
}

function loadingSearch() {
    return {
        type: LOADING_SEARCH,
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

function setSoundCloudSongs(songs, query) {
    return {
        type: SET_SOUNDCLOUD_SONGS,
        payload: {
            songs,
            query,
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

function spotifyError(error) {
    return {
        type: SPOTIFY_ERROR,
        payload: {
            error,
        },
    };
}

function soundcloudError(error) {
    return {
        type: SOUNDCLOUD_ERROR,
        payload: {
            error,
        },
    };
}

function appleMusicError(error) {
    return {
        type: APPLEMUSIC_ERROR,
        payload: {
            error,
        },
    };
}

export function addSong(songRequest) {
    const stationRoute = browserHistory.getCurrentLocation().pathname;
    return (dispatch) => {
        dispatch(loadingStation());
        return fetch(`${BaseURI}/api${stationRoute}/songs/add`, {
            method: 'POST',
            body: JSON.stringify(songRequest),
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    console.log(json);
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


export function getStation(stationRoute) {
    return (dispatch) => {
        dispatch(loadingStation());
        return fetch(`${BaseURI}/api${stationRoute}`, {
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

export function searchSpotify(query) {
    return (dispatch) => {
        return fetch('https://api.spotify.com/v1/search', {
            method: 'POST',
            body: JSON.stringify({
                q: query,
                type: 'track,artist',
            }),
            // mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                console.log(res);
                if (res.ok) {
                    dispatch(setSpotifySongs(json));
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    dispatch(spotifyError(error));
                }
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(spotifyError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function searchSoundcloud(query) {
    return (dispatch) => {
        if (query === '') {
            return dispatch(setSoundCloudSongs([], ''));
        }
        return SC.get('/tracks', {
            q: query,
        })
        .then((res) => {
            if (res) {
                const songs = res.map((song) => {
                    return {
                        song_id: `${song.id}`,
                        title: song.title,
                        artist: song.user.username,
                        album_url: song.artwork_url,
                        duration: song.duration,
                    };
                });
                dispatch(setSoundCloudSongs(songs, query));
            } else {
                const error = {
                    status: res.status,
                    type: json.error_type,
                    message: json.error_message,
                };
                dispatch(soundcloudError(error));
            }
        })
        .catch((err) => {
            setTimeout(() => dispatch(soundcloudError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function searchAppleMusic(query) {
    return (dispatch) => {
        return fetch('', {
            method: 'POST',
            body: JSON.stringify(query),
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    dispatch(setAppleMusicSongs(json));
                } else {
                    const error = {
                        status: res.status,
                        type: json.error_type,
                        message: json.error_message,
                    };
                    dispatch(appleMusicError()(error));
                }
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(appleMusicError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function searchAll(query) {
    return (dispatch) => {
        //TODO if we want search to wait for all to load
        // dispatch(loadingSearch());
        dispatch(searchSoundcloud(query));
        dispatch(searchSpotify(query));
        // dispatch(searchAppleMusic(query));
    };
}
