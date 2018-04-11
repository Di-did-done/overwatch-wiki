// tslint:disable:max-classes-per-file
import { Component, Directive, ElementRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { UpgradeComponent } from '@angular/upgrade/static';

import { AppComponent } from './app.component';
import { MapsModule } from './modules/maps';
import { ngReduxProvider } from './ajs-upgraded-provider';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-empty-component',
    template: ''
})
export class EmptyComponent {}


@Directive({ selector: 'angularjs-router-outlet' })
export class AngularjsRouterOutletDirective extends UpgradeComponent {
    constructor(ref: ElementRef, injector: Injector) {
        super('angularjsRouterOutlet', ref, injector);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,

        RouterModule.forRoot([
            { path: '', redirectTo: '/heroes', pathMatch: 'full' },
            { path: 'maps', loadChildren: './modules/maps/maps.module#MapsModule' },
            { path: '**', component: EmptyComponent }
        ], { useHash: true }),

        MatToolbarModule,
        MatButtonModule,

        MapsModule
    ],
    declarations: [
        AppComponent,
        AngularjsRouterOutletDirective,
        EmptyComponent
    ],
    entryComponents: [
        AppComponent
    ],
    providers: [
        ngReduxProvider
    ]
})
export class AppModule {
    constructor(router: Router) {
        router.initialNavigation();
    }
    // tslint:disable:no-empty
    ngDoBootstrap() {}
}
