import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Colors from '../common/Colors';

const StyledStation = styled.div`
    height: 80px;
    border-top: 1px solid #ddd;
    cursor: pointer;
    transition: .2s;
    padding: 2px 12px;
    img, i {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        float: left;
    }
    i {
        padding: 2px;
        background-color: #ddd;
        width: 78px;
        height: 78px;
        border-radius: 40px;
    }
    i::before {
        color: #eee;
        position: relative;
        left: 15px;
        top: 8px;
    }
    div {
        float: left;
        padding-left: 6px;

        span {
            font-size: 24px;
            white-space: nowrap;
            max-width: 850px;
            overflow: hidden;
        }
        p {
            color: #888;
        }
    }
    &:hover {
        background: #ddd;
`;


export default class StationSmall extends Component {

    static propTypes = {
        name: PropTypes.string,
        albumCover: PropTypes.string,
        numSongs: PropTypes.number,
        numAdmins: PropTypes.number,
    };

    static defaultProps = {
        name: '',
        albumCover: '',
        numSongs: 0,
        numAdmins: 0,
    };

    render() {
        const { name, albumCover, numSongs, numAdmins } = this.props;

        return (
            <StyledStation class="station" data-station={name}>
                <img alt="station" src={albumCover} />
                <div>
                    <span>{name}</span>
                    <p>{numSongs} songs</p>
                    <p>{`${numAdmins} admin ${numAdmins > 1 ? 's' : ''}`}</p>
                </div>
            </StyledStation>
        );
    }
}
