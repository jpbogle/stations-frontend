import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { changeSignUpValue } from './loginActions';
import * as Colors from '../common/Colors';


const SignUpForm = styled.div`
    height: 100vh;
    height: calc(100% - 79px);
    background: white;
    position: absolute;
    top: ${props => props.shown ? '67px' : '100vh'};
    transition: .4s;
`;

const Button = styled.div`
    font-size: 18px;
    margin: 16px auto 0px auto;
    padding: 6px 0px;
    color: white;
    background-color: ${Colors.primaryC};
    border: $primary-c solid 2px;
    border-radius: 3px;
    cursor: pointer;
    transition: .2s;
    width: 210px;
    &:hover {
      transform: scale(1.02, 1.02);
      background-color: $highlight-c;
      border-color: $highlight-c;
`;

const Error = styled.li`
    color: red;
    margin: 2px;
    display: ${props => props.error ? 'block' : 'none'};
`;

export class SignUp extends Component {

    static propTypes = {
        index: PropTypes.bool,
        shown: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        index: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleValueChange(e, param) {
        this.setState({
            ...this.state,
            [param]: e.target.value,
        });
    }

    render() {
        const styles = {
            label: {
                fontWeight: '400',
                fontSize: '48px',
                margin: '0',
            },
            details: {
                color: '#AAA',
                marginBottom: '16px',
            },
            form: {
                listStyleType: 'none',
                padding: '0',
            },
            input: {
                padding: '8px 10px',
                margin: '4px',
                fontSize: '18px',
                border: `${Colors.grayC} solid 1px`,
                borderRadius: '3px',
                fontWeight: '100',
            },
        };

        const signupDetails = true ? 'complete your login info to sign up with Spotify' : 'create an account to socialize your music';

        return (
            <SignUpForm className="container" shown={this.props.shown}>
                <div style={{ textAlign: 'center' }} className="content">
                    <h1 style={styles.label}>join stations</h1>
                    <span style={styles.details}>{signupDetails}</span>
                    <form style={styles.form}>
                        <li>
                            <input
                              style={styles.input}
                              type="text"
                              placeholder="first name"
                              value={this.state.firstName}
                              onChange={e => this.handleValueChange(e, 'firstName')}
                            />
                            <input
                              style={styles.input}
                              type="text"
                              placeholder="last name"
                              name="lastname"
                              value={this.state.lastName}
                              onChange={e => this.handleValueChange(e, 'lastName')}
                            />
                        </li>
                        <li>
                            <input
                              style={styles.input}
                              type="text"
                              placeholder="username"
                              value={this.state.username}
                              onChange={e => this.handleValueChange(e, 'username')}
                            />
                        </li>
                        <Error>username cannot contain special characters</Error>
                        <li>
                            <input
                              style={styles.input}
                              type="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={e => this.handleValueChange(e, 'password')}
                            />
                        </li>
                        <Error>password must be at least 6 characters</Error>
                        <li>
                            <input
                              style={styles.input}
                              type="password"
                              placeholder="confirm password"
                              value={this.state.confirmPassword}
                              onChange={e => this.handleValueChange(e, 'confirmPassword')}
                            />
                        </li>
                        <Error>passwords do not match</Error>
                        <li>
                            <Button id="sign-up-submit">sign up</Button>
                        </li>
                        <li>
                            <Button id="signup-spotify-button">
                                <span>sign up with</span><div className="spotify-logo" />
                            </Button>
                        </li>
                    </form>
                </div>
            </SignUpForm>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        shown: state.login.signUp.shown,
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

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

