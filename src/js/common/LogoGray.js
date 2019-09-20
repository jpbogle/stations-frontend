import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LogoGray extends Component {

    static propTypes = {
        animate: PropTypes.bool,
    };

    static defaultProps = {
        animate: false,
    }

    render() {
        const styles = {
            purple: {
                fill: '#DDD',
            },
            white: {
                fill: '#FFF',
            },
        };

        const opacity = this.props.animate ? '0' : '1';

        return (
            <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 85.2 85.1">
                <circle style={styles.purple} cx="42.5" cy="42.5" r="42.5" />
                <path style={styles.white} d="M16,49c-1,0-2-1-2-1.5v-10c0-1,1-1.5,2-1.5s2,1,2,1.5v10C18,48,17,49,16,49z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.0s"
                    />
                </path>
                <path style={styles.white} d="M25,61.5c-1,0-2-1-2-1.5V27c0-1,1-1.5,2-1.5s2,1,2,1.5v33C27,60.5,26,61.5,25,61.5z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.1s"
                    />
                </path>
                <path style={styles.white} d="M33.5,78c-1,0-2-1-2-1.5V10c0-1,1-1.5,2-1.5s2,1,2,1.5v66.5C35.5,77,34.5,78,33.5,78z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.2s"
                    />
                </path>
                <path style={styles.white} d="M41.5,72.5c-1,0-2-1-2-1.5V15.5c0-1,1-1.5,2-1.5s2,1,2,1.5V71C44,71.5,43,72.5,41.5,72.5z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.3s"
                    />
                </path>
                <path style={styles.white} d="M50,63.5c-1,0-2-1-2-1.5V24.5c0-1,1-1.5,2-1.5s2,1,2,1.5V62C52,63,51,63.5,50,63.5z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.4s"
                    />
                </path>
                <path style={styles.white} d="M58.5,55.5c-1,0-2-1-2-1.5V33c0-1,1-1.5,2-1.5s2,1,2,1.5v21C60.5,54.5,59.5,55.5,58.5,55.5z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.5s"
                    />
                </path>
                <path style={styles.white} d="M66.5,50c-1,0-2-1-2-1.5v-10c0-1,1-1.5,2-1.5s2,1,2,1.5v10C68.5,49,68,50,66.5,50z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.6s"
                    />
                </path>
                <path style={styles.white} d="M74,48c-1,0-2-0.5-2-1v-7c0-0.5,1-1,2-1s2,0.5,2,1v7C76,47,75,48,74,48z">
                    <animate
                      attributeType="CSS"
                      attributeName="opacity"
                      from="1"
                      to={opacity}
                      dur="1.2s"
                      repeatCount="indefinite"
                      begin="0.7s"
                    />
                </path>
            </svg>
        );
    }
}
