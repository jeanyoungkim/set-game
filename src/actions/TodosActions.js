export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';

// TODO: Use redux-actions to reduce this boilerplate
// and to enforce FSA, https://github.com/acdlite/flux-standard-action

export function addTodo(summary) {
    return {
        type: ADD_TODO,
        payload: {
            summary
        }
    };
}

export function editTodo(index, done, summary) {
    return {
        type: EDIT_TODO,
        payload: {
            index,
            done,
            summary
        }
    };
}
