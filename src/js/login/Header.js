import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { showSignIn, showSignUp, showHome } from './loginActions';
import Logo from '../common/Logo';
import * as Colors from '../common/Colors';


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
    vertical-align: bottom;
    svg {
        width: 40px;
        margin-top: 6px;
        margin-left: 12px;
    }
`;

const NavBar = styled.div`
    position: fixed;
    z-index: 10;
    height: 67px;
    top: 0;
    a {
        letter-spacing: 3px;
    }
`;

const NavBarLinks = styled.ul`
    display: inline-block;
    list-style: none;
    vertical-align: bottom;
    text-align: center;
    margin: 0;
    padding: 0;
`;


export class Header extends Component {

    static propTypes = {
        index: PropTypes.bool,
        showLogo: PropTypes.bool,
        showSignUp: PropTypes.func.isRequired,
        showSignIn: PropTypes.func.isRequired,
        showHome: PropTypes.func.isRequired,
    };

    static defaultProps = {
        index: false,
        showLogo: false,
    }

    constructor(props) {
        super(props);
        this.handleClick = :: this.handleClick;
    }

    handleClick() {
        if (this.props.signIn || this.props.signUp) {
            this.props.showHome();
        };
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
                    <a id="sign-in-button" onClick={() => this.props.showSignIn()}><NavItem>SIGN IN</NavItem></a>
                    <a id="sign-up-button" onClick={() => this.props.showSignUp()}><NavItem>SIGN UP</NavItem></a>
                </ul>
            );
        }


        return (
            <NavBar className="container" onClick={() => this.handleClick()}>
                <div className="content">
                    <div style={styles.navBarLeft}>
                        <SmallHeader href="/" shown={this.props.showLogo}>
                            <Logo />
                        </SmallHeader>
                        <NavBarLinks>
                            <a><NavItem></NavItem></a>
                        </NavBarLinks>
                    </div>
                    <div style={styles.navBarRight}>
                        { navBarLinks }
                    </div>
                </div>
            </NavBar>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        signIn: state.login.signIn.shown,
        signUp: state.login.signUp.shown,
        showLogo: state.login.signIn.shown || state.login.signUp.shown,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSignIn,
        showSignUp,
        showHome,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Header);

