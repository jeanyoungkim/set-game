import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import * as EmailFormActions from 'actions/ForgotPassword/EmailFormActions';
import * as states from 'reducers/ForgotPassword/ForgotPasswordStates';

import DefaultLayout from 'components/layouts/DefaultLayout';
import Form from 'shared/forms/Form';
import EmailField from 'shared/forms/fields/EmailField';
import SubmitButton from 'shared/forms/controls/SubmitButton';
import Message from 'components/pure/Message';

@connect(
    state => state.forgotPasswordEmailForm,
    EmailFormActions
)
export default class EmailFormPage extends Component {
    static propTypes = {
        email: PropTypes.string,
        state: PropTypes.string.isRequired,

        requestPasswordReset: PropTypes.func.isRequired
    };

    getInnerComponent() {
        switch (this.props.state) {
            case states.EMAIL_FORM:
                return (
                    <Form name="EmailForm" submit={data => {
                        this.props.requestPasswordReset(data.email);
                    }}>
                        <EmailField
                            help="Enter your email address and we will send instructions to reset your password."
                        />
                        <SubmitButton />
                    </Form>
                );
            case states.EMAIL_FORM_SUBMITTED:
                return (
                    <Message>
                        Instructions were sent to {this.props.email}.
                    </Message>
                );
            case states.EMAIL_FORM_FAILED:
                return (
                    <Message>
                        Failed to request password reset.
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
