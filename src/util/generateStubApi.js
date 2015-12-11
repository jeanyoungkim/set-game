// TODO: remove after revisiting API layer

export default (methodList) => {
    const apiInstance = {};
    methodList.forEach((methodName) => {
        apiInstance[methodName] = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 6000);
            });
        };
    });
    return apiInstance;
};
