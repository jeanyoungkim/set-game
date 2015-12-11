import React, {Component, PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

export default function composeReduxForm(formName, fieldNames, validateForm) {
    @connectReduxForm({
        form: formName,
        fields: fieldNames,
        validate: validateForm
    })
    class ReduxForm extends Component {
        static propTypes = {
            submit: PropTypes.func,
            children: PropTypes.node,
            fields: PropTypes.object.isRequired,
            handleSubmit: PropTypes.func.isRequired,
            submitting: PropTypes.bool
        };

        static childContextTypes = {
            fields: PropTypes.object.isRequired,
            submitting: PropTypes.bool
        };

        getChildContext() {
            return {
                fields: this.props.fields,
                submitting: this.props.submitting
            };
        }

        render() {
            const {handleSubmit} = this.props;
            const formProps = {};
            if (this.props.submit) {
                formProps.onSubmit = handleSubmit(this.props.submit);
            }

            return (
                <form noValidate {...formProps}>
                    {this.props.children}
                </form>
            );
        }
    }

    return ReduxForm;
}
