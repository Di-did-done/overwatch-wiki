import angular from 'angular';
import { combineReducers } from 'redux';

import { MapsPageComponent } from './routes';
import { MapsListComponent } from './containers';

import { MapsRoutesConfig } from './maps.routes';
import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';
import { mapsReducer } from './store/maps/reducer';
import { mapsTypesReducer } from './store/maps-types/reducer';


export const MapsModule = angular
    .module('app.maps', [])

    .component('mapsPage', MapsPageComponent)

    .component('mapsList', MapsListComponent)

    .service('MapsApiService', MapsApiService)
    .service('MapsTypesApiService', MapsTypesApiService)

    .config([
        ...MapsRoutesConfig
    ])

    .run(['$ngRedux', ($ngRedux) => {
        $ngRedux.addReducer('mapsModule', combineReducers({
            maps: mapsReducer,
            types: mapsTypesReducer
        }));
    }]);
