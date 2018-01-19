import * as angular from 'angular';
import { combineReducers } from 'redux';

import { MapsRoutesConfig } from './maps.routes';
import { mapsReducer } from './store/maps/reducer';
import { mapsTypesReducer } from './store/maps-types/reducer';


export const MapsModuleAjs = angular
    .module('app.maps', [])

    .config([
        ...MapsRoutesConfig
    ])

    .run(['$ngRedux', ($ngRedux) => {
        $ngRedux.addReducer('mapsModule', combineReducers({
            maps: mapsReducer,
            types: mapsTypesReducer
        }));
    }]);
