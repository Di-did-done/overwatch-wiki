import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { MapType } from '../../models/map-type.model';

import * as ActionTypes from './constants';
import { MapsTypesActions } from './actions';


export interface MapsTypesState extends EntityState<MapType> {
    loading: boolean;
}

export const mapsTypesAdapter: EntityAdapter<MapType> = createEntityAdapter<MapType>();

export const INITIAL_STATE: MapsTypesState = mapsTypesAdapter.getInitialState({
    loading: false
});

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
            const mapsTypes = action.payload;

            return mapsTypesAdapter.addAll(mapsTypes, {
                ...state,
                loading: false
            });
        }
        default:
            return state;
    }
};
