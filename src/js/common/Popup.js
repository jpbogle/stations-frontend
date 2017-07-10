import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Colors from './Colors';

// #popup-dimmer, #spotify-dimmer {


//     #create-station-popup, #spotify-popup {
//         width: 500px;
//         height: 200px;
//         position: fixed;
//         left: calc(50vw);
//         transform: translateX(-50%);
//         padding-top: 12px;
//         background-color: #fff;
//         border-radius: 3px;
//         text-align: center;
//         list-style-type: none;
//         opacity: 0;
//         top: calc(40% - 100px);
//         transition: .2s;

//         h1 {
//             font-weight: 300;
//             font-size: 34px;
//             margin: 0;
//         }
//         span {
//             color: #AAA;
//             margin-bottom: 16px;
//         }
//         input {
//             border: 0;
//             width: calc(100% - 48px);
//             font-size: 18px;
//             padding: 12px;
//             margin: 12px 12px 4px 12px;
//             border-bottom: solid 1px;
//             border-bottom-color: rgba(229,229,229,1);
//             background: rgba(255, 255, 255, 0.95);
//             transition: .2s all;
//         }
//         input:focus {
//             outline: none;
//             border-bottom-color: $highlight-c;
//         }
//         input.invalid {
//             border-bottom-color: red;
//         }
//         #text-block {
//             text-align: left;
//             margin: 0 18px;
//         }
//         #buttons {
//             width: 100%;
//             position: absolute;
//             bottom: 0;

//             p {
//                 font-size: 18px;
//                 padding-top: 12px;
//                 padding-bottom: 12px;
//                 width: 50%;
//                 float: left;
//                 font-weight: 100;
//                 transition: .2s;
//                 color: white;
//                 cursor: pointer;
//                 transform-origin: 0 100%;
//             }
//             #ok-btn {
//                 width: 100%;
//             }
//             #cancel-btn, #ok-btn {
//                 background-color: #ccc;
//             }
//             #cancel-btn:hover, #ok-btn:hover {
//                 transform: scaleY(1.03);
//                 background-color: #bbb;
//             }
//             #create-btn {
//                 background-color: $primary-c;
//             }
//             #create-btn:hover {
//                 transform: scaleY(1.03);
//                 background-color: $highlight-c;
//             }
//         }
//     }
//     #spotify-popup {
//         height: 260px;
//     }
// }
// #popup-dimmer.shown, #spotify-dimmer.shown {
//     background: rgba(0, 0, 0, 0.5);
//     visibility: visible;

//     #create-station-popup, #spotify-popup {
//         top: calc(45% - 100px);
//         opacity: 1;
//     }
// }

const StyledError = styled.span`
    color: red;
    margin: 2px;
    display: ${props => props.error ? 'block' : 'none'};
`;
const Dimmer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: ${props => props.shown ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0,0,0,0)'};
    visibility: ${props => props.shown ? 'visible' : 'collapse'};
    top: 0;
    z-index: 12;
    transition: .2s;

`;
const PopupBox = styled.div`
    width: 500px;
    height: 200px;
    position: fixed;
    left: calc(50vw);
    transform: translateX(-50%);
    padding-top: 12px;
    background-color: #fff;
    border-radius: 3px;
    text-align: center;
    list-style-type: none;
    opacity: ${props => props.shown ? '1' : '0'};;
    top: ${props => props.shown ? 'calc(45% - 100px)' : 'calc(40% - 100px)'};
    transition: .2s;
    -webkit-box-shadow: 11px 10px 106px -26px rgba(0,0,0,0.75);
    -moz-box-shadow: 11px 10px 106px -26px rgba(0,0,0,0.75);
    box-shadow: 11px 10px 106px -26px rgba(0,0,0,0.75);

    h1 {
        font-weight: 300;
        font-size: 34px;
        margin: 0;
    }

    span {
        color: #AAA;
        margin-bottom: 16px;
    }

    input {
        font-weight: 100;
        border: 0;
        width: calc(100% - 48px);
        font-size: 18px;
        padding: 12px;
        margin: 12px 12px 4px 12px;
        border-bottom: solid 1px;
        border-bottom-color: rgba(229,229,229,1);
        background: rgba(255, 255, 255, 0.95);
        transition: .2s all;
    }

    input:focus {
        outline: none;
        border-bottom-color: ${Colors.highlightC};
    }
`;

//             #ok-btn {
//                 width: 100%;
//             }
//             #cancel-btn, #ok-btn {
//                 background-color: #ccc;
//             }
//             #cancel-btn:hover, #ok-btn:hover {
//                 transform: scaleY(1.03);
//                 background-color: #bbb;
//             }
//             #create-btn {
//                 background-color: $primary-c;
//             }
//             #create-btn:hover {
//                 transform: scaleY(1.03);
//                 background-color: $highlight-c;
//             }


const PopupButton = styled.div`
    font-size: 18px;
    padding-top: 12px;
    padding-bottom: 12px;
    width: 50%;
    float: left;
    font-weight: 100;
    transition: .2s;
    color: white;
    cursor: pointer;
    transform-origin: 0 100%;
    background-color: ${props => props.cancel ? '#ccc' : Colors.primaryC};

    &:hover {
        transform: scaleY(1.03);
        background-color: ${props => props.cancel ? '#bbb' : Colors.highlightC};
    }
`;

export default class Popup extends Component {

    static propTypes = {
        text: PropTypes.string,
        shown: PropTypes.bool,
        close: PropTypes.func.isRequired,
    };

    static defaultProps = {
        text: '',
        shown: false,
    }

    constructor(props) {
        super(props);
        this.handleClick = :: this.handleClick;
    }

    componentDidMount() {
        this.textInput.focus();
    }

    handleClick() {
        if (this.props.shown) {
            this.props.close();
        }
    }

    render() {
        return (
            <Dimmer shown={this.props.shown}>
                <PopupBox id="create-station-popup" shown={this.props.shown}>
                    <h1>create a station</h1>
                    <span>and keep the music going</span>
                    <input
                      name="station"
                      type="text"
                      placeholder="station name"
                      tabIndex="-1"
                      onBlur={this.handleClick}
                      ref={(input) => { this.textInput = input; }}
                    />
                    <StyledError>station name already taken</StyledError>
                    <StyledError>invalid station name - only alphanumeric characters</StyledError>
                    <div style={{ width: '100%', position: 'absolute', bottom: '0' }}>
                        <PopupButton cancel={true}>cancel</PopupButton>
                        <PopupButton cancel={false}>create station</PopupButton>
                    </div>
                </PopupBox>
            </Dimmer>

        );
    }
}


// <Dimmer shown={this.props.shown}>
//     <MessageBox shown={this.props.shown}>
//         <p
//           tabIndex="1"
//           onBlur={this.handleClick}
//           ref={(elem) => { setTimeout(() => elem.focus(), 100); }}
//         >
//             {this.props.text}
//         </p>
//         <NotificationOkay>
//             <Caret className="fa fa-angle-left fa-2x" />
//         </NotificationOkay>
//     </MessageBox>
// </Dimmer>
