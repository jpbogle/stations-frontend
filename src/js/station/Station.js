import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Header from '../common/Header';
import Player from './Player';
import * as Colors from '../common/Colors';

const SearchBox = styled.div`
    position: fixed;
    z-index: 11;

    div {
        padding: 0px;
    }

    input {
        border: 0;
        width: calc(100% - 24px);
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 1px;
        padding: 12px;
        border-bottom: solid 1px;
        border-bottom-color: rgba(229,229,229,1);
        background: rgba(255, 255, 255, 0.9);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        transition: .2s all;
    }
    input:focus {
        outline: none;
        border-bottom-color: ${Colors.highlightC};
    }
`;

const HostHeader = styled.div`
    text-align: center;
    position: fixed;
    top: 20vh;
    z-index: 4;
    opacity: ${props => props.shown ? '1' : '0'};
    transition: .2s;
    left: 50%;
    transform: translatex(-50%);

    div {
        margin-left: auto;
        margin-right: auto;
        background-color: #f5f5f5;
        border-radius: 5px;
        padding: 20px 60px;
        -webkit-box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);
        -moz-box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);
        box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);

        p {
            color: #AAA;
            font-size: 16px;
        }
        h1 {
            font-size: 36px;

        }
    }
`;


class Station extends Component {

    static propTypes = {
        stationName: PropTypes.string.isRequired,
        stationHost: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <Header />
                <SearchBox className="container">
                    <div className="content">
                        <input id="search-box" type="text" placeholder="suggest a song" />
                    </div>
                </SearchBox>

                <HostHeader shown={true}>
                    <div>
                        <p>what&apos;s up next?</p>
                        <h1>http://localhost:4000{this.props.stationHost}</h1>
                    </div>
                </HostHeader>

                <div id="search-container" class="container">
                    <div class="content shadow">
                        <ul id="spotify-search-results" class="shown" >
                        </ul>
                        <ul id="soundcloud-search-results" >
                        </ul>
                    </div>
                </div>

                <div class="container">
                    <div id="queue-content" class="content">
                        <ul id="queue">
                        </ul>
                    </div>
                </div>
                <Player />
                <div id="notify-popup-window">
                </div>
            </div>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        stationHost: state.routing.locationBeforeTransitions.pathname,
        stationName: state.routing.locationBeforeTransitions.pathname.split('/').pop(),
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
export default connect(mapStateToProps, mapDispatchToProps)(Station);

