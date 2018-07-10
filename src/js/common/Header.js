import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';
import * as Colors from './Colors';


const LogoContainer = styled.a`
    color: white;
    position: relative;
    top: ${props => props.shown ? '0px' : '-15px'};
    opacity: ${props => props.shown ? '1' : '0'};
    visibility: ${props => props.shown ? 'visible' : 'collapse'};
    transition: .4s;
    float: left;
    svg {
        width: 40px;
        margin-top: 6px;
        margin-left: 12px;
    }
`;

const NavItem = styled.a`
    color: white;
    float: left;
    display: ${props => props.shown ? 'inline-block' : 'none'};
    color: white;
    padding: 18px;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;
    letter-spacing: 3px;

    &:hover {
        color: ${Colors.highlightC};
    }
`;

export default class Header extends Component {

    static propTypes = {
        station: PropTypes.string,
        dashboard: PropTypes.bool,
        admin: PropTypes.bool,
        logoAnimate: PropTypes.bool,
        stationHost: PropTypes.string,
        resetStation: PropTypes.func,
    };

    static defaultProps = {
        station: '',
        stationHost: '',
        dashboard: false,
        admin: false,
        logoAnimate: false,
    }

    constructor(props) {
        super(props);
        this.handleReset = :: this.handleReset;
    }

    handleEdit() {

    }

    handleMix() {

    }

    handleReset() {
        this.props.resetStation(this.props.stationHost, this.props.station);
    }

    render() {
        const styles = {
            navBar: {
                zIndex: '10',
                height: '67px',
                top: '0',
                backgroundColor: Colors.primaryC,
            },
            navBarLeft: {
                float: 'left',
                verticalAlign: 'bottom',
            },
            navBarRight: {
                float: 'right',
            },
            leftItems: {
                float: 'left',
                marginLeft: '10px',
            },
        };

        const { admin, station, dashboard, logoAnimate } = this.props;
        return (
            <div className="container" style={styles.navBar}>
                <div className="content">
                    <div style={styles.navBarLeft}>
                        <LogoContainer shown href={dashboard ? '/' : '/dashboard'}>
                            <Logo animate={logoAnimate} />
                        </LogoContainer>
                        <ul style={styles.leftItems}>
                            <NavItem shown={station} onClick={this.handleReset}>{station}</NavItem>
                        </ul>
                    </div>
                    <div style={styles.navBarRight}>
                        <ul>
                            <NavItem shown={admin} onClick={this.handleEdit}>Edit</NavItem>
                            <NavItem shown={admin} onClick={this.handleMix}>Mix</NavItem>
                            <NavItem shown={dashboard} onClick={this.handleSignOut}>Sign Out</NavItem>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
