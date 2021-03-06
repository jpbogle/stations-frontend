import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { signUp } from './loginActions';
import SpotifyButton from '../common/SpotifyButton';
import Button from '../common/Button';
import Loading from '../common/Loading';
import * as Colors from '../common/Colors';


const SignUpForm = styled.div`
    height: 100vh;
    height: calc(100% - 79px);
    background: white;
    position: absolute;
    top: ${props => props.shown ? '67px' : '100vh'};
    transition: .4s;
`;

const Input = styled.input`
    padding: 8px 10px;
    margin: 4px;
    font-size: 18px;
    border: solid 1px;
    border-color: ${props => props.error ? 'red' : Colors.grayC};
    border-radius: 3px;
    font-weight: 100;
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
        signUp: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.shape({
            status: PropTypes.numer,
            statusText: PropTypes.string,
        }),
    };

    static defaultProps = {
        index: true,
        error: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            confirmPassword: '',
            error: {
                status: 200,
                statusText: '',
            },
        };
        this.handleSignUp = :: this.handleSignUp;
    }

    componentWillReceiveProps(props) {
        this.setState({
            ...this.state,
            error: props.error,
        });
    }

    handleSignUp() {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                ...this.state,
                error: {
                    status: 2,
                    statusText: 'passwords do not match',
                },
            });
        } else if (this.state.password.length < 6) {
            this.setState({
                ...this.state,
                error: {
                    status: 1,
                    statusText: 'passwords must be 6 characters in length',
                },
            });
        } else {
            this.props.signUp({
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password,
            });
        }
    }

    handleValueChange(e, param) {
        this.setState({
            ...this.state,
            [param]: e.target.value,
        });
    }

    render() {
        const { error } = this.state;
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
        };

        const signupDetails = true ? 'complete your login info to sign up with Spotify' : 'create an account to socialize your music';

        let content;
        if (this.props.loading) {
            content = (<div style={{ position: 'absolute', right: 'calc(50% - 200px)', top: '-5px' }}><Loading /></div>);
        }
        return (
            <SignUpForm className="container" shown={this.props.shown}>
                <div style={{ textAlign: 'center' }} className="content">
                    <h1 style={styles.label}>join stations {content}</h1>
                    <span style={styles.details}>{signupDetails}</span>
                    <form
                      style={styles.form}
                      onSubmit={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.handleSignUp();
                      }}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault();
                              this.handleSignUp();
                          }
                      }}
                    >
                        <li>
                            <Input
                              type="text"
                              placeholder="first name"
                              value={this.state.first_name}
                              onChange={e => this.handleValueChange(e, 'first_name')}
                            />
                            <Input
                              type="text"
                              placeholder="last name"
                              name="lastname"
                              value={this.state.last_name}
                              onChange={e => this.handleValueChange(e, 'last_name')}
                            />
                        </li>
                        <li>
                            <Input
                              error={error.status === 500}
                              type="text"
                              placeholder="username"
                              value={this.state.username}
                              onChange={e => this.handleValueChange(e, 'username')}
                            />
                        </li>
                        <Error error={error.status === 500}>username already taken</Error>
                        <li>
                            <Input
                              error={error.status === 2 || error.status === 1}
                              type="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={e => this.handleValueChange(e, 'password')}
                            />
                        </li>
                        <Error error={error.status === 1}>password must be at least 6 characters</Error>
                        <li>
                            <Input
                              error={error.status === 2}
                              type="password"
                              placeholder="confirm password"
                              value={this.state.confirmPassword}
                              onChange={e => this.handleValueChange(e, 'confirmPassword')}
                            />
                        </li>
                        <Error error={error.status === 2}>passwords do not match</Error>
                        <li>
                            <Button onClick={() => this.handleSignUp()}>sign up</Button>
                        </li>
                        <li>
                            <SpotifyButton text={'sign up with'} />
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
        error: state.login.signUp.error,
        loading: state.login.loading,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

