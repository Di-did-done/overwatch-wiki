export const apiMiddleware = ($injector) => {
    return (store) => (next) => (action) => {
        const { callApi, ...restAction } = action;

        if (!callApi) {
            return Promise.resolve(next(action));
        }

        const { types, method, serviceName, params } = callApi;
        const [requestType, successType, failureType] = types;

        const service = $injector.get(serviceName);

        if (!service || !service[method]) {
            return next(action);
        }

        const actionWith = (type, payload?) => next({
            type,
            payload
        });

        actionWith(requestType);

        return new Promise((resolve, reject) => {
            service[method](...params)
                .then((response) => {
                    const payload = {
                        apiResponse: response,
                        ...restAction.payload
                    };

                    resolve(payload);

                    return actionWith(successType, payload);
                })
                .catch((response: { error: string }) => {
                    const payload = {
                        error: response.error,
                        ...restAction.payload
                    };

                    reject(payload);

                    return actionWith(failureType, payload);
                });
        });
    };
};

apiMiddleware.$inject = [
    '$injector'
];

