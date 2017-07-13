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
            <rect x="0" y="10" width="4" height="20" fill="#5F459B" opacity="1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin="0s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="20; 40; 20" begin="0s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="20; 10; 20" begin="0s" dur=".6s" repeatCount="indefinite" />
            </rect>
            <rect x="8" y="10" width="4" height="20" fill="#5F459B"  opacity="0.1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin=".2s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="20; 40; 20" begin=".2s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="20; 10; 20" begin=".2s" dur=".6s" repeatCount="indefinite" />
            </rect>
            <rect x="16" y="10" width="4" height="20" fill="#5F459B"  opacity="0.1">
              <animate attributeName="opacity" attributeType="XML" values="0.1; 1; .1" begin=".4s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="height" attributeType="XML" values="20; 40; 20" begin=".4s" dur=".6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML" values="20; 10; 20" begin=".4s" dur=".6s" repeatCount="indefinite" />
            </rect>
          </svg>
        );
    }
};
