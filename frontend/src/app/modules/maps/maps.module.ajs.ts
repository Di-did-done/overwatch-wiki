import angular from 'angular';
import { combineReducers } from 'redux';

import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';
import { mapsReducer } from './store/maps/reducer';
import { mapsTypesReducer } from './store/maps-types/reducer';


export const MapsModuleAjs = angular
    .module('app.maps', [])

    .service('MapsApiService', MapsApiService)
    .service('MapsTypesApiService', MapsTypesApiService)

    .run(['$ngRedux', ($ngRedux) => {
        $ngRedux.addReducer('mapsModule', combineReducers({
            maps: mapsReducer,
            types: mapsTypesReducer
        }));
    }]);
