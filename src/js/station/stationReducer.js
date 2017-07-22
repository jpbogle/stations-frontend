import {
    LOADING_STATION,
    LOADING_SEARCH,
    SET_STATION,
    STATION_ERROR,
    SPOTIFY_ERROR,
    SET_SOUNDCLOUD_SONGS,
    SOUNDCLOUD_ERROR,
    APPLEMUSIC_ERROR,
} from './stationActions';

const noError = {
    status: 200,
    type: '',
    message: '',
};

const initialState = {
    station: {},
    loading: true,
    error: noError,
    search: {
        spotify: {
            loading: false,
            error: noError,
            songs: [],
            query: '',
        },
        soundcloud: {
            loading: false,
            error: noError,
            songs: [],
            query: '',
        },
        appleMusic: {
            loading: false,
            error: noError,
            songs: [],
            query: '',
        },
    },
};

/**
 * Export a single reducer to be combined in a `combineReducers`
 * call during store initialization.
 */
export default function helloReducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {

    case SET_STATION:
        return {
            ...state,
            station: payload.station,
            loading: false,
        };

    case LOADING_STATION:
        return {
            ...state,
            loading: true,
        };

    case STATION_ERROR:
        return {
            ...state,
            error: payload.error,
        };

    case LOADING_SEARCH:
        return {
            ...state,
            search: {
                ...state.search,
                loading: true,
            },
        };
    case SPOTIFY_ERROR:
        return {
            ...state,
            search: {
                ...state.search,
                spotify: {
                    loading: false,
                    error: payload.error,
                    songs: [],
                },
            },
        };

    case SET_SOUNDCLOUD_SONGS:
        return {
            ...state,
            search: {
                ...state.search,
                soundcloud: {
                    loading: false,
                    error: noError,
                    songs: payload.songs,
                    query: payload.query,
                },
            },
        };

    case SOUNDCLOUD_ERROR:
        return {
            ...state,
            search: {
                ...state.search,
                soundcloud: {
                    loading: false,
                    error: payload.error,
                    songs: [],
                },
            },
        };

    case APPLEMUSIC_ERROR:
        return {
            ...state,
            search: {
                ...state.search,
                appleMusic: {
                    loading: false,
                    error: payload.error,
                    songs: [],
                },
            },
        };
    default:
        return state;
    }
}
