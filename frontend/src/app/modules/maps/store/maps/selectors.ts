import _ from 'lodash';
import { createSelector } from 'reselect';

export const getMapsLoading = (state) => state.mapsModule.maps.loading;
export const getMapsById = (state) => state.mapsModule.maps.listById;

export const getMapsByType = createSelector(
    getMapsById,
    (mapsById) => _.groupBy(mapsById, 'type')
);
