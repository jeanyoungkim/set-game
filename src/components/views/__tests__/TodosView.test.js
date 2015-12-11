import {assert} from 'chai';
import React from 'react';
import TodosView from 'components/views/TodosView';
import TestUtils from 'util/TestUtils';
import ReactTestUtils from 'react-addons-test-utils';

describe('TodosView', () => {
    let instance;

    before('Render TodosView', () => {
        instance = ReactTestUtils.renderIntoDocument(
            TestUtils.wrapComponentWithProvider(
                <TodosView />
            )
        );
    });

    it('renders div with Todos as a class', () => {
        const todos = TestUtils.findRenderedDOMElementsBySelector(instance, 'div.Todos');
        assert.isDefined(todos);
    });

    it('renders a form', () => {
        const form = TestUtils.findRenderedDOMElementsBySelector(instance, 'form');
        assert.isDefined(form);
    });
});
