import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { login } from './loginActions';
import Loading from '../common/Loading';
import SpotifyButton from '../common/SpotifyButton';
import Button from '../common/Button';
import * as Colors from '../common/Colors';


const SignInForm = styled.div`
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

export class SignIn extends Component {

    static propTypes = {
        index: PropTypes.bool,
        shown: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.shape({
            status: PropTypes.numer,
            statusText: PropTypes.string,
        }).isRequired,
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

    handleLogin() {
        this.props.login({
            username: this.state.username,
            password: this.state.password,
        });
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
                border: 'solid 1px',
                borderColor: this.props.error ? 'red' : Colors.grayC,
                borderRadius: '3px',
                fontWeight: '100',
            },

        };
        let content;
        if (this.props.loading) {
            content = (<div style={{ position: 'absolute', right: 'calc(50% - 250px)', top: '-5px' }}><Loading /></div>);
        }
        return (
            <SignInForm className="container" shown={this.props.shown}>
                <div style={{ textAlign: 'center' }} className="content">
                    <h1 style={styles.label}>log in to stations{content}</h1>
                    <span style={styles.details}>and keep the music going</span>
                    <form
                      style={styles.form}
                      onSubmit={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          this.handleLogin();
                      }}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                              e.preventDefault();
                              this.handleLogin();
                          }
                      }}
                    >
                        <li>
                            <Input
                              error={this.props.error.status !== 200}
                              type="text"
                              placeholder="username"
                              value={this.state.username}
                              onChange={e => this.handleUsername(e)}
                            />
                        </li>
                        <li>
                            <Input
                              error={this.props.error.status !== 200}
                              type="password"
                              placeholder="password"
                              value={this.state.password}
                              onChange={e => this.handlePassword(e)}
                            />
                        </li>
                        <Error error={this.props.error.status !== 200}>invalid username or password</Error>
                        <li>
                            <Button id="sign-in-submit" onClick={() => this.handleLogin()}>sign in</Button>
                        </li>
                        <li>
                            <SpotifyButton text={'sign in with'} />
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
        error: state.login.signIn.error,
        shown: state.login.signIn.shown,
        loading: state.login.loading,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

