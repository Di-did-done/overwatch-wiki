import * as ActionTypes from './constants';

export const loadMapsAction = () => ({
    callApi: {
        types: [
            ActionTypes.REQUEST_MAPS_START,
            ActionTypes.REQUEST_MAPS_SUCCESS,
            ActionTypes.REQUEST_MAPS_ERROR
        ],
        serviceName: 'MapsApiService',
        method: 'getList'
    }
});
