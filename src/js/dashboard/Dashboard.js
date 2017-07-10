import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: '',
        };
    }

    handleAuth(person) {
        this.setState({ person });
    }

    render() {
        return (
            <div>
                Dashbaord
            </div>
        );
    }
}
