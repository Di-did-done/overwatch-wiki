import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import { mapsReducer, MapsState } from './maps/reducer';
import { mapsTypesReducer, MapsTypesState } from './maps-types/reducer';

export interface MapsModuleState {
    maps: MapsState;
    types: MapsTypesState;
}

export const reducers: ActionReducerMap<MapsModuleState> = {
    maps: mapsReducer,
    types: mapsTypesReducer
};

const getMapsModuleState = createFeatureSelector<MapsModuleState>('mapsModule');

export const getMapsState = createSelector(
    getMapsModuleState,
    (state: MapsModuleState) => state.maps
);

export const getMapsTypesState = createSelector(
    getMapsModuleState,
    (state: MapsModuleState) => state.types
);
