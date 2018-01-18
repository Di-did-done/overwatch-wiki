import { StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {downgradeComponent, downgradeModule } from '@angular/upgrade/static';

import * as angular from 'angular';

import './polyfills';
import './vendor';

import { AppModule } from './app';
import { AppModuleAjs } from './app/app.module.ajs';
import { AppComponent } from './app/app.component';


export function bootstrapAngular(extra: StaticProvider[]) {
    return platformBrowserDynamic(extra)
        .bootstrapModule(AppModule)
        .catch((err) => console.warn(err));
}

const downgraded = angular
    .module('downgraded', [downgradeModule(bootstrapAngular)])
    .directive('app', downgradeComponent({ component: AppComponent, propagateDigest: false }));

AppModuleAjs
    .component(
        'angularjsRouterOutlet',
        { template: '<ui-view class="flex layout-column layout-fill"></ui-view>' }
    );


angular.bootstrap(document, [AppModuleAjs.name, downgraded.name]);
