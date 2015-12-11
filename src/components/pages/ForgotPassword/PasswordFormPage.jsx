import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import * as PasswordFormActions from 'actions/ForgotPassword/PasswordFormActions';
import * as states from 'reducers/ForgotPassword/ForgotPasswordStates';
import {CHECK_PASSWORD_RESET_TOKEN} from 'actions/types';
import {registerAsyncActions} from 'lib/AsyncRegister';

import DefaultLayout from 'components/layouts/DefaultLayout';
import Form from 'shared/forms/Form';
import PasswordField from 'shared/forms/fields/PasswordField';
import SubmitButton from 'shared/forms/controls/SubmitButton';
import {validateSameAs} from 'shared/forms/validators/common';
import Message from 'components/pure/Message';
import LoadingIndicator from 'components/pure/LoadingIndicator';

@registerAsyncActions(CHECK_PASSWORD_RESET_TOKEN)
@connect(
    state => state.forgotPasswordPasswordForm,
    PasswordFormActions
)
export default class PasswordFormPage extends Component {
    static propTypes = {
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired,

        state: PropTypes.string.isRequired,

        checkPasswordResetToken: PropTypes.func.isRequired,
        performPasswordReset: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        if (this.props.state === states.PASSWORD_FORM_VISIT) {
            this.props.checkPasswordResetToken(this.props.params.token);
        }
    }

    getInnerComponent() {
        switch (this.props.state) {
            case states.PASSWORD_FORM_VISIT:
            case states.CHECKING_TOKEN:
                return <LoadingIndicator />;
            case states.INVALID_TOKEN:
                return (
                    <Message>
                        Invalid password reset token.
                        Please restart forgot password process.
                    </Message>
                );
            case states.PASSWORD_FORM:
                return (
                    <Form name="PasswordForm" submit={data => {
                        this.props.performPasswordReset(this.props.params.token, data.password);
                    }}>
                        <PasswordField
                            help="Enter new and secure password :)"
                            placeholder="New password"
                        />
                        <PasswordField
                            name="confirmPassword"
                            placeholder="Confirm password"
                            validate={validateSameAs('password')}
                            error="Passwords must match."
                        />
                        <SubmitButton />
                    </Form>
                );
            case states.PASSWORD_IS_SET:
                return (
                    <Message>
                        Congratulations!
                        Password successfully set.
                    </Message>
                );
            case states.PASSWORD_FORM_FAILED:
                return (
                    <Message>
                        Failed to set new password.
                        Please try again later or contact Customer Care.
                    </Message>
                );
            default:
                throw new Error('invalid state provided');
        }
    }

    render() {
        return (
            <DefaultLayout>
                {this.getInnerComponent()}
            </DefaultLayout>
        );
    }
}
