/* global describe, it */

import { expect } from 'chai';

import reducer from './../../src/js/hello/helloReducer';
import {
    REQUEST_QUOTES,
    RECIEVE_QUOTES_SUCCESS,
    RECIEVE_QUOTES_FAILURE,
    CHANGE_MESSAGE,
} from './../../src/js/hello/helloActions';

describe('Hello Reducer Unit Testing Suite', () => {
    const quotes = require('../../src/assets/quotes.json');
    const initialState = {
        text: 'Hello World!',
        quotes: [],
        fetching: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });

    it('CHANGE_MESSAGE: should return the state with text relative to id "0"', () => {
        expect(
            reducer({
                ...initialState,
                quotes,
            }, {
                type: CHANGE_MESSAGE,
                id: 0,
            })
        ).to.deep.equal({
            ...initialState,
            quotes,
            text: 'Allow me to break the ice.',
        });
    });

    it('CHANGE_MESSAGE: should return the state with text relative to id "1"', () => {
        expect(
            reducer({
                ...initialState,
                quotes,
            }, {
                type: CHANGE_MESSAGE,
                id: 1,
            })
        ).to.deep.equal({
            ...initialState,
            quotes,
            text: `COME ON, DO IT!!! KILL MEEE! I'M RIGHT HERE!!`,
        });
    });

    it('REQUEST_QUOTES: should just set fetching to true', () => {
        expect(
            reducer({
                ...initialState,
            }, {
                type: REQUEST_QUOTES,
            })
        ).to.deep.equal({
            ...initialState,
            fetching: true,
        });
    });

    it('RECIEVE_QUOTES_SUCCESS: should just set fetching to false and set the received quotes', () => {
        expect(
            reducer({
                ...initialState,
                quotes,
            }, {
                type: RECIEVE_QUOTES_SUCCESS,
                payload: {
                    quotes,
                },
            })
        ).to.deep.equal({
            ...initialState,
            quotes,
            fetching: false,
        });
    });

    it('RECIEVE_QUOTES_FAILURE: should just set fetching to false and set the error', () => {
        const error = {
            status: '404',
            statusText: 'Test error',
        };

        expect(
            reducer({
                ...initialState,
            }, {
                type: RECIEVE_QUOTES_FAILURE,
                payload: {
                    error,
                },
            })
        ).to.deep.equal({
            ...initialState,
            error,
            fetching: false,
        });
    });
});
