import {
    LOADING_STATION,
    LOADING_SEARCH,
    SET_STATION,
    SET_ADMIN,
    SET_WEBSOCKET,
    SET_SEARCH_VALUE,
    STATION_ERROR,
    SPOTIFY_ERROR,
    SET_SOUNDCLOUD_SONGS,
    SET_APPLE_MUSIC_SONGS,
    SOUNDCLOUD_ERROR,
    APPLEMUSIC_ERROR,
    SEND_NOTIFICATION,
    REMOVE_NOTIFICATION,
    UPDATE_PLAYER,
} from './stationActions';

const noError = {
    status: 200,
    type: '',
    message: '',
};

const initialState = {
    player: {
        song: {},
        playing: false,
        time: 0,
    },
    station: {},
    position: 0,
    loading: true,
    error: noError,
    notifications: {},
    notificationNum: 0,
    admin: false,
    ws: null,
    search: {
        value: '',
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

    case SET_WEBSOCKET:
        return {
            ...state,
            ws: payload.ws,
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
                spotify: {
                    ...state.search.soundcloud,
                    loading: true,
                },
                soundcloud: {
                    ...state.search.soundcloud,
                    loading: true,
                },
                appleMusic: {
                    ...state.search.soundcloud,
                    loading: true,
                },
            },
        };

    case SET_SEARCH_VALUE:
        if (payload.query === '') {
            return {
                ...state,
                search: {
                    ...initialState.search,
                    value: payload.query,
                },
            };
        }
        return {
            ...state,
            search: {
                ...state.search,
                value: payload.query,
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
        if (state.search.value !== payload.query) {
            return state;
        }
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

    case SET_APPLE_MUSIC_SONGS:
        if (state.search.value !== payload.query) {
            return state;
        }
        return {
            ...state,
            search: {
                ...state.search,
                appleMusic: {
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
    case SET_ADMIN:
        return {
            ...state,
            admin: payload.admin,
        };

    case SEND_NOTIFICATION:
        return {
            ...state,
            notificationNum: state.notificationNum + 1,
            notifications: {
                ...state.notifications,
                [state.notificationNum]: {
                    header: payload.header,
                    message: payload.message,
                },
            },
        };

    case REMOVE_NOTIFICATION: {
        const newNotifications = { ...state.notifications };
        delete newNotifications[payload.id];

        return {
            ...state,
            notifications: newNotifications,
        };
    }

    case UPDATE_PLAYER:
        return {
            ...state,
            player: payload.currentSong,
        };
    default:
        return state;
    }
}
