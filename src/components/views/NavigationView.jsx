import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

// bind dispatch to props
@connect()
class NavigationView extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    handleClick(event) {
        event.preventDefault();
        const {dispatch} = this.props;

        dispatch(pushState(null, '/about'));
    }
    render() {
        return (
            <div>
                <Link to="/about" activeClassName="active" onClick={this.handleClick.bind(this)}>About</Link>
            </div>
        );
    }
}

export default NavigationView;
