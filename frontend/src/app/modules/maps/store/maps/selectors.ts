import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';

import { mapsAdapter, MapsState } from './reducer';
import { getMapsState } from '../maps.state';


export const getMapsLoading = createSelector(
    getMapsState,
    (state: MapsState) => state.loading
);

export const {
    selectEntities: getMapsEntities
} = mapsAdapter.getSelectors(getMapsState);

export const getMapsByType = createSelector(
    getMapsEntities,
    (mapsEntities) => _.groupBy(mapsEntities, 'type')
);
