import angular from 'angular';
import { combineReducers } from 'redux';
import { downgradeComponent, downgradeInjectable } from '@angular/upgrade/static';

import { MapsPageComponent } from './routes';

import { MapsRoutesConfig } from './maps.routes';
import { mapsReducer } from './store/maps/reducer';
import { mapsTypesReducer } from './store/maps-types/reducer';

import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';


export const MapsModuleAjs = angular
    .module('app.maps', [])

    .directive('mapsPage', downgradeComponent({ component: MapsPageComponent }))

    .service('MapsApiService', downgradeInjectable(MapsApiService))
    .service('MapsTypesApiService', downgradeInjectable(MapsTypesApiService))

    .config([
        ...MapsRoutesConfig
    ])

    .run(['$ngRedux', ($ngRedux) => {
        $ngRedux.addReducer('mapsModule', combineReducers({
            maps: mapsReducer,
            types: mapsTypesReducer
        }));
    }]);
