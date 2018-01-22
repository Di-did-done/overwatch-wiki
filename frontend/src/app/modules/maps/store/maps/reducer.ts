import { MapModel } from '../../models/map.model';

import * as ActionTypes from './constants';
import { MapsActions } from './actions';


export interface MapsState {
    loading: boolean;
    entities: {
        [mapId: string]: MapModel;
    };
}

const INITIAL_STATE: MapsState = {
    loading: false,
    entities: {}
};

export const mapsReducer = (state: MapsState = INITIAL_STATE, action: MapsActions): MapsState => {
    switch (action.type) {
        case ActionTypes.REQUEST_MAPS: {
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
            const maps = action.payload;
            const entities = maps.reduce(
                (mapsById: { [mapId: string]: MapModel }, map: MapModel) => {
                    return {
                        ...mapsById,
                        [map.id]: map
                    };
                },
                {}
            );

            return {
                ...state,
                entities,
                loading: false
            };
        }
        default:
            return state;
    }
};
