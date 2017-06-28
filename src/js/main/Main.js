import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';

export default class MainView extends Component {

    static propTypes = {
        children: PropTypes.node,
    };

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
                { this.props.children }
            </div>
        );
    }
}
