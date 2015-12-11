export function validateRequired(value) {
    return !!value;
}

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export function validateEmail(email) {
    return EMAIL_REGEX.test(email);
}

export function validatePassword(password) {
    return !!password && password.length >= 6;
}

export function validateSameAs(sameAsField) {
    return (value, data) => {
        return value === data[sameAsField];
    };
}
