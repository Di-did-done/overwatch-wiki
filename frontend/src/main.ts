import * as angular from 'angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { downgradeComponent, downgradeModule } from '@angular/upgrade/static';
import { StaticProvider } from '@angular/core';

import './polyfills';
import './vendor';

import { AppModule, AppModuleAjs } from './app';
import { AppComponent } from './app/app.component';


function bootstrapModule(extra: StaticProvider[]) {
    return platformBrowserDynamic(extra).bootstrapModule(AppModule);
}

const downgraded = angular
    .module('downgraded', [downgradeModule(bootstrapModule)])
    .directive('app', downgradeComponent({ component: AppComponent }));

angular.bootstrap(document.body, [AppModuleAjs.name, downgraded.name]);
