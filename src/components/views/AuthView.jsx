import React, {PropTypes} from 'react';
import classnames from 'classnames';
import TextBox from 'components/pure/TextBox';

import {connect} from 'react-redux';
import * as AuthActions from 'actions/AuthActions';


@connect(
    state => ({auth: state.auth}),
    AuthActions
)
export default class AuthView extends React.Component {
    static propTypes = {
        loginSuccess: PropTypes.func.isRequired,
        loginAttempt: PropTypes.func.isRequired,
        loginFailure: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        auth: PropTypes.shape({
            username: PropTypes.string,
            error: PropTypes.string,
            isAuthorizing: PropTypes.bool,
            isLoggedIn: PropTypes.bool
        }).isRequired
    }

    onLoginSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        this.props.loginAttempt(form.username.value, form.password.value);
    }

    onLogoutClick = (event) => {
        event.preventDefault();
        this.props.logout();
    }

    render() {
        const {auth} = this.props;
        return (
            <div className={classnames({
                AuthForm: true,
                AuthForm_isWaiting: auth.isAuthorizing,
                AuthForm_isLoggedIn: auth.isLoggedIn
            })}>
                {auth.isAuthorizing ? (
                    <span>Logging in...</span>
                ) : (auth.isLoggedIn ? (
                        <div>
                            <span>Hi, {auth.username}!</span>
                            &nbsp;
                            <a href="" onClick={this.onLogoutClick}>Logout</a>
                        </div>
                    ) : (
                        <div>
                            {auth.error ? <span>{auth.error}</span> : <span></span>}
                            <form ref="loginForm" onSubmit={this.onLoginSubmit} className="form-group">
                                <fieldset className="form-group">
                                    <label>Username</label>
                                    <TextBox name="username" type="text" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Password </label>
                                    <TextBox name="password" type="password"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>
                                        <input name="remember" type="checkbox"/> remember me
                                    </label>
                                </fieldset>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    )
                )}
            </div>
        );
    }
}
