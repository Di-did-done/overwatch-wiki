import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { MapModel } from '../../models/map.model';

import * as ActionTypes from './constants';
import { MapsActions } from './actions';


export interface MapsState extends EntityState<MapModel> {
    loading: boolean;
}

export const mapsAdapter: EntityAdapter<MapModel> = createEntityAdapter<MapModel>();

const INITIAL_STATE: MapsState = mapsAdapter.getInitialState({
    loading: false
});

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
            const maps: MapModel[] = action.payload;

            return mapsAdapter.addAll(maps, {
                ...state,
                loading: false
            });
        }
        default:
            return state;
    }
};
