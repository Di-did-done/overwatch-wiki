import { enableProdMode, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { downgradeComponent, downgradeModule, setAngularJSGlobal } from '@angular/upgrade/static';

import * as angular from 'angular';

import { environment } from './environments/environment';

import { AppModule } from './app';
import { AppModuleAjs } from './app/app.module.ajs';
import { AppComponent } from './app/app.component';

setAngularJSGlobal(angular);

export function bootstrapAngular(extra: StaticProvider[]): any {
    if (environment.production) {
        enableProdMode();
    }

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
        { template: '<ui-view class="flex layout-column"></ui-view>' }
    );


angular.bootstrap(document, [AppModuleAjs.name, downgraded.name]);
