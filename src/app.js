import 'bootstrap/dist/css/bootstrap.min.css';

// React imports
import React from 'react';
import ReactDOM from 'react-dom';

// react-router imports
import Router from 'react-router';
import routes from './routes';
import {createHistory} from 'history';

// Redux imports
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

// App imports
import configureStore from 'store/configureStore';

const initialState = window.__INITIAL_STATE__; //eslint-disable-line
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <ReduxRouter>
            <Router history={createHistory()}>
                {routes}
            </Router>
        </ReduxRouter>
    </Provider>,
    document.getElementById('app')
);
