import React, {Component, PropTypes} from 'react';

export default class Message extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className="Message">
                {this.props.children}
            </div>
        );
    }
}
