import * as ActionTypes from './constants';
import { MapType } from '../../models/map-type.model';

interface MapsTypesState {
    loadingMaps: boolean;
    list: MapType[];
}

const INITIAL_STATE: MapsTypesState = {
    loadingMaps: false,
    list: []
};

export const mapsTypesReducer = (state: MapsTypesState = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.REQUEST_MAPS_TYPES_START: {
            return {
                ...state,
                loading: true
            };
        }
        case ActionTypes.REQUEST_MAPS_TYPES_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case ActionTypes.REQUEST_MAPS_TYPES_SUCCESS: {
            return {
                ...state,
                list: payload.apiResponse,
                loading: false
            };
        }
        default:
            return state;
    }
};
