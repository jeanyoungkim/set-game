import {REQUEST_PASSWORD_RESET, START, DONE} from 'actions/types';
import * as states from 'reducers/ForgotPassword/ForgotPasswordStates';

const defaultState = {
    email: null,
    state: states.EMAIL_FORM
};

export default (prevState = defaultState, action) => {
    switch (action.type) {
        case REQUEST_PASSWORD_RESET:
            if (action.error) {
                return {
                    ...prevState,
                    state: states.EMAIL_FORM_FAILED
                };
            }
            switch (action.sequence.type) {
                case START:
                    return prevState;
                case DONE:
                    return {
                        ...prevState,
                        state: states.EMAIL_FORM_SUBMITTED,
                        email: action.payload.email
                    };
                default:
                    return prevState;
            }
            break;
        default:
            return prevState;
    }
};
