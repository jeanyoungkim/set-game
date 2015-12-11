import {
    CHECK_PASSWORD_RESET_TOKEN,
    PERFORM_PASSWORD_RESET,
    START, DONE
} from 'actions/types';

import * as states from 'reducers/ForgotPassword/ForgotPasswordStates';

const defaultState = {
    state: states.PASSWORD_FORM_VISIT
};

export default (prevState = defaultState, action) => {
    switch (action.type) {
        case CHECK_PASSWORD_RESET_TOKEN:
            if (action.error) {
                return {
                    ...prevState,
                    state: states.INVALID_TOKEN
                };
            }
            switch (action.sequence.type) {
                case START:
                    return {
                        ...prevState,
                        state: states.CHECKING_TOKEN
                    };
                case DONE:
                    return {
                        ...prevState,
                        state: states.PASSWORD_FORM
                    };
                default:
                    return prevState;
            }
            break;
        case PERFORM_PASSWORD_RESET:
            if (action.error) {
                return {
                    ...prevState,
                    state: states.PASSWORD_FORM_FAILED
                };
            }
            switch (action.sequence.type) {
                case START:
                    return prevState;
                case DONE:
                    return {
                        ...prevState,
                        state: states.PASSWORD_IS_SET
                    };
                default:
                    return prevState;
            }
            break;
        default:
            return prevState;
    }
};
