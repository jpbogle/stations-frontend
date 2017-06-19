/* global describe, it */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import Message from './../../src/js/common/Message';

describe('Message Testing Suite', () => {
    it('should render an Alert', () => {
        const text = 'sample text';
        const renderer = TestUtils.createRenderer();
        renderer.render(<Message text={text} />);
        const output = renderer.getRenderOutput();

        expect(output.props.children.props.children).to.equal(`"${text}"`);
    });
});

