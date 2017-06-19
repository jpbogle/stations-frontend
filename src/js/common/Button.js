import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}

export default class Button extends Component {

    static propTypes = {
        onButtonClicked: PropTypes.func,
    }

    render() {
        var style = this.props.clicked ? { backgroundColor: 'red' } : null

        return (
            <div style = { style } onClick = { toggleClick }>
                  { this.props.value }
            </div>
        );
    }
}
