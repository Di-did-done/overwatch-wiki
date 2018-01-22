import { MapType } from '../../models/map-type.model';

import * as ActionTypes from './constants';
import { MapsTypesActions } from './actions';


export interface MapsTypesState {
    loading: boolean;
    list: MapType[];
}

const INITIAL_STATE: MapsTypesState = {
    loading: false,
    list: []
};

export const mapsTypesReducer = (state: MapsTypesState = INITIAL_STATE, action: MapsTypesActions) => {
    switch (action.type) {
        case ActionTypes.REQUEST_MAPS_TYPES: {
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
                list: action.payload,
                loading: false
            };
        }
        default:
            return state;
    }
};
