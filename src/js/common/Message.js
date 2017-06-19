import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class Message extends Component {

    static propTypes = {
        text: PropTypes.string,
    };

    render() {
        const styles = {
            messageBox: {
                background: 'ghostwhite',
                color: 'darkslategrey',
                border: '1px solid gainsboro',
                fontSize: '2em',
                fontStyle: 'italic',
                fontFamily: 'Serif',
            },
        };

        return (
            <Alert bsStyle="success" style={styles.messageBox}>
                <span>{ `"${this.props.text}"` }</span>
            </Alert>
        );
    }
}
