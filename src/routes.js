import React from 'react';
import {Route, IndexRoute} from 'react-router';

import HomePage from 'components/pages/HomePage';
import AboutPage from 'components/pages/AboutPage';
import EmailFormPage from 'components/pages/ForgotPassword/EmailFormPage';
import PasswordFormPage from 'components/pages/ForgotPassword/PasswordFormPage';
import NotFoundPage from 'components/pages/NotFoundPage';

export default (
    <Route path="/">
        <IndexRoute component={HomePage} />
        <Route path="about" component={AboutPage} />
        <Route path="forgot-password" component={EmailFormPage} />
        <Route path="forgot-password/reset/:token" component={PasswordFormPage} />
        <Route path="*" status={404} component={NotFoundPage} />
    </Route>
);
