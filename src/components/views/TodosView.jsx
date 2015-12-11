import React, {PropTypes} from 'react';
import 'styles/views/TodosView.scss';

import {connect} from 'react-redux';
import * as TodosActions from 'actions/TodosActions';

@connect(
    state => ({todos: state.todos}),
    TodosActions
)
export default class TodosView extends React.Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        editTodo: PropTypes.func.isRequired,
        todos: PropTypes.arrayOf(
            PropTypes.shape({
                summary: PropTypes.string.isRequired,
                done: PropTypes.bool.isRequired
            })
        ).isRequired
    };

    render() {
        const {todos, addTodo, editTodo} = this.props;

        return (
            <div className="Todos">
            <h4>Proverbial Todo List Example:</h4>
                <form className="Todos-newItemForm" onSubmit={(event) => {
                    event.preventDefault();
                    addTodo(event.target.summary.value);
                    event.target.reset(); // blank the input box by resetting the form
                }}>
                    <input type="text" name="summary"/>
                    <button>Add</button>
                </form>
                <ol className="Todos-items">
                    {todos.map((item, index) => {
                        return (
                            <li key={index}>
                                <label>
                                    <input type="checkbox" checked={item.done} onChange={() => {
                                        editTodo(index, !item.done, item.summary);
                                    }}/>
                                    &nbsp;
                                    <span>{item.summary}</span>
                                </label>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}
