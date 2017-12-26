import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Colors from './Colors';

const StyledNotification = styled.div`
    width: 346px;
    height: 80px;
    background: #eee;
    padding: 12px;
    border-radius: 3px;
    position: relative;
    left: ${props => props.shown ? '0' : '36px'};
    opacity: ${props => props.shown ? '1' : '0'};
    transition: .2s;
    margin-top: 12px;
    z-index: 12;

    -webkit-box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);
    -moz-box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);
    box-shadow: 12px 12px 64px -12px rgba(0,0,0,0.75);

    p {
        font-weight: 800;
    }
`;


export default class Notification extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        removeNotification: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);
        this.state = {
            shown: false,
        };
        this.mountStyle = :: this.mountStyle;
        this.handleClose = :: this.handleClose;
        this.transitionEnd = :: this.transitionEnd;
    }


    componentDidMount() {
        this.timer = setTimeout(() => this.handleClose(), 2000);
        setTimeout(this.mountStyle, 100);
    }

    mountStyle() { // css for mount animation
        this.setState({
            shown: true,
        });
    }


    handleClose() {
        clearTimeout(this.timer);
        this.setState({
            shown: false,
        });
    }

    transitionEnd() {
        if (!this.state.shown) {
            this.props.removeNotification(this.props.id);
        }
    }

    render() {
        // console.log("add", this.props.id, this.props.message)

        return (
            <StyledNotification
              shown={this.state.shown}
              onClick={this.handleClose}
              onTransitionEnd={this.transitionEnd}
            >
                <p>{this.props.header}</p>
                <span>{this.props.message}</span>
            </StyledNotification>
        );
    }
}

