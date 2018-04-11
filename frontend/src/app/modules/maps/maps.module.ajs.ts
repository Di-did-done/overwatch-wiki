import angular from 'angular';
import { downgradeComponent } from '@angular/upgrade/static';
import { combineReducers } from 'redux';

import { MapsPageComponent } from './routes';

import { MapsRoutesConfig } from './maps.routes';
import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';
import { mapsReducer } from './store/maps/reducer';
import { mapsTypesReducer } from './store/maps-types/reducer';


export const MapsModuleAjs = angular
    .module('app.maps', [])

    .directive('mapsPage', downgradeComponent({ component: MapsPageComponent }))

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
