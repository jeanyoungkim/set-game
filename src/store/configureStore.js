/* global __SERVER__ */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers/index';
import {createHistory} from 'history';
import {reduxReactRouter} from 'redux-router';
import routes from '../routes';
import {AsyncRegisterMiddleware} from 'lib/AsyncRegister';
import PromiseMiddleware from 'lib/PromiseMiddleware';


export default function configureStore(initialState, asyncRegister) {
    const middleware = applyMiddleware(
        PromiseMiddleware,
        thunk
    );

    const finalCreateStore = compose(
        middleware,
        reduxReactRouter({routes, createHistory})
    )(createStore);

    const finalCreateStoreServer = compose(
        applyMiddleware(AsyncRegisterMiddleware(asyncRegister)), // order matters
        middleware
    )(createStore);

    const createStoreLocal = __SERVER__ ? finalCreateStoreServer : finalCreateStore;
    const store = createStoreLocal(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
