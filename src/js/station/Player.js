import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

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

    }

    render() {
        const title = 'testsong';
        const artist = 'testartist';
        const albumCover = '';
        const playing = false;
        const styles = {
            playButton: {
                display: playing ? 'inline-block' : 'none',
            },
            stopButton: {
                display: playing ? 'none' : 'inline-block',
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

        };
        const buttons = (
            <div>
                <i style={styles.playButton} className="fa fa-play fa-2x" aria-hidden="true" />
                <i style={styles.stopButton} className="fa fa-stop fa-2x" aria-hidden="true" />
                <i style={styles.stopButton} className="fa fa-forward fa-2x" aria-hidden="true" />
            </div>
        );

        return (
            <StyledPlayer>
                <img alt="albumCover" src={albumCover} style={{ visibility: albumCover === '' ? 'collapse' : 'visible' }} />
                <PlayerInfo>
                    <div id="progress-bar-container">
                        <div id="progress-bar" />
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

    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Player);

