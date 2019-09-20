import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from '../common/Notification';
import { removeNotification } from './stationActions';

const NotifyPopupWindow = styled.div`
    position: fixed;
    right: 12px;
    top: 79px;
    max-width: 370px;
    z-index: 11;
`;


class Notifications extends Component {

    static propTypes = {
        notifications: PropTypes.shape({}),
        removeNotification: PropTypes.func.isRequired,
    };

    render() {
        const notifications = this.props.notifications;
        const notes = Object.keys(notifications).map(id =>
            (<Notification
              key={id}
              id={id}
              header={notifications[id].header}
              message={notifications[id].message}
              removeNotification={this.props.removeNotification}
            />),
        );
        return (
            <NotifyPopupWindow>
                {notes}
            </NotifyPopupWindow>
        );
    }
}


/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        notificationNum: state.station.notificationNum,
        notifications: state.station.notifications,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeNotification,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

