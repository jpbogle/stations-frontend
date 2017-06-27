import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class Header extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    };

    render() {
        const styles = {
            header: {
                backgroundColor: '#eee',
                height: '30px',
                textAlign: 'center',
                padding: '20px',
                fontSize: '20px',
                color: '#444',
                position: 'relative',
            },
            backIcon: {
                position: 'relative',
                top: '5px',
                marginRight: '10px',
            },
        };

        const Back = styled.a `
            position: absolute;
            left: 30px;
            top: 10px;
            textDecoration: none;
            color: #444;
            transition: .1s all;
            &:hover {
                color: #999;
            }
        `;
        const home = (
                <Back href={ './index.html#/' }>
                    <i className="fa fa-caret-left fa-2x" style={ styles.backIcon } aria-hidden="true" />
                    Home
                </Back>);
        return (
            <div className="header" style={ styles.header }>
                { home }
                { this.props.text }
            </div>
        );
    }
}
