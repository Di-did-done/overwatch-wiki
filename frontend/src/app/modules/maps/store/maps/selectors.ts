import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';

import { MapsState } from './reducer';
import { getMapsState } from '../maps.state';
import { MapModel } from '../../models/map.model';


export const getMapsLoading = createSelector(
    getMapsState,
    (state: MapsState) => state.loading
);

export const getMapsEntities = createSelector(
    getMapsState,
    (state: MapsState) => state.entities
);

export const getMapsByType = createSelector(
    getMapsEntities,
    (mapsEntities: { [id: string]: MapModel }) => _.groupBy(mapsEntities, 'type')
);
