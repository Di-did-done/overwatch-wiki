import * as ActionTypes from './constants';

import { MapModel } from '../../models/map.model';


interface MapsState {
    loadingMaps: boolean;
    listById: {
        [mapId: string]: MapModel;
    };
}

const INITIAL_STATE: MapsState = {
    loadingMaps: false,
    listById: {}
};

export const mapsReducer = (state: MapsState = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.REQUEST_MAPS_START: {
            return {
                ...state,
                loading: true
            };
        }
        case ActionTypes.REQUEST_MAPS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case ActionTypes.REQUEST_MAPS_SUCCESS: {
            const maps = payload.apiResponse;
            const listById = {};

            maps.forEach((map: MapModel) => {
               listById[map.id] = map;
            });

            return {
                ...state,
                listById,
                loading: false
            };
        }
        default:
            return state;
    }
};
