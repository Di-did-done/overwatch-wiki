import * as angular from 'angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './polyfills';
import './vendor';

import { AppModule, AppModuleAjs } from './app';
import { downgradeModule } from '@angular/upgrade/static';
import { StaticProvider } from '@angular/core';


function bootstrapModule(extra: StaticProvider[]) {
    return platformBrowserDynamic(extra).bootstrapModule(AppModule);
}

const downgraded = angular
    .module('downgraded', [downgradeModule(bootstrapModule)]);

angular.bootstrap(document.body, [AppModuleAjs.name, downgraded.name]);
