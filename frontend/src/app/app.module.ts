import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { ngReduxProvider } from './ajs-upgraded-providers';

import { AppModuleAjs } from './app.module.ajs';
import { CoreModule } from './core';

import { MapsModule } from './modules/maps';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        UpgradeModule,

        CoreModule,

        MapsModule
    ],
    providers: [
        ngReduxProvider
    ]
})
export class AppModule {
    constructor(private upgrade: UpgradeModule) {}

    ngDoBootstrap() {
        this.upgrade.bootstrap(document.body, [AppModuleAjs.name], { strictDi: true });
    }
}
