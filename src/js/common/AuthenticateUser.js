import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

class AuthenticateUser extends Component {

    static propTypes = {
        children: PropTypes.node,
        user: PropTypes.object,
        currentURL: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const { user } = this.props;
        // if (user === null) {
        //     // set redirect URL in state if we want to redirect
        //     // to the place the user was going before requiring auth
        //     // setRedirectUrl(currentURL);
        //     browserHistory.replace('/');
        // }
    }

    render() {
        return this.props.children;
        if (this.props.user != null) {
            return this.props.children;
        }
        return null;
    }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
    return {
        user: state.login.user,
        currentURL: ownProps.location.pathname,
    };
}

/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateUser);
