import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import styled from 'styled-components';

import Logo from '../common/Logo';
import Header, { LogoContainer, NavItem } from '../common/Header';
import Popup from '../common/Popup';
import StationsList from './StationsList';
import AccountsList from './AccountsList';
import { createStation, addCode, refreshSpotify, removeAccount } from './dashboardActions';
import { logout } from '../login/loginActions';

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
        refreshSpotify: PropTypes.func.isRequired,
        addCode: PropTypes.func.isRequired,
    }


    constructor(props) {
        super(props);
        this.state = {
            create: false,
            display: dashboard_states.stations,
            accounts: [],
        };
        this.handleClose = :: this.handleClose;
        this.showCreate = :: this.showCreate;
        this.createStation = :: this.createStation;
        this.refreshSpotify = :: this.refreshSpotify;
        this.removeAccount = :: this.removeAccount;
    }

    componentDidMount() {
        if (this.props.location.query.code && !this.props.user.accounts.find(account => account.source === 'spotify')) {
            this.props.addCode(this.props.user.username, 'spotify', this.props.location.query.code);
            this.setState({
                ...this.state,
                display: dashboard_states.accounts,
            });
        }
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

    changeDisplay(display) {
        this.setState({
            display,
        });
    }

    createStation(stationName) {
        //check for /*%4kjfoek
        this.props.createStation(this.props.user.username, stationName);
    }

    refreshSpotify() {
        this.props.refreshSpotify(this.props.user.username);
    }

    removeAccount(source) {
        this.props.removeAccount(this.props.user.username, source);
    }

    signOut() {
        this.props.logout();
        browserHistory.push("/");
    }

    render() {
        const { user } = this.props;
        // const stations = user.stations == null ? '' : this.mapStations(user.stations);
        let display;
        switch (this.state.display) {
        case dashboard_states.stations:
            display = <StationsList username={user.username} stations={user.stations} showCreate={this.showCreate} />;
            break;
        case dashboard_states.accounts:
            display = <AccountsList refreshSpotify={this.refreshSpotify} removeAccount={this.removeAccount} accounts={user.accounts} />;
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
                    <NavItem onClick={() => this.changeDisplay(dashboard_states.accounts)}>Accounts</NavItem>
                    <NavItem onClick={() => this.changeDisplay(dashboard_states.stations)}>Stations</NavItem>
                </ul>
            </div>
        );

        const navbarTabsRight = (
            <NavItem onClick={() => this.signOut()}>Sign Out</NavItem>
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
        addCode,
        refreshSpotify,
        logout,
        removeAccount,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

