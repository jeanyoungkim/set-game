import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

export default class SubmitButton extends Component {
    static contextTypes = {
        submitting: PropTypes.bool
    };

    render() {
        return (
            <button
                type="submit"
                className={cx('btn', 'btn-primary', {
                    active: this.context.submitting
                })}
            >
                {this.context.submitting ?
                    'Submitting...'
                :
                    'Submit'
                }
            </button>
        );
    }
}
