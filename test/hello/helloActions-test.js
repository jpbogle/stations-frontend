/* global describe, it, beforeEach, afterEach */
/* eslint max-len: 0 */
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './../../src/js/hello/helloActions';

const mockStore = configureMockStore([thunk]);

describe('Hello Actions Unit Testing Suite', () => {
    describe('Pure actions', () => {
        it('should create the correct change_message action', () => {
            const changeMessage = {
                type: 'CHANGE_MESSAGE',
                id: '0',
            };

            const store = mockStore({ text: 'Hello World!' });
            store.dispatch(actions.changeMessage('0'));
            expect(store.getActions()[0]).to.deep.equal(changeMessage);
        });

        it('should create the correct request_quotes action', () => {
            const url = '/test/url';
            const requestQuote = {
                type: 'REQUEST_QUOTES',
                payload: {
                    url,
                },
            };

            const store = mockStore({ });
            store.dispatch(actions.requestQuotes(url));
            expect(store.getActions()[0]).to.deep.equal(requestQuote);
        });

        it('should create the correct recieve_quotes_success action', () => {
            const quotes = ['1', '2', '3'];
            const receivedQuotes = {
                type: 'RECIEVE_QUOTES_SUCCESS',
                payload: {
                    quotes,
                },
            };

            const store = mockStore({ });
            store.dispatch(actions.recieveQuotesSuccess(quotes));
            expect(store.getActions()[0]).to.deep.equal(receivedQuotes);
        });

        it('should create the correct recieve_quotes_failure action', () => {
            const error = {
                status: '404',
                statusText: 'Test error',
            };
            const receivedQuotes = {
                type: 'RECIEVE_QUOTES_FAILURE',
                error: true,
                payload: {
                    error,
                },
            };

            const store = mockStore({ });
            store.dispatch(actions.recieveQuotesFailure(error));
            expect(store.getActions()[0]).to.deep.equal(receivedQuotes);
        });
    });

    describe('Complex actions', () => {
        it('should fire a change_message action if onButtonClicked', () => {
            const changeMessage = {
                type: 'CHANGE_MESSAGE',
                id: '0',
            };

            const store = mockStore({ text: 'Hello World!' });
            const { dispatch } = store;

            const onButtonClicked = actions.onButtonClicked('0');
            dispatch(onButtonClicked(dispatch));
            expect(store.getActions()[0]).to.deep.equal(changeMessage);
        });

        it('should make a call to the test url and dispatch a success action', (done) => {
            const store = mockStore({});
            const { dispatch } = store;

            const testUrl = '/test';
            const mockResponse = ['1', '2', '3'];
            fetchMock.get(testUrl, {
                ok: true,
                status: 200,
                body: mockResponse,
            });

            const onRequestQuotes = actions.onRequestQuotes(testUrl);
            onRequestQuotes(dispatch)
                .then((res) => {
                    expect(store.getActions()[0].type).to.equal('REQUEST_QUOTES');
                    expect(fetchMock.called(testUrl)).to.be.true;
                    expect(store.getActions()[1].type).to.equal('RECIEVE_QUOTES_SUCCESS');
                    expect(res.payload).to.deep.equal(mockResponse);
                    fetchMock.restore();
                })
                .then(done, done);
        });

        it('should make a call to the test url and dispatch a failure action due to parsing error', (done) => {
            const store = mockStore();
            const { dispatch } = store;

            const testUrl = '/test';
            fetchMock.get(testUrl, {
                ok: false,
                status: 400,
            });

            const onRequestQuotes = actions.onRequestQuotes(testUrl);
            onRequestQuotes(dispatch)
                .catch((err) => {
                    expect(store.getActions()[0].type).to.equal('REQUEST_QUOTES');
                    expect(fetchMock.called(testUrl)).to.be.true;
                    expect(store.getActions()[1].type).to.equal('RECIEVE_QUOTES_FAILURE');
                    expect(err.status).to.equal(400);
                    fetchMock.restore();
                })
                .then(done, done);
        });
    });
});
