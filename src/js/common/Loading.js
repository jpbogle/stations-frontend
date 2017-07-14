import React, { Component } from 'react';

export default class Loading extends Component {

    render() {
        const styles = {
            purple: {
                fill: '#5F459B',
            },
            white: {
                fill: '#FFF',
            },
        };

        return (
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="50px" height="60px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }}>
            <rect x="0" y="20" width="4" height="10" fill="#5F459B" opacity="1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin="0s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="30; 10; 30" begin="0s" dur=".7s" repeatCount="indefinite" />
            </rect>
            <rect x="6" y="20" width="4" height="10" fill="#5F459B"  opacity="0.1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin=".08s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin=".08s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="30; 10; 30" begin=".08s" dur=".7s" repeatCount="indefinite" />
            </rect>
            <rect x="12" y="20" width="4" height="10" fill="#5F459B"  opacity="0.1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin=".16s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin=".16s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="30; 10; 30" begin=".16s" dur=".7s" repeatCount="indefinite" />
            </rect>
            <rect x="18" y="20" width="4" height="10" fill="#5F459B"  opacity="0.1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin=".24s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin=".24s" dur=".7s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="30; 10; 30" begin=".24s" dur=".7s" repeatCount="indefinite" />
            </rect>
          </svg>
        );
    }
};
