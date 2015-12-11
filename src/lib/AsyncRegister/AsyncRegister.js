/**
* AsyncRegister
*
**/

export default function AsyncRegister() {
    const registeredActions = new Set();
    const promises = [];

    return {
        register(actionType) {
            registeredActions.add(actionType);
        },

        getRegisteredActions() {
            return registeredActions;
        },

        isRegistered(actionType) {
            return registeredActions.has(actionType);
        },

        collectPromise(promise) {
            promises.push(promise);
        },

        getAllPromises() {
            return promises;
        }
    };
}
