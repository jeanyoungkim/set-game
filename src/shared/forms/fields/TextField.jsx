import React from 'react';
import Field from '../Field';
import cx from 'classnames';

export default class TextField extends Field {
    render() {
        const fieldName = this.props.name;
        const field = this.context.fields[fieldName];
        const additionalFieldProps = {};
        if (this.props.placeholder) {
            additionalFieldProps.placeholder = this.props.placeholder;
        }
        if (this.props.type) {
            additionalFieldProps.type = this.props.type;
        }
        return (
            <fieldset className={cx({
                'form-group': true,
                'has-error': field.touched && field.error
            })}>
                {this.props.help && <small className="text-muted">{this.props.help}</small>}
                <input {...field} className="form-control" {...additionalFieldProps} />
                {field.touched && field.error &&
                    <p className="text-danger" data-error-for-field={fieldName}>{field.error}</p>
                }
            </fieldset>
        );
    }
}
