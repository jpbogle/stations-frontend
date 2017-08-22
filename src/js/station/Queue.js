import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import QueueSong from './QueueSong';
import * as Colors from '../common/Colors';

const StyledQueue = styled.div`
    width: 100%;
    position: absolute;
    bottom: 112px;
`;

class Queue extends Component {

    static propTypes = {
        songs: PropTypes.array,
    };

    static defaultProps = {
        songs: [],
    }

    render() {
        let key = 0;
        const songs = this.props.songs.map((song) => {
            key += 1;
            return (
                <QueueSong
                  key={key}
                  song={song}
                />
            );
        });
        return (
            <StyledQueue>
                <ul id="queue">
                    {songs}
                </ul>
            </StyledQueue>
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
export default connect(mapStateToProps, mapDispatchToProps)(Queue);

