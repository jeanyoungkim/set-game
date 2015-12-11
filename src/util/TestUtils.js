import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';

import configureStore from 'store/configureStore';
import {Provider} from 'react-redux';

import mockery from 'mockery';
import {AsyncRegister} from 'lib/AsyncRegister';

const asyncRegister = AsyncRegister();
const store = configureStore({}, asyncRegister);
const activeMocks = [];

const TestUtils = {
    requireWithMocks: (module, mocks) => {
        Reflect.ownKeys(mocks).forEach((mockModule) => {
            mockery.registerMock(mockModule, mocks[mockModule]);
        });
        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });
        return require(module);
    },

    shutdownMocks: () => {
        mockery.disable();
        while (activeMocks.length) {
            const mockModule = activeMocks.pop();
            mockery.deregisterMock(mockModule);
        }
    },

    wrapComponentWithProvider: (component) => {
        return <Provider store={store}>{component}</Provider>;
    },

    changeFormFields: (form, data) => {
        Reflect.ownKeys(data).forEach((name) => {
            const field = form.querySelector(`[name="${name}"]`);
            field.value = data[name];
            ReactTestUtils.Simulate.change(field);
        });
    },

    findRenderedDOMElementsBySelector: (instance, selector) => {
        const el = ReactDOM.findDOMNode(instance);
        if (!el) {
            throw new Error('Failed to locate React-rendered DOM element');
        }
        if (el.matches(selector)) {
            return [el];
        }
        return el.querySelectorAll(selector);
    },

    findRenderedDOMElementsWithText: (instance, text) => {
        return ReactTestUtils.findAllInRenderedTree(instance, (el) => {
            return el.textContent &&
                el.textContent.indexOf(text) !== -1;
        });
    },

    // TODO: remove after revisiting API layer
    expectLastCall: (mockApi, methodName, params) => {
        const lastCall = mockApi.getLastCall();
        expect(lastCall).toExist();
        expect(lastCall.methodName).toBe(methodName);
        if (params) {
            for (let i = 0; i < params.length; i++) {
                expect(lastCall.params[i]).toBe(params[i]);
            }
        }
    }
};

export default TestUtils;
