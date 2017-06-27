import React, { Component } from 'react';
import styled from 'styled-components';

const primaryC = '#9575CD';
const highlightC = '#5E35B1';
const secondaryC = '#FFD464';
const whiteC = '#E5E5E5';
const blackC = '#333';
const grayC = '#DDD';
const pinkC = '#BE8DBF';
const spotifyC = '#2ebd59';
const spotifyDarkC = '#1e9642';


const Header = styled.div`
    background: $primary-c;
    background: rgba(149, 117, 205, 0.9);
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: block;
    z-index: -1;
`;

const HeaderImage = styled.div`
    background-image: url("/assets/gifs/drake.gif");
    background-size: cover;
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: -2;
`;

// @media only screen and (max-width : 768px){
//     #large-logo svg {
//         height: 120px !important;
//     }
// }


// #header-center {
//     position: relative;
//     top: 36vh;
//     width: 100%;
// }


// #footer {
//     background: $primary-c;
//     height: 12px;
//     position: fixed;
//     top: 98.5vh;
//     height: 1.5vh;
// }

// #sign-in, #sign-up {
//     height: 100vh;
//     height: calc(100% - 79px);
//     background: white;
//     position: absolute;
//     top: 100vh;
//     transition: .4s;
// }
// #sign-in.shown, #sign-up.shown {
//     top: 67px;
// }

// #signup-content, #sign-in-content {
//     text-align: center;
// }
// #signup-label {
//     font-weight: 300;
//     font-size: 48px;
//     margin: 0;
// }
// #signup-details {
//     color: #AAA;
//     margin-bottom: 16px;
// }
// #signup-ul, #signin-ul {
//     list-style-type: none;
//     padding: 0;

//     input {
//         padding: 8px 10px;
//         margin: 4px;
//         font-size: 18px;
//         border: $gray-c solid 1px;
//         border-radius: 3px;
//     }
//     input.invalid {
//         border-color: red;
//     }
//     button {
//         font-size: 18px;
//         margin-top: 16px;
//         padding: 6px 0px;
//         color: white;
//         background-color: $primary-c;
//         border: $primary-c solid 2px;
//         border-radius: 3px;
//         cursor: pointer;
//         font-weight: 100;
//         transition: .2s;
//         width: 210px;
//     }
//     button:hover, button:hover {
//         transform: scale(1.02, 1.02);
//         background-color: $highlight-c;
//         border-color: $highlight-c;
//     }
// }
// #signin-spotify-button, #signup-spotify-button {
//     background-color: $spotify-c !important;
//     border-color: $spotify-c !important;
//     margin-top: 8px !important;
//     height: 37px;
//     span {
//         color: #FFF;
//         position: relative;
//         top: -4px;
//     }
// }
// #signin-spotify-button:hover, #signup-spotify-button:hover {
//     background-color: $spotify-dark-c !important;
//     border-color: $spotify-dark-c !important;
// }

// .error {
//     color: red;
//     margin: 2px;
//     display: none;
// }

// .error.shown {
//     display:block;
// }


export default class Login extends Component {

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
        const signupDetails = true ? 'complete your login info to sign up with Spotify' : 'create an account to socialize your music';
        return (
            <div>
                <HeaderImage />

                <Header>
                    <div className="content">
                        <div id="header-center">
                            <div id="large-logo"><img style={{ height: '160px' }} src="/assets/logo-accented-outline.svg" alt="stations" /></div>
                        </div>
                    </div>
                </Header>


                <div>
                    <div id="sign-in" className="container">
                        <div id="sign-in-content" className="content">
                            <h1 id="signup-label">log in to stations</h1>
                            <span id="signup-details">and keep the music going</span>
                            <form id="signin-ul">
                                <li><input name="username" id="username-sign-in" type="text" placeholder="username" /></li>
                                <li><input name="password" id="password-sign-in" type="password" placeholder="password" /></li>
                                <li id="sign-in-error" className="error">invalid username or password</li>
                                <li><button id="sign-in-submit">sign in</button></li>
                                <li><button id="signin-spotify-button"><span>sign in with</span> <div className="spotify-logo"></div></button></li>
                            </form>
                        </div>
                    </div>
                    <div id="sign-up" className="container">
                        <div id="signup-content" className="content">
                            <h1 id="signup-label">join stations</h1>
                            <span id="signup-details">{signupDetails}</span>
                            <form id="signup-ul">
                                <li><input name="firstname" id="firstname" type="text" placeholder="first name" value="<%=first_name%>"/><input name="lastname" id="lastname" type="text" placeholder="last name" name="lastname" value="<%=last_name%>"/></li>
                                <li><input name="newuser" id="username-sign-up" type="text" placeholder="username" value="<%=username%>"/></li>
                                <li id="username-error" className="error">username cannot contain special characters</li>
                                <li><input name="newpass" id="password-sign-up" type="password" placeholder="password" /></li>
                                <li id="password-error" className="error">password must be at least 6 characters</li>
                                <li><input id="confirm-password" type="password" placeholder="confirm password" /></li>
                                <li id="confirm-password-error" className="error">passwords do not match</li>
                                <li><button id="sign-up-submit">sign up</button></li>
                                <li><button id="signup-spotify-button"><span>sign up with</span> <div className="spotify-logo"></div></button></li>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
