import {ADD_TODO, EDIT_TODO} from 'actions/TodosActions';

export default function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                summary: action.payload.summary,
                done: false
            }];
        case EDIT_TODO:
            // return [...state.slice(0, action.payload.index),
            //     Object.assign({}, state[action.payload.index], {
            //         summary: action.payload.summary,
            //         done: action.payload.done
            //     }),
            //     ...state.slice(action.payload.index + 1)
            // ];

            return [...state].fill({
                ...state[action.payload.index],
                summary: action.payload.summary,
                done: action.payload.done
            }, action.payload.index, action.payload.index + 1);
        default:
            return state;
    }
}
