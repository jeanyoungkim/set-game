export default function composeValidationFn(validations) {
    return (data) => {
        const errors = {};
        validations.forEach(({name, error, validate}) => {
            const validationResult = validate(data[name], data);
            if (validationResult === false) {
                errors[name] = error || 'invalid field value';
            } else if (typeof validationResult === 'object') {
                for (const key in validationResult) {
                    if (validationResult.hasOwnProperty(key)) {
                        errors[key] = validationResult[key];
                    }
                }
            }
        });
        return errors;
    };
}
