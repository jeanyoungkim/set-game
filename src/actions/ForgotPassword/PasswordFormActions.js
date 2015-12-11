import {
    CHECK_PASSWORD_RESET_TOKEN,
    PERFORM_PASSWORD_RESET
} from 'actions/types';

import {default as api} from 'api/ForgotPasswordApi';

export function checkPasswordResetToken(token) {
    return {
        type: CHECK_PASSWORD_RESET_TOKEN,
        promise: api.checkPasswordResetToken(token)
    };
}

export function performPasswordReset(token, newPassword) {
    return {
        type: PERFORM_PASSWORD_RESET,
        promise: api.performPasswordReset(token, newPassword)
    };
}
