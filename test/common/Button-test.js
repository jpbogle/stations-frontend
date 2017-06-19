/* global describe, it */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { spy } from 'sinon';

import Button from './../../src/js/common/Button';

function setup(newProps) {
    const props = {
        onButtonClicked: spy(),
        ...newProps,
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Button {...props} />);
    const output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer,
    };
}

describe('Button Testing Suite', () => {
    it('should render correctly', () => {
        const { output } = setup();

        expect(output.type).to.equal('button');
        expect(output.props.className).to.equal('btn btn-primary');
    });

    it('should fire the click action', () => {
        const { output, props } = setup();
        output.props.onClick();
        expect(props.onButtonClicked.called).to.be.true;

        const randomlyGeneratedNumber = props.onButtonClicked.args[0][0];

        expect(randomlyGeneratedNumber).to.be.at.most(100);
        expect(randomlyGeneratedNumber).to.be.at.least(0);
    });
});
