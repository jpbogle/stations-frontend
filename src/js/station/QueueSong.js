import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import ScrollAnim from 'rc-scroll-anim';
import * as Colors from '../common/Colors';
import SoundcloudLogo from '../common/SoundcloudLogo';
import { sendVote } from './stationActions';

const ScrollParallax = ScrollAnim.Parallax;

const AlbumOuter = styled.div`
    height: 80px;
    width: 80px;

    svg {
        width: 80px;
        height: 80px;
    }
`;

const StyledQueueSong = styled.li`
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    max-height: 85px;
    border-bottom: #eee solid 1px;
    padding: 2px;
    clear: both;
    height: 80px;
    opacity: 0.8;
    transition: .2s;
    cursor: pointer;

    &:hover {
        opacity: 1 !important;
        background-color: #eee;
    }

    > * {
        float: left;
    }
    img {
        width: 80px;
        height: 80px;
    }
    > i {
        width: 80px;
        height: 80px;
        background-color: #eee;
    }
    > i::before {
        position: relative;
        left: 12px;
        top: 8px;
        color: #fff;
    }

    > a {
        float: right;
        font-weight: lighter;
        font-size: 56px;
        padding-top: 8px;
        padding-right: 12px;
        transition: .2s;
    }
    > a:hover {
        transform: scale(1.1);
    }

`;

const VoteControl = styled.div`
    float: right;
    margin: -2px;
    height: 100%;
    opacity: 1;
    visibility: visible;
    transition: .2s;

    > * {
        height: 84px;
        width: 42px;
        color: #fff;
        display: inline-block;
        padding: 0;
        transform-origin: 0 100%;
        transition: .2s;

        i {
            position: relative;
            top: 0;
            margin-left: 5px;
            margin-top: 14px;
            transition: .2s;
        }
    }
    span {
        color: #000;
        font-size: 32px;
        text-align: right;
        padding-right: 2px;
        position: relative;
        top: -4px;
    }
`;

const Vote = styled.div`
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    opacity: ${props => props.disabled ? (props.up ? '0.1' : '0.4') : '1'};
    background: ${props => props.up ? Colors.primaryC : '#eee'};
    &:hover {
        background: ${props => props.up ? Colors.highlightC : '#ddd'};

        i {
            top: ${props => props.up ? '-8px' : '8px'};
        }
    }
    i {
        color: ${props => props.disabled ? '#ddd' : '#fff'}
    }
`;

class QueueSong extends Component {

    static propTypes = {
        song: PropTypes.shape({
            title: PropTypes.string,
            artist: PropTypes.string,
            album_cover: PropTypes.string,
            votes: PropTypes.number,
            source: PropTypes.string,
            source_id: PropTypes.string,
            id: PropTypes.number,
        }).isRequired,
        stationHost: PropTypes.string.isRequired,
        sendVote: PropTypes.func.isRequired,
        // addSong: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false,
        };
        this.handleUpvote = :: this.handleUpvote;
        this.handleDownVote = :: this.handleDownVote;
    }

    handleUpvote() {
        this.setState({
            ...this.state,
            upVoted: true,
        });
        this.props.sendVote({
            source: this.props.song.source,
            source_id: this.props.song.source_id,
            action: 'upvote',
        });
    }

    handleDownVote() {
        this.setState({
            ...this.state,
            downVoted: true,
        });

        this.props.sendVote({
            source: this.props.song.source,
            source_id: this.props.song.source_id,
            action: 'downvote',
        });
    }


    render() {
        const { title, artist, album_url, votes } = this.props.song;
        const styles = {
            songInfo: {
                paddingLeft: '6px',
                textAlign: 'left',
                width: 'calc(100% - 240px)',
            },
            songName: {
                fontSize: '24px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
            artistName: {
                color: '#888',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            },
        };

        const albumCover = album_url ?
            <img alt="album" src={album_url} /> :
            (<AlbumOuter>
                <SoundcloudLogo height="200px" width="200px" />
            </AlbumOuter>);

        return (
            <StyledQueueSong>
                {albumCover}
                <div style={styles.songInfo}>
                    <p style={styles.songName}>{title}</p>
                    <p style={styles.artistName}>{artist}</p>
                </div>
                <VoteControl>
                    <span>{votes}</span>
                    <Vote
                      up
                      disabled={this.state.upVoted}
                      onClick={this.handleUpvote}
                    >
                        <i className="fa fa-angle-up fa-3x" aria-hidden="true" />
                    </Vote>
                    <Vote
                      up={false}
                      disabled={this.state.downVoted}
                      onClick={this.handleDownVote}
                    >
                        <i className="fa fa-angle-down fa-3x" aria-hidden="true" />
                    </Vote>
                </VoteControl>
            </StyledQueueSong>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        stationHost: state.routing.locationBeforeTransitions.pathname,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        sendVote,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(QueueSong);

