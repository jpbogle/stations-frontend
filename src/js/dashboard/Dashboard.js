import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Logo from '../common/Logo';
import Header, { LogoContainer, NavItem } from '../common/Header';
import Popup from '../common/Popup';
import StationsList from './StationsList';
import { createStation } from './dashboardActions';

const Headshot = styled.img`
    border-radius: 72px;
    object-fit: cover;
    display: inline-block;
    width: 144px;
    height: 144px;
    margin-bottom: 12px;
`;

const HeadshotFiller = styled.i`
    text-align: center;
    background-color: #eee;
    color: #fff;
    width: 144px;
    height: 144px;
    margin-bottom: 12px;
    border-radius: 72px;

    &:before {
      position: relative;
      top: 32px;
    }
`;

const dashboard_states = {
    accounts: 'accounts',
    stations: 'stations',
};

class Dashboard extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        createStation: PropTypes.func.isRequired,
    }


    constructor(props) {
        super(props);
        this.state = {
            create: false,
            display: dashboard_states.stations,
        };
        this.handleClose = :: this.handleClose;
        this.showCreate = :: this.showCreate;
        this.createStation = :: this.createStation;
    }

    handleClose() {
        this.setState({
            create: false,
        });
    }

    showCreate() {
        this.setState({
            create: true,
        });
    }

    createStation(stationName) {
        //check for /*%4kjfoek
        this.props.createStation(this.props.user.username, stationName);
    }

    // goToStation(stationRoute) {
    //     browserHistory.push(stationRoute);
    // }

    // mapStations(stations) {
    //     let key = 0;
    //     return stations.map((station) => {
    //         key += 1;
    //         console.log(station.songs[0])
    //         return (
    //             <div
    //               role="presentation"
    //               onClick={() => this.goToStation(`/${this.props.user.username}/${station.name}`)}
    //               key={key}
    //             >
    //                 <StationSmall
    //                   name={station.name}
    //                   username={this.props.user.username}
    //                   albumCover={station.songs.length > 0 ? station.songs[0].album_url : ''}
    //                   numSongs={station.songs ? station.songs.length : 0}
    //                   numAdmins={stations.admins ? station.admins.length : 0}
    //                 />
    //             </div>
    //         );
    //     });
    // }

    render() {
        const { user } = this.props;

        // const stations = user.stations == null ? '' : this.mapStations(user.stations);
        let display;
        switch (this.state.display) {
        case dashboard_states.stations:
            display = <StationsList username={user.username} stations={user.stations} showCreate={this.showCreate} />;
            break;
        case dashboard_states.accounts:
            // display = <AccountsList accounts={user.accounts} />;
            break;
        default:
            break;
        }

        const headshot = user.image_url.length === 0 ?
            <HeadshotFiller className="fa fa-user fa-5x" /> :
            <Headshot alt="profile" src={user.image_url} />;

        const navbarTabsLeft = (
            <div>
                <LogoContainer href={'/'}>
                    <Logo animate={false} />
                </LogoContainer>
                <ul>
                    <NavItem> Accounts </NavItem>
                </ul>
            </div>
        );

        const navbarTabsRight = (
            <NavItem onClick={() => console.log('sign out FIXME')}>Sign Out</NavItem>
        );

        return (
            <div>
                <Header
                  childrenLeft={navbarTabsLeft}
                  childrenRight={navbarTabsRight}
                />
                <div style={{ height: 'calc(100vh - 79px)', borderBottom: 'solid #9575CD 12px' }}>
                    <div className="container" style={{ height: '180px' }}>
                        <div className="content" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                            <div style={{ float: 'left' }}>
                                {headshot}
                            </div>
                            <div style={{ marginLeft: '12px', float: 'left' }}>
                                <h1>{`${user.first_name} ${user.last_name}`}</h1>
                                <p style={{ color: '#888', fontSize: '24px' }}>{`@${user.username}`}</p>
                            </div>
                        </div>
                    </div>
                    { display }
                </div>
                <Popup shown={this.state.create} close={this.handleClose} submit={this.createStation} />
            </div>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createStation,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

