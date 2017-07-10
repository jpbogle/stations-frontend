import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SpotifyLogo from './SpotifyLogo';
import * as Colors from './Colors';

const StyledSpotifyButton = styled.button`
    background-color: ${Colors.spotifyC};
    border: ${Colors.spotifyC} solid 2px;
    margin-top: 8px;
    font-size: 18px;
    margin: 8px auto 0px auto;
    padding: 6px 0px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    transition: .2s;
    width: 210px;
    font-weight: 100;
    height: 37px;
    &:hover {
        transform: scale(1.02, 1.02);
        background-color: ${Colors.spotifyDarkC};
        border-color: ${Colors.spotifyDarkC};
    }
    span {
        margin-right: 4px;
        display: inline-block;
        color: #FFF;
        position: relative;
        top: -4px;
`;

export default class SpotifyButton extends Component {
    static propTypes = {
        text: PropTypes.string,
    };

    static defaultProps = {
        text: '',
    }


    render() {
        return (
            <StyledSpotifyButton>
                <span>{this.props.text}</span><SpotifyLogo />
            </StyledSpotifyButton>
        );
    }
}
