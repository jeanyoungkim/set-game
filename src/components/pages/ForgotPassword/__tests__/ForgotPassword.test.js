import expect from 'expect';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import TestUtils from 'util/TestUtils';

import generateMockApi from 'util/generateMockApi';
const mockApi = generateMockApi([
    'requestPasswordReset',
    'checkPasswordResetToken',
    'performPasswordReset'
]);

describe.skip('ForgotPassword', () => {
    describe('EmailFormPage', () => {
        let EmailFormPage;
        let instance;

        before(() => {
            EmailFormPage = TestUtils.requireWithMocks('components/pages/ForgotPassword/EmailFormPage', {
                'api/ForgotPasswordApi': mockApi
            });
        });

        after(() => {
            TestUtils.shutdownMocks();
        });

        beforeEach(() => {
            instance = ReactTestUtils.renderIntoDocument(
                TestUtils.wrapComponentWithProvider(
                    <EmailFormPage />
                )
            );
        });

        it('renders a form with email input', () => {
            const emailInputElement = TestUtils.findRenderedDOMElementsBySelector(instance,
                'form input[name=email][type=email]');
            expect(emailInputElement).toExist();
        });

        it('calls backend function with provided email on submission', () => {
            const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
            TestUtils.changeFormFields(form, {
                email: 'nobody@nowhere.com'
            });
            ReactTestUtils.Simulate.submit(form);
            TestUtils.expectLastCall(mockApi,
                'requestPasswordReset', ['nobody@nowhere.com']);
        });

        it('requires valid email address', () => {
            const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
            TestUtils.changeFormFields(form, {
                email: 'invalid email'
            });
            ReactTestUtils.Simulate.submit(form);
            const emailErrors = TestUtils.findRenderedDOMElementsBySelector(instance,
                '[data-error-for-field=email]');
            expect(emailErrors).toExist();
        });

        it('displays email address after submission', (done) => {
            const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
            TestUtils.changeFormFields(form, {
                email: 'nobody@nowhere.com'
            });
            ReactTestUtils.Simulate.submit(form);
            const lastCall = mockApi.getLastCall();
            expect(lastCall).toExist();
            lastCall.promiseResolver.resolve();
            setImmediate(() => {
                const emailErrors = TestUtils.findRenderedDOMElementsWithText(instance,
                    'nobody@nowhere.com');
                expect(emailErrors).toExist();
                done();
            });
        });
    });

    describe('PasswordFormPage', () => {
        let PasswordFormPage;
        let instance;

        before(() => {
            PasswordFormPage = TestUtils.requireWithMocks('components/pages/ForgotPassword/PasswordFormPage', {
                'api/api': mockApi
            });
        });

        after(() => {
            TestUtils.shutdownMocks();
        });

        beforeEach(() => {
            instance = ReactTestUtils.renderIntoDocument(
                TestUtils.wrapComponentWithProvider(
                    <PasswordFormPage params={{token: 'example-token'}} />
                )
            );
        });

        it('calls checkPasswordResetToken when first rendered', () => {
            // instantiated in beforeEach
            TestUtils.expectLastCall(mockApi,
                'checkPasswordResetToken', ['example-token']);
        });
        it('renders a form with two password fields', (done) => {
            mockApi.getLastCall().promiseResolver.resolve();
            setImmediate(() => {
                const passwordFields = TestUtils.findRenderedDOMElementsBySelector(instance,
                    'form input[type=password]');
                expect(passwordFields.length).toBe(2);
                done();
            });
        });
        it('requires passwords to be identical', (done) => {
            mockApi.getLastCall().promiseResolver.resolve();
            setImmediate(() => {
                const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
                TestUtils.changeFormFields(form, {
                    password: 'changeme',
                    confirmPassword: 'random value'
                });
                ReactTestUtils.Simulate.submit(form);

                const emailErrors = TestUtils.findRenderedDOMElementsWithText(instance,
                    'nobody@nowhere.com');
                expect(emailErrors).toExist();
                done();
            });
        });
        it('calls backend function with provided token and password', (done) => {
            mockApi.getLastCall().promiseResolver.resolve();
            setImmediate(() => {
                const form = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'form');
                TestUtils.changeFormFields(form, {
                    password: 'changeme',
                    confirmPassword: 'changeme'
                });
                ReactTestUtils.Simulate.submit(form);

                TestUtils.expectLastCall(mockApi,
                    'performPasswordReset', ['example-token', 'changeme']);
                done();
            });
        });
        it('displays success message on submission');
    });
});
