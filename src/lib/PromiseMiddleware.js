/**
 * PromiseMiddleware
 *
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 * It also generates a unique ID for the special meta sequence object
 * that it attaches to the action, see issue#7 in flux-standard-action,
 * https://github.com/acdlite/flux-standard-action/issues/7
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 *
 */
export const START = 'START';
export const DONE = 'DONE';

function generateRandomId() {
    return Math.random().toString(36).slice(-5);
}

function sequence(id, type) {
    return {
        sequence: {id, type}
    };
}

export default function PromiseMiddleware() {
    return next => action => {
        const {promise, ...rest} = action;
        const id = generateRandomId();

        if (!promise) {
            return next(action);
        }

        next({...rest, ...sequence(id, START)});
        return promise.then(
            payload => next({...rest, payload, ...sequence(id, DONE)}),
            error => next({...rest, payload: new Error(error), error: true, ...sequence(id)})
        );
    };
}
