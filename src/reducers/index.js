import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import {default as todos} from 'reducers/TodosReducer';
import {reducer as form} from 'redux-form';
import {default as auth} from 'reducers/AuthReducer';
import {default as forgotPasswordEmailForm} from 'reducers/ForgotPassword/EmailFormReducer';
import {default as forgotPasswordPasswordForm} from 'reducers/ForgotPassword/PasswordFormReducer';

export default combineReducers({
    todos,
    auth,
    router: routerStateReducer,
    form,
    forgotPasswordEmailForm,
    forgotPasswordPasswordForm
});
