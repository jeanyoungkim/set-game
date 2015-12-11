import React, {Component, PropTypes} from 'react';
import inspectFields from './util/inspectFields';
import composeValidationFn from './util/composeValidationFn';
import composeReduxForm from './util/composeReduxForm';

export default class Form extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        children: PropTypes.node,
        validate: PropTypes.func,
        submit: PropTypes.func
    };

    constructor(props) {
        super(props);
        // TODO: ideally, we'd get rid of form class composition
        this.composeReduxForm();
    }

    composeReduxForm() {
        const formName = this.props.name;
        const {fieldNames, fieldValidations} = inspectFields(this.props.children);
        const validationFn = composeValidationFn(fieldValidations);
        this.ReduxForm = composeReduxForm(formName, fieldNames, validationFn);
    }

    render() {
        return <this.ReduxForm submit={this.props.submit} children={this.props.children} />;
    }
}
