import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Colors from '../common/Colors';

const StyledStation = styled.div`
    height: 80px;
    border-top: 1px solid #ddd;
    cursor: pointer;
    transition: .2s;
    padding: 5px 12px;
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
        padding-left: 15px;

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

    };


    render() {
        return (
            <StyledStation class="station">
                <i className="fa fa-plus fa-4x" aria-hidden="true" />
                <div>
                    <span>create a new station</span>
                    <p>start your party</p>
                </div>
            </StyledStation>
        );
    }
}
