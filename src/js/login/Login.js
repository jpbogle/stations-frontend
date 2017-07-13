import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { changeGif } from './loginActions';
import LogoText from '../common/LogoText';
import * as Colors from '../common/Colors';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';


const Cover = styled.div`
    background: ${Colors.primaryC};
    background: rgba(149, 117, 205, 0.9);
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: block;
    z-index: -1;
`;

const CoverImage = styled.div`
    background-image: url("assets/gifs/${props => props.gif}");
    background-size: cover;
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: -2;
`;

const CoverCenter = styled.div`
    position: relative;
    top: 36vh;
    width: 100%;
    svg {
        height: 160px;
    }
`;

const gifs = ['lmfao.gif', 'sorry.gif', 'gangnam.gif', 'thriller.gif'];


export class Login extends Component {

    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            gif: 0,
        };
    }

    componentDidMount() {
        clearInterval(this.gifInterval);
        this.gifInterval = setInterval(() => this.nextGif(), 6850);
    }

    componentWillUnmount() {
        clearInterval(this.gifInterval);
    }

    nextGif() {
        const nextGif = this.state.gif < 3 ? this.state.gif + 1 : 0;
        this.setState({
            ...this.state,
            gif: nextGif,
        });
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
                <Header index={true} />
                <CoverImage
                  gif={gifs[this.state.gif]}
                />
                <Cover>
                    <div className="content">
                        <CoverCenter>
                            <LogoText />
                        </CoverCenter>
                    </div>
                </Cover>
                <div>
                    <SignIn />
                    <SignUp />
                </div>
            </div>
        );
    }
}


/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {

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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

