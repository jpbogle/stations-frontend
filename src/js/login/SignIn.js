import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { changeSignInValue } from './loginActions';
import * as Colors from '../common/Colors';


const SignInForm = styled.div`
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
    font-weight: 100;
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

export class SignIn extends Component {

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
            username: '',
            password: '',
        };
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value,
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
            },

        };

        return (
            <SignInForm className="container" shown={this.props.shown}>
                <div style={{ textAlign: 'center' }} className="content">
                    <h1 style={styles.label}>log in to stations</h1>
                    <span style={styles.details}>and keep the music going</span>
                    <form style={styles.form}>
                        <li>
                            <input
                              style={styles.input}
                              type="text"
                              placeholder="username"
                              value={this.state.username}
                              onChange={e => this.handleUsername(e)}
                            />
                        </li>
                        <li>
                            <input
                              style={styles.input}
                              type="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={e => this.handlePassword(e)}
                            />
                        </li>
                        <Error error={false}>invalid username or password</Error>
                        <li>
                            <Button id="sign-in-submit">sign in</Button>
                        </li>
                        <li>
                            <Button id="signin-spotify-button">
                                <span>sign in with</span><div className="spotify-logo" />
                            </Button>
                        </li>
                    </form>
                </div>
            </SignInForm>
        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {
        shown: state.login.signIn.shown,
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
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

