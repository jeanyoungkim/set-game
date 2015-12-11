# forms

Convenient form composition library for React.
Implementation based on `redux-form`.
Early development state.

## Features
1. Simple form definition with JSX.
2. Free-form markup around fields.
3. Flexible validation (sync and async, field-based and form-based TBD) and error display.

## Examples

### LoginForm
```js
import React, {Component} from 'react';

import Form from 'shared/forms/Form';
import EmailField from 'shared/forms/EmailField';
import PasswordField from 'shared/forms/PasswordField';
import SubmitButton from 'shared/forms/SubmitButton';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            email: null
        };
    }

    submit(data) {
        setTimeout(() => {
            this.setState({
                logged: true,
                email: data.email
            });
        }, 1000);
    }

    render() {
        if (this.state.logged) {
            return <p>Logged as {this.state.email}.</p>;
        }

        return (
            <Form name="LoginForm" submit={this.submit.bind(this)}>
                <EmailField />
                <PasswordField />
                <SubmitButton />
            </Form>
        );
    }
}
```

### NewPasswordForm
```js
import React, {Component, PropTypes} from 'react';
import Form from 'shared/forms/Form';
import PasswordField from 'shared/forms/PasswordField';
import SubmitButton from 'shared/forms/SubmitButton';
import validateSameAs from 'shared/forms/validators/validateSameAs';

export default class NewPasswordForm extends Component {
    render() {
        return (
            <Form name="NewPasswordForm">
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
    }
}
```

## Gotchas
1. Hot module reloading don't work. Internally Form class composes a class for redux-form. This kind of implementation is not compatible with hot module reload. Should be revisited eventually.
2. Form fields can't be transparently encapsulated (hidden) inside another components. In general, all fields should be defined in one same tree with Form component.

## Dependencies
This library depends on `redux-form`.
`redux-form` in turn needs to be bootstrapped properly.

## Next steps
0. Switch to newer version of redux-form.
1. Develop more form components: select, checkbox.
2. Write robust test suite.
3. Enhance validation function compositing.
4. Write more examples.
5. Implement dynamic form fields.
