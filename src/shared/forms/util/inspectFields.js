import React from 'react';
import Field from '../Field';

export default function inspectFields(children) {
    const fieldNames = [];
    const fieldValidations = [];

    const walkerFn = (child) => {
        if (child.type.prototype instanceof Field) {
            fieldNames.push(child.props.name);
            if (child.props.validate) {
                fieldValidations.push({
                    name: child.props.name,
                    error: child.props.error,
                    validate: child.props.validate
                });
            }
        }
        React.Children.forEach(child.props.children, walkerFn);
    };
    React.Children.forEach(children, walkerFn);

    return {
        fieldNames,
        fieldValidations
    };
}
