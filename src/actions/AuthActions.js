import AuthService from 'services/AuthService';

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function loginSuccess(username) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            username
        }
    };
}

export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: new Error(error),
        error: true
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}

function attemptLogin() {
    return {
        type: LOGIN_ATTEMPT
    };
}

export function loginAttempt(username, password) {
    return (dispatch /*, getState */) => {
        dispatch(attemptLogin()); // dispatch state so UI can render spinner
        return AuthService
            .login(username, password)
            .then(res => {
                dispatch(loginSuccess(res.data.username));
            })
            .catch(err => {
                dispatch(loginFailure(err));
            });
    };
}
