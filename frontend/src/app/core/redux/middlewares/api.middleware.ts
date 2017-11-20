export const apiMiddleware = ($injector, $q) => {
    return (store) => (next) => (action) => {
        const { callApi, ...restAction } = action;

        if (!callApi) {
            return $q.when(next(action));
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

        return $q((resolve, reject) => {
            service[method](...params)
                .then((response) => {
                    const payload = {
                        apiResponse: response,
                        ...restAction.payload
                    };

                    resolve(payload);

                    return actionWith(successType, payload);
                })
                .catch((response: { data: { error: string } }) => {
                    const payload = {
                        error: response.data.error,
                        ...restAction.payload
                    };

                    reject(payload);

                    return actionWith(failureType, payload);
                });
        });
    };
};

apiMiddleware.$inject = [
    '$injector',
    '$q'
];

