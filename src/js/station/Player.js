import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import SC from 'soundcloud';
import { nextSong, sendPlayer } from './stationActions';


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
            title: PropTypes.string,
            artist: PropTypes.string,
            source: PropTypes.string,
            song_id: PropTypes.string,
            album_url: PropTypes.string,
            votes: PropTypes.number,
            duration: PropTypes.int,
        }),
        playing: PropTypes.bool,
        position: PropTypes.number,
        timestamp: PropTypes.number,
        nextSong: PropTypes.func.isRequired,
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
        const dev = true;
        SC.initialize({
            client_id: dev ? 'oG45iJyWRj8McdpinDKk4QSgRm8C1VzL' : 'GwGiygexslzpWR05lHIGqMBPPN0blbni',
        });
        this.state = {
            soundCloudPlayer: null,
        };
        this.changeTime = :: this.changeTime;
        this.playSong = :: this.playSong;
        this.sendPause = :: this.sendPause;
        this.sendPlay = :: this.sendPlay;
    }

    componentWillReceiveProps(props) {
        if (props.playing && props.song.song_id !== this.props.song.song_id) {
            this.setSong(props.song.source, props.song.song_id, props.position, props.timestamp);
        } else if (props.playing) {
            this.playSong();
        } else {
            this.pauseSong();
        }
    }

    setSong(source, song_id, position, timestamp) {
        switch (source) {
        case 'soundcloud':
            SC.stream(`/tracks/${song_id}`).then((player) => {
                this.setState({
                    soundCloudPlayer: player,
                    position: position + (Date.now() - timestamp),
                }, () => {

                    this.playSong();
                });
            });
            break;
        default:
            break;
        }
    }

    playSong() {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.changeTime(), 100);
        this.state.soundCloudPlayer.on('time', () => {
            this.state.soundCloudPlayer.off('time');
            this.state.soundCloudPlayer.seek(this.state.position);
        });
        switch (this.props.song.source) {
        case 'soundcloud':
            this.state.soundCloudPlayer.play();
            break;
        case 'spotify':
            break;
        case 'appleMusic':
            break;
        default:
            break;
        }
    }

    pauseSong() {
        clearInterval(this.timer);
        switch (this.props.song.source) {
        case 'soundcloud':
            this.state.soundCloudPlayer.pause();
            break;
        case 'spotify':
            break;
        case 'appleMusic':
            break;
        default:
            break;
        }
    }

    sendPause() {
        sendPlayer({
            song: this.props.song,
            playing: false,
            position: this.state.position,
            timestamp: Date.now(),
        });
    }

    sendPlay() {
        sendPlayer({
            song: this.props.song,
            playing: true,
            position: this.state.position,
            timestamp: Date.now(),
        });
    }

    changeTime() {
        this.setState({
            position: this.state.position + 100,
        });
    }

    render() {
        const { title, artist, album_url } = this.props.song;
        const playing = this.props.playing;
        const styles = {
            playButton: {
                display: playing ? 'none' : 'inline-block',
            },
            stopButton: {
                display: playing ? 'inline-block' : 'none',
            },
            infoContainer: {
                float: 'left',
                width: 'calc(100vw - 112px)',
                display: 'flex',
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
        const buttons = (
            <div>
                <i style={styles.playButton} className="fa fa-play fa-2x" aria-hidden="true" onClick={() => this.sendPlay()} />
                <i style={styles.stopButton} className="fa fa-stop fa-2x" aria-hidden="true" onClick={() => this.sendPause()} />
                <i className="fa fa-forward fa-2x" aria-hidden="true" onClick={() => this.props.nextSong()} />
            </div>
        );
        return (
            <StyledPlayer>
                <img alt="albumCover" src={album_url} style={{ visibility: album_url === '' ? 'collapse' : 'visible' }} />
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
    return {
        song: state.station.player.song,
        playing: state.station.player.playing,
        position: state.station.player.position,
        timestamp: state.station.player.timestamp,
        ws: state.station.ws,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        nextSong,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Player);

