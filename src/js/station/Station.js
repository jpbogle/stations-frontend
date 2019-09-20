import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getStation, resetStation, shuffleStation } from './stationActions';
import Header, { LogoContainer, NavItem } from '../common/Header';
import Logo from '../common/Logo';
import Loading from '../common/Loading';
import Notifications from './Notifications';
import Search from './Search';
import Player from './Player';
import Queue from './Queue';


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
        loading: PropTypes.bool.isRequired,
        stationName: PropTypes.string.isRequired,
        stationHost: PropTypes.string.isRequired,
        getStation: PropTypes.func.isRequired,
        resetStation: PropTypes.func.isRequired,
        station: PropTypes.object.isRequired,
        username: PropTypes.string,
    }

    componentWillMount() {
        this.props.getStation(this.props.stationHost, this.props.username);
    }

    handleMix() {
        this.props.shuffleStation();
    }

    render() {
        let queue;
        if (this.props.loading) {
            queue = '';
            // queue = <Loading />;
        } else {
            queue = <Queue songs={this.props.station.songs} />;
        }

        const navbarTabsLeft = (
            <div>
                <LogoContainer href={'/dashboard'}>
                    <Logo animate={false} />
                </LogoContainer>
                <ul>
                    <NavItem>{this.props.station.name}</NavItem>
                </ul>
            </div>
        );

        const navbarTabsRight = (
            <div>
                <NavItem onClick={() => console.log('Edit todo')}>Edit</NavItem>
                <NavItem onClick={() => this.handleMix()}>Mix</NavItem>
            </div>
        );

        return (
            <div>
                <Header
                  childrenLeft={navbarTabsLeft}
                  childrenRight={navbarTabsRight}
                />
                <Search />
                <HostHeader shown={true}>
                    <div>
                        <p>share link</p>
                        <h1>http://stations.live{this.props.stationHost}</h1>
                    </div>
                </HostHeader>
                {queue}
                <Player />
                <Notifications />
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
        loading: state.station.loading,
        station: state.station.station,
        username: state.login.user ? state.login.user.username : "",
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getStation,
        resetStation,
        shuffleStation,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Station);

