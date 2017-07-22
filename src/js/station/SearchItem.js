import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addSong } from './stationActions';
import styled from 'styled-components';
import * as Colors from '../common/Colors';

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

class SearchItem extends Component {

    static propTypes = {
        source: PropTypes.string.isRequired,
        song: PropTypes.shape({
            song_id: PropTypes.string,
            title: PropTypes.string,
            artist: PropTypes.string,
            album_url: PropTypes.string,
            duration: PropTypes.int,
        }).isRequired,
        addSong: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            upVoted: false,
            downVoted: false,
        };
        this.handleClick = :: this.handleClick;
    }

    handleClick() {
        this.props.addSong({
            ...this.props.song,
            source: this.props.source,
        });
    }

    render() {
        const { title, artist, album_url } = this.props.song;
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
        return (
            <StyledQueueSong onClick={this.handleClick}>
                <img alt="album" src={album_url} />
                <div style={styles.songInfo}>
                    <p style={styles.songName}>{title}</p>
                    <p style={styles.artistName}>{artist}</p>
                </div>
            </StyledQueueSong>
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
        addSong,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(SearchItem);

