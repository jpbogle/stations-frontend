import SC from 'soundcloud';
import { browserHistory } from 'react-router';
import BaseURI from '../common/BaseURI';

export const LOADING_SEARCH = 'LOADING_SEARCH';
export const LOADING_STATION = 'LOADING_STATION';
export const SET_STATION = 'SET_STATION';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const SET_SOUNDCLOUD_SONGS = 'SET_SOUNDCLOUD_SONGS';
export const SET_APPLE_MUSIC_SONGS = 'SET_APPLE_MUSIC_SONGS';
export const STATION_ERROR = 'STATION_ERROR';
export const SPOTIFY_ERROR = 'SPOTIFY_ERROR';
export const SOUNDCLOUD_ERROR = 'SOUNDCLOUD_ERROR';
export const APPLEMUSIC_ERROR = 'APPLEMUSIC_ERROR';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';

const dev = true;
SC.initialize({
    client_id: dev ? 'oG45iJyWRj8McdpinDKk4QSgRm8C1VzL' : 'GwGiygexslzpWR05lHIGqMBPPN0blbni',
});

import jwt from 'jsonwebtoken';

let appleMusicToken;
jwt.sign({ iss: '2EXVDJ88N2' }, '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgIid3+wnYhhPXSvrjH7BO1o7KgacJpVIYIrufxmiKSgCgCgYIKoZIzj0DAQehRANCAARCdYFP5H8z7/Z9JOBk+aNzxxuxnqmNz/l2wGpaUo8Zu//W3DYR+x6nALb23XpSDHl/2mAqMuKzUOqaxOO3Axeu\n-----END PRIVATE KEY-----', { algorithm: 'ES256', keyid: 'SMJSB9AGUQ', expiresIn: '1000000' }, function(err, token) {
    appleMusicToken = token;
});

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

function setSearchValue(query) {
    return {
        type: SET_SEARCH_VALUE,
        payload: {
            query,
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

function setAppleMusicSongs(songs, query) {
    return {
        type: SET_APPLE_MUSIC_SONGS,
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

function notification(message) {
    return {
        type: SEND_NOTIFICATION,
        payload: {
            message,
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


function openSocket(stationRoute, dispatch) {
    const exampleSocket = new WebSocket(`ws://localhost:8080/api${stationRoute}/ws`);
    exampleSocket.onmessage = function (event) {
        dispatch(setStation(JSON.parse(event.data).station));
        dispatch(notification(JSON.parse(event.data).message));
    };
}

export function getStation(stationRoute) {
    return (dispatch) => {
        openSocket(stationRoute, dispatch);
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
    const term = query.replace(/ /g, '+');
    return (dispatch) => {
        return fetch(`https://api.music.apple.com/v1/catalog/us/search?term=${term}?&types=artists,songs&limit=15`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${appleMusicToken}`,
            },
            mode: 'cors',
        })
        .then((res) => {
            return res.json().then((json) => {
                if (res.ok) {
                    if (!json.results.songs) {
                        return dispatch(setAppleMusicSongs([], ''));
                    }
                    const songs = json.results.songs.data.map((song) => {
                        let albumUrl = song.attributes.artwork.url.replace(/{w}/g, Math.floor(song.attributes.artwork.width / 10));
                        albumUrl = albumUrl.replace(/{h}/g, Math.floor(song.attributes.artwork.height / 10));
                        return {
                            song_id: `${song.id}`,
                            title: song.attributes.name,
                            artist: song.attributes.artistName,
                            album_url: albumUrl,
                            duration: song.attributes.durationInMillis,
                        };
                    });
                    return dispatch(setAppleMusicSongs(songs, query));
                }
                const error = {
                    status: res.status,
                    type: json.error_type,
                    message: json.error_message,
                };
                return dispatch(appleMusicError()(error));
            });
        })
        .catch((err) => {
            setTimeout(() => dispatch(appleMusicError({ status: 500, type: 'Internal server error', message: err })), 1000);
        });
    };
}

export function searchAll(query) {
    return (dispatch) => {
        dispatch(setSearchValue(query));
        if (query === '') {
            return;
        }
        // TODO if we want search to wait for all to load
        // dispatch(loadingSearch());
        dispatch(searchSoundcloud(query));
        // dispatch(searchSpotify(query));
        dispatch(searchAppleMusic(query));
    };
}

