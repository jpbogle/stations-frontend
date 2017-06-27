import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavLink = styled.li`

`;

export default class Header extends Component {

    static propTypes = {
        index: PropTypes.bool.isRequired,
    };

    render() {
        let navBarLinks;
        let logo;

        if (this.props.index) {
            navBarLinks = (
                <ul>
                    <a id="sign-in-button"><li className="navbar-item">SIGN IN</li></a>
                    <a id="sign-up-button"><li className="navbar-item">SIGN UP</li></a>
                </ul>
            );
            logo = 'test';
        }


        return (
            <div id="navbar">
                <div>
                    <div id="navbar-left">
                        <a id="small-header" href="/">{ logo }</a>
                        <ul id="navbar-links">
                        </ul>
                    </div>
                    <div id="navbar-right">
                        { navBarLinks }
                    </div>
                </div>
            </div>
        );
    }
}
