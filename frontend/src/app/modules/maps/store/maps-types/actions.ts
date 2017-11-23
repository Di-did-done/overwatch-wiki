import * as ActionTypes from './constants';

export const loadMapsTypesAction = () => ({
    callApi: {
        types: [
            ActionTypes.REQUEST_MAPS_TYPES_START,
            ActionTypes.REQUEST_MAPS_TYPES_SUCCESS,
            ActionTypes.REQUEST_MAPS_TYPES_ERROR
        ],
        serviceName: 'MapsTypesApiService',
        method: 'getList'
    }
});
