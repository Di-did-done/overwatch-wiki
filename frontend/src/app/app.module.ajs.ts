import angular from 'angular';
import { createEpicMiddleware } from 'redux-observable';

import { ngReduxModule } from './core/redux';

import { CoreModule } from './core';

import { HeroesModule } from './modules/heroes';
import { MapsModule } from './modules/maps';

import { appReducer } from './app.reducer';
import { AppRoutesConfig } from './app.routes';
import { appEffects } from './app.effects';


export const AppModuleAjs = angular
    .module('app', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',

        ngReduxModule.name,

        CoreModule.name,

        HeroesModule.name,
        MapsModule.name
    ])

    .component('angularjsRouterOutlet', { template: '<ui-view class="layout-column flex"></ui-view>' })

    .config([
        ...AppRoutesConfig
    ])

    .config(['$ngReduxProvider',
        ($ngReduxProvider) => {
            $ngReduxProvider.createStoreWith(
                { app: appReducer },
                ['apiMiddleware', createEpicMiddleware(appEffects)],
                [window.devToolsExtension ? window.devToolsExtension() : (f) => f]
            );
        }]);
