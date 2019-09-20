import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from './Logo';
import * as Colors from './Colors';


export const LogoContainer = styled.a`
    color: white;
    position: relative;
    top: 0;
    transition: .4s;
    float: left;
    svg {
        width: 40px;
        margin-top: 6px;
        margin-left: 12px;
    }
`;

const NavBarLeft = styled.div`
    float: left,
    verticalAlign: bottom,
    div {
        float: left;
    }
`;

const NavBarRight = styled.div`
    float: right;
    verticalAlign: bottom;
`;

export const NavItem = styled.a`
    color: white;
    float: left;
    display: inline-block;
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

    static defaultProps = {
        childrenLeft: '',
        childrenRight: '',
    }

    constructor(props) {
        super(props);
        // this.handleReset = :: this.handleReset;
    }

    handleEdit() {

    }

    // handleMix() {
    //     this.props.handleMix();
    // }

    // handleReset() {
    //     this.props.resetStation(this.props.stationHost, this.props.station);
    // }

    render() {
        const styles = {
            navBar: {
                zIndex: '10',
                height: '67px',
                top: '0',
                backgroundColor: Colors.primaryC,
            },
        };

        const { admin } = this.props;
        const { childrenLeft, childrenRight } = this.props;

        return (
            <div className="container" style={styles.navBar}>
                <div className="content">
                    <NavBarLeft>
                        { childrenLeft }
                    </NavBarLeft>
                    <NavBarRight>
                        { childrenRight }
                        {/* <ul>
                            <NavItem shown={admin} onClick={this.handleEdit}>Edit</NavItem>
                            <NavItem shown={admin} onClick={this.handleMix}>Mix</NavItem>
                        </ul> */}
                    </NavBarRight>
                </div>
            </div>
        );
    }
}
