import TextField from './TextField';
import {validateEmail} from '../validators/common';

export default class EmailField extends TextField {
    static defaultProps = {
        name: 'email',
        type: 'email',
        placeholder: 'Email Address',
        validate: validateEmail,
        error: 'Please provide valid email address'
    };
}
