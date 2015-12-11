import {Component, PropTypes} from 'react';

export default class Field extends Component {
    static contextTypes = {
        fields: PropTypes.object.isRequired
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        help: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        validate: PropTypes.func,
        error: PropTypes.string
    };
}
