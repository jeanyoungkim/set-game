import TextField from './TextField';
import {validatePassword} from '../validators/common';

export default class PasswordField extends TextField {
    static defaultProps = {
        name: 'password',
        type: 'password',
        placeholder: 'Enter password',
        validate: validatePassword,
        error: 'Password must be at least six characters long'
    };
}
