/* global describe, it */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

import { Hello } from './../../src/js/hello/Hello';
import Message from './../../src/js/common/Message';
import Button from './../../src/js/common/Button';

function setup(newProps) {
    const props = {
        onButtonClicked: sinon.spy(),
        onRequestQuotes: sinon.spy(),
        ...newProps,
    };

    const renderer = TestUtils.createRenderer();
    renderer.render(<Hello {...props} />);
    const output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer,
    };
}

describe('Hello Testing Suite', () => {
    it('should render correctly', () => {
        const { output } = setup();

        expect(output.type).to.equal('div');
        expect(output.props.className).to.equal('hello-root');

        const [message, button] = output.props.children.props.children;

        expect(message.type).to.equal(Message);
        expect(button.type).to.equal(Button);
    });

    it('should fire the click action', () => {
        const { output, props } = setup();
        const button = output.props.children.props.children[1];
        button.props.onButtonClicked('someId');
        expect(props.onButtonClicked.called).to.be.ok;
    });

    it('should pass the supplied text to Message', () => {
        const { output, props } = setup({ text: 'Hello World!' });
        expect(props.text).to.equal('Hello World!');

        const button = output.props.children.props.children[0];
        expect(button.props.text).to.equal('Hello World!');
    });

    it('should request quotes when mounting', () => {
        const { props } = setup();
        expect(props.onRequestQuotes.called).to.be.ok;
    });

    it('should display the error message if error is not null', () => {
        const error = {
            error: {
                status: '404',
                statusText: 'Force fail for test',
            },
        };
        const { output, props } = setup(error);

        expect(props.error).to.equal(error.error);

        const alert = output.props.children;
        const errMessage = alert.props.children;
        expect(errMessage[0]).to.equal('404');
        expect(errMessage[1]).to.equal(' ');
        expect(errMessage[2]).to.equal('Force fail for test');
    });
});
