import {REQUEST_PASSWORD_RESET} from 'actions/types';
import {default as api} from 'api/ForgotPasswordApi';

export function requestPasswordReset(email) {
    return {
        type: REQUEST_PASSWORD_RESET,
        promise: api.requestPasswordReset(email)
    };
}
