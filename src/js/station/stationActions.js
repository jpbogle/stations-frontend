import SC from 'soundcloud';
import { browserHistory } from 'react-router';

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
        return fetch(`http://54.89.153.22:8080/api${stationRoute}/songs/add`, {
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
        return fetch(`http://54.89.153.22:8080/api${stationRoute}`, {
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
