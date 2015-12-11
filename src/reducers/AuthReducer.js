import {
    LOGIN_ATTEMPT, LOGIN_SUCCESS,
    LOGIN_FAILURE, LOGOUT
} from 'actions/AuthActions';

const defaultState = {
    username: null,
    isLoggedIn: false,
    isAuthorizing: false
};

export default function auth(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_ATTEMPT:
            return {
                isAuthorizing: true,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                username: action.payload.username,
                isAuthorizing: false,
                isLoggedIn: true
            };
        case LOGIN_FAILURE:
            return {
                username: null,
                isAuthorizing: false,
                isLoggedIn: false,
                error: action.payload.message
            };
        case LOGOUT:
            return {
                username: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
