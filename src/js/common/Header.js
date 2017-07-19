import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';
import * as Colors from './Colors';


const NavItem = styled.li`
    display: inline-block;
    color: white;
    padding: 18px;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;
    &:hover {
        color: ${Colors.highlightC};
    }
`;

const SmallHeader = styled.a`
    color: white;
    position: relative;
    top: ${props => props.shown ? '-5px' : '-15px'};
    opacity: ${props => props.shown ? '1' : '0'};
    visibility: ${props => props.shown ? 'visible' : 'collapse'};
    transition: .4s;
    svg {
        width: 40px;
        margin-top: 6px;
        margin-left: 12px;
    }
`;

const NavBar = styled.div`
    position: fixed;
    z-index: 1;
    height: 67px;
    top: 0;
    background-color: ${Colors.highlightC};
    a {
        letter-spacing: 3px;
    }
`;


export default class Header extends Component {

    static propTypes = {
        index: PropTypes.bool,
    };

    static defaultProps = {
        index: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            shown: false,
        };
        this.toggleShown = :: this.toggleShown;
    }

    toggleShown() {
        this.setState({
            shown: !this.state.shown,
        });
    }

    render() {
        const styles = {
            navBar: {
                position: 'fixed',
                zIndex: '10',
                height: '67px',
            },
            navBarLeft: {
                float: 'left',
            },
            navBarRight: {
                float: 'right',
            },
        };
        let navBarLinks;
        if (this.props.index) {
            navBarLinks = (
                <ul>
                    <a id="sign-in-button" onClick={() => this.toggleShown()}><NavItem>SIGN IN</NavItem></a>
                    <a id="sign-up-button" onClick={() => this.toggleShown()}><NavItem>SIGN UP</NavItem></a>
                </ul>
            );
        }


        return (
            <NavBar className="container">
                <div className="content">
                    <div style={styles.navBarLeft}>
                        <SmallHeader id="small-header" href="/" shown={this.state.shown}>
                            <Logo />
                        </SmallHeader>
                        <ul id="navbar-links">
                        </ul>
                    </div>
                    <div style={styles.navBarRight}>
                        { navBarLinks }
                    </div>
                </div>
            </NavBar>
        );
    }
}
