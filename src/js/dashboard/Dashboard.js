import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import Popup from '../common/Popup';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            create: true,
        };
        this.handleClose = :: this.handleClose;
    }

    handleClose() {
        this.setState({
            create: false,
        });
    }

    render() {
        return (
            <div>
                <Header />
                Dashbaorrd
                <Popup shown={this.state.create} close={this.handleClose} />
            </div>
        );
    }
}
