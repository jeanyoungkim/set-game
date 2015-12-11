// TODO: remove after revisiting API layer

export default (methodList) => {
    const calls = [];
    const apiInstance = {
        getLastCall: () => {
            if (calls.length === 0) {
                return null;
            }
            return calls[calls.length - 1];
        }
    };
    methodList.forEach((methodName) => {
        apiInstance[methodName] = (...params) => {
            const promiseResolver = {};
            const promiseResolverFn = (resolve, reject) => {
                promiseResolver.resolve = resolve;
                promiseResolver.reject = reject;
            };
            const call = {
                methodName: methodName,
                params: params,
                promise: new Promise(promiseResolverFn),
                promiseResolver: promiseResolver
            };
            calls.push(call);
            return call.promise;
        };
    });
    return apiInstance;
};
