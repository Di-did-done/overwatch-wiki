import { createSelector } from '@ngrx/store';
import { getMapsTypesState } from '../maps.state';
import { MapsTypesState } from './reducer';


export const getMapsTypesLoading = createSelector(
    getMapsTypesState,
    (state: MapsTypesState) => state.loading
);

export const getMapsTypes = createSelector(
    getMapsTypesState,
    (state: MapsTypesState) => state.list
);
