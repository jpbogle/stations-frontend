import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import SC from 'soundcloud';
import { nextSong, sendPlayer, changeDevice } from './stationActions';
import { refreshSpotify } from '../dashboard/dashboardActions';

import SoundcloudLogo from '../common/SoundcloudLogo';
import { rejects } from 'assert';

const AlbumOuter = styled.div`
    width: 112px;
    height: 112px;
    float: left;

    svg {
        width: 112px;
        height: 112px;
    }
`;

const StyledPlayer = styled.div`
    position: fixed;
    bottom: 0px;
    height: 112px;
    width: 100%;
    background-color: rgba(40, 40, 40, 0.9);
    list-style: none;

    img {
        width: 112px;
        height: 112px;
        float: left;
    }
`;

const PlayerInfo = styled.div`
    float: left;
    width: calc(100vw - 112px);
    display: flex;
    position: relative;

    > * {
        float: left;
    }
`;

const PlaybackButtons = styled.div`
    height: 112px;
    padding-right: 24px;
    width: auto;
    padding-left:8px;

    i {
        margin: 40px 12px;
        color: #ccc;
        transition: .2s;
        cursor: pointer;
    }
    i:hover {
        transform: scale(1.1);
        color: #fff;
    }
`;

const Help = styled.div`
    margin-left: -52px;
    position: relative;
    top: -40px;
    right: -45px;
    transform: scale(0.6);

    &:hover {
        transform: scale(0.66);
    }
`;

class Player extends Component {

    static propTypes = {
        song: PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            artist: PropTypes.string,
            source: PropTypes.string,
            source_id: PropTypes.string,
            album_url: PropTypes.string,
            votes: PropTypes.number,
            duration: PropTypes.int,
        }),
        playing: PropTypes.bool,
        position: PropTypes.number,
        timestamp: PropTypes.number,
        nextSong: PropTypes.func.isRequired,
        admin: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        song: {
            title: '',
            artist: '',
        },
        position: 0,
        timestamp: Date.now(),
        playing: false,
    }



    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            appleMusicPlayer: null,
            soundCloudPlayer: null,
            spotifyPlayer: null,
            position: 0,
            muted: false,
            loading: true,
        };
        this.changeTime = :: this.changeTime;
        this.playSong = :: this.playSong;
        this.sendPause = :: this.sendPause;
        this.sendPlay = :: this.sendPlay;
        this.mute = :: this.mute;
        this.unmute = :: this.unmute;
    }

    initializeSoundcloud() {
        const dev = true;
        SC.initialize({
            client_id: dev ? 'oG45iJyWRj8McdpinDKk4QSgRm8C1VzL' : 'GwGiygexslzpWR05lHIGqMBPPN0blbni',
        });
    }

    initializeSpotify() {
        return new Promise((resolve, reject) => {
            const userAccessToken = this.props.spotifyAccess;
            if (window.Spotify && this.props.spotifyAccess) {
                const spotifyPlayer = new window.Spotify.Player({
                    name: 'Spotify Web Playback SDK',
                    getOAuthToken: callback => callback(userAccessToken),
                });
                spotifyPlayer.addListener('player_state_changed', s => { console.log(s); });
                spotifyPlayer.connect().then((res) => {
                    spotifyPlayer.on('ready', data => {
                        const spotifyDevice = data.device_id;
                        changeDevice(data.device_id, userAccessToken)
                        .then((res => {
                            this.setState({
                                ...this.state,
                                spotifyDevice,
                                spotifyPlayer,
                                loading: false,
                            }, () => {
                                // this.pauseSong("spotify");
                                resolve();
                            });
                        }))
                    });
                    spotifyPlayer.on('authentication_error', data => {
                        console.log("AUTH ERR")
                        this.props.refreshSpotify(this.props.user.username)
                        this.initializeSpotify();
                    })
                })
                .catch(err =>{

                })
            } else {
                reject();
            }
        })
    }

    initializeAppleMusic() {
        let appleMusic = MusicKit.getInstance();
        appleMusic.authorize().then((token) => {
            appleMusic.api.search("e",  { limit: 15, types: 'artists,songs' })
            .then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    componentDidMount() {
        this.initializeSoundcloud();
        // this.initializeAppleMusic();
        this.initializeSpotify().then(() => {
            const position = this.props.playing ? (this.props.position + (Date.now() - this.props.timestamp)) : this.props.position;
            this.setSong(position, this.props.song.source, this.props.song.source_id).then(() => {
                if (this.props.playing) {
                    this.playSong(position, this.props.song.source, this.props.song.source_id);
                } else {
                    this.pauseSong(this.props.song.source);
                }
            })
        }).catch(error => {
            console.log("TODO: spotify error...");
        });
    }

    componentWillReceiveProps(props) {
        if (!this.state.loading) {
            const position = props.position + (Date.now() - props.timestamp);
            if (props.song.source_id !== this.props.song.source_id && props.song.source_id != "") {
                this.setSong(position, props.song.source, props.song.source_id).then(() => {
                    if (props.playing) {
                        this.playSong(position, props.song.source, props.song.source_id);
                    } else {
                        this.pauseSong(props.song.source);  
                    }
                })
            } 
            else if (props.playing !== this.props.playing) {
                if (props.playing) {
                    this.playSong(position, props.song.source, props.song.source_id);
                } else {
                    this.pauseSong(props.song.source);
                }
            }
        }
    }

   setSong(position, source, source_id) {
        try {
            this.state.appleMusicPlayer.pause();
        } catch (err) {

        }
        try {
            this.state.soundCloudPlayer.pause();
        } catch (err) {

        }
        try {
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.state.spotifyDevice}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${this.props.spotifyAccess}`,
                },
            }).then(res => {

            });
        } catch (err) {


        }

        return new Promise(resolve => {
            switch (source) {
            case 'soundcloud':
                this.position = position;
                SC.stream(`/tracks/${source_id}`).then((player) => {
                    this.setState({
                        soundCloudPlayer: player,
                        position: position,
                    }, () => {
                        resolve();
                    });
                });
                break;
            case 'appleMusic':
                const appleMusic = MusicKit.getInstance();
                appleMusic.setQueue({ song: source_id }).then(() => {
                    this.setState({
                        appleMusicPlayer: appleMusic,
                        position: position,
                    }, () => {
                        resolve();
                    });
                });
                break;
            case 'spotify':
                this.setState({
                    position: position,
                }, () => {
                    resolve();
                });
                break;
            default:
                break;
            }
        })

    }

    playSong(position, source, source_id) {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.changeTime(), 100);
        // const elapsedTime = Date.now() - this.state.receivedTime;
        // const playPosition = position + elapsedTime + 1000;
        switch (source) {
        case 'soundcloud': {
            console.log(this.state);
            this.state.soundCloudPlayer.play();
            this.state.soundCloudPlayer.setVolume(0);
            this.state.soundCloudPlayer.on('seeked', () => this.state.soundCloudPlayer.setVolume(1));
            setTimeout(() => this.state.soundCloudPlayer.seek(position + 1000, 1000));
            break;
        }
        case 'spotify':
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.state.spotifyDevice}`, {
                method: 'PUT',
                body: JSON.stringify({
                    uris: [`spotify:track:${source_id}`],
                    position_ms: position,
                }),
                headers: {
                    Authorization: `Bearer ${this.props.spotifyAccess}`,
                },
            }).then(res => {

            }).catch(err => {
                // refresh token and try again    
            });
            break;
        case 'appleMusic':
            this.state.appleMusicPlayer.play().then(() => {
                this.state.appleMusicPlayer.player.seekToTime(50);
            });
            // this.state.appleMusicPlayer.player.currentPlaybackProgress = playPosition + 1000;
            break;
        default:
            break;
        }
    }

    pauseAll(source) {
        clearInterval(this.timer);
        try {
            this.state.soundCloudPlayer.pause();
        } catch (err) {

        }
        try {
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.state.spotifyDevice}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${this.props.spotifyAccess}`,
                },
            }).then(res => {

            });
        } catch (err) {

        }
        try {
            this.state.appleMusicPlayer.pause();
        } catch (err) {

        }
    }

    pauseSong(source) {
        switch (source) {
        case 'soundcloud':
            this.state.soundCloudPlayer.pause();
            clearInterval(this.timer);
            break;
        case 'spotify':
            fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${this.state.spotifyDevice}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${this.props.spotifyAccess}`,
                },
            }).then(res => {
                clearInterval(this.timer);
            });
            break;
        case 'appleMusic':
            this.state.appleMusicPlayer.pause();
            clearInterval(this.timer);
            break;
        default:
            break;
        }
    }

    // ADMIN ONLY
    // Only admin websockets can receive
    sendPause() {
        sendPlayer({
            song: this.props.song,
            playing: false,
            position: this.state.position,
            timestamp: Date.now(),
        });
    }


    // ADMIN ONLY
    // Only admin websockets can receive
    sendPlay() {
        //player.currentPlaybackTime
        if (this.props.song.source_id === '') {
            this.props.nextSong();
        } else {
            sendPlayer({
                song: this.props.song,
                playing: true,
                position: this.state.position,
                timestamp: Date.now(),
            });
        }
    }

    changeTime() {
        this.setState({
            position: this.state.position + 100,
        }, () => {
            if (this.state.position >= this.props.song.duration && this.props.song.title !== '') {
                console.log("song ended, next song");
                this.props.nextSong();
            }
        });
    }

    mute() {
        this.setState({
            muted: true,
        }, () => {
            this.state.soundCloudPlayer.setVolume(0);
        });
    }

    unmute() {
        this.setState({
            muted: false,
        }, () => {
            this.state.soundCloudPlayer.setVolume(1);
        });
    }

    render() {
        const { title, artist, album_url, source } = this.props.song;
        const playing = this.props.playing;
        const muted = this.state.muted;
        const styles = {
            playButton: {
                display: playing ? 'none' : 'inline-block',
            },
            stopButton: {
                display: playing ? 'inline-block' : 'none',
            },
            syncButton: {
                display: playing ? 'inline-block' : 'inline-block',
                position: 'absolute',
                right: '8px',
                top: '12px',
                margin: '0',
                padding: '2px 8px',
                /* border: 2px solid yellow; */
                borderRadius: '20px',
                backgroundColor: '#eee',
                fontSize: '14px',
                color: 'black',
            },
            muteButton: {
                display: muted ? 'none' : 'inline-block',
            },
            unmuteButton: {
                display: muted ? 'inline-block' : 'none',
            },
            infoContainer: {
                float: 'left',
                width: 'calc(100vw - 112px)',
                display: 'flex',
                position: 'relative',
            },
            songInfo: {
                marginLeft: '12px',
                marginTop: '26px',
                textAlign: 'left',
                flex: '1',
                minWidth: '130px',
                zIndex: '-1',

            },
            songName: {
                fontSize: '24px',
                whiteSpace: 'nowrap',
                width: 'auto',
                position: 'relative',
                color: '#fff',
            },
            songArtist: {
                fontSize: '18px',
                color: '#ccc',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            },
            progressBarContainer: {
                position: 'absolute',
                width: '100%',
                height: '2px',
                marginBottom: '4px',
                backgroundColor: '#222',
            },
            progressBar: {
                float: 'left',
                width: `${100 * (this.state.position / this.props.song.duration)}%`,
                height: '6px',
                backgroundColor: '#ccc',
            },
        };
        const buttons = this.props.admin ? (
            <div>
                <i style={styles.playButton} className="fa fa-play fa-2x" aria-hidden="true" onClick={() => this.sendPlay()} />
                <i style={styles.stopButton} className="fa fa-stop fa-2x" aria-hidden="true" onClick={() => this.sendPause()} />
                <i className="fa fa-forward fa-2x" aria-hidden="true" onClick={() => this.props.nextSong()} />
                <i style={styles.syncButton} onClick={() => this.sendPlay()}>sync</i>
            </div>
        ) : (
            <div>
                <i style={styles.muteButton} className="fa fa-volume-up fa-2x" aria-hidden="true" onClick={() => this.mute()} />
                <i style={styles.unmuteButton} className="fa fa-volume-off fa-2x" aria-hidden="true" onClick={() => this.unmute()} />
            </div>
        );
        let albumCover = <img alt="albumCover" src={album_url} style={{ visibility: album_url === '' ? 'collapse' : 'visible' }} />;
        if (album_url === '') {
            switch (source) {
            case 'soundcloud': {
                albumCover = (
                    <AlbumOuter>
                        <SoundcloudLogo height="200px" width="200px" />
                    </AlbumOuter>);
                break;
            }
            case 'spotify':
                break;
            case 'appleMusic':
                break;
            default:
                break;
            }
        }


        return (
            <StyledPlayer>
                {albumCover}
                <PlayerInfo>
                    <div style={styles.progressBarContainer}>
                        <div style={styles.progressBar} />
                    </div>
                    <div style={styles.infoContainer}>
                        <div style={styles.songInfo}>
                            <p style={styles.songName} >{title}</p>
                            <p style={styles.songArtist}>{artist}</p>
                        </div>
                        <PlaybackButtons>
                            {buttons}
                            <Help><i id="help-button" className="fa fa-question-circle fa-2x" aria-hidden="true" /></Help>
                        </PlaybackButtons>
                    </div>
                </PlayerInfo>
            </StyledPlayer>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    let item = null;
    if (state.login.user) {
        item = state.login.user.accounts.find(account => account.source === 'spotify');
    }
    return {
        song: state.station.station.playing.song,
        playing: state.station.station.playing.playing,
        position: state.station.station.playing.position,
        timestamp: state.station.station.playing.timestamp,
        admin: state.station.admin,
        ws: state.station.ws,
        spotifyAccess: item ? item.access_token : null,
        user: state.login.user ? state.login.user : null,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        nextSong,
        refreshSpotify,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Player);

