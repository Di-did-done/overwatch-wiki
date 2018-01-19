import '../vendor';

import * as angular from 'angular';

import { createEpicMiddleware } from 'redux-observable';

import { ngReduxModule } from './core/redux';

import { CoreModuleAjs } from './core';

import { HeroesModule } from './modules/heroes';

import { appReducer } from './app.reducer';
import { AppRoutesConfig } from './app.routes';
import { appEffects } from './app.effects';


export const AppModuleAjs = angular
    .module('app', [
        'ngAnimate',
        'ngMaterial',
        'ui.router',

        ngReduxModule.name,

        CoreModuleAjs.name,

        HeroesModule.name
    ])

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
