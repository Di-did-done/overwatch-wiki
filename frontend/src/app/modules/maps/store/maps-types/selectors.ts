import { createSelector } from '@ngrx/store';

import { getMapsTypesState } from '../maps.state';
import { mapsTypesAdapter, MapsTypesState } from './reducer';


export const getMapsTypesLoading = createSelector(
    getMapsTypesState,
    (state: MapsTypesState) => state.loading
);

export const getMapsTypes = mapsTypesAdapter.getSelectors(getMapsTypesState).selectAll;
