// tslint:disable:max-classes-per-file
import { NgModule, Component, Directive, ElementRef, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeComponent } from '@angular/upgrade/static';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';

import { ngReduxProvider } from './ajs-upgraded-providers';

import { CoreModule } from './core';

import { MapsModule } from './modules/maps';

import { AppComponent } from './app.component';


@Component({ selector: 'app-empty-element', template: '' })
export class EmptyComponent {}

@Directive({ selector: 'angularjs-router-outlet' })
export class AngularJSRouterOutletDirective extends UpgradeComponent {
    constructor(ref: ElementRef, inj: Injector) {
        super('angularjsRouterOutlet', ref, inj);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            [
                {
                    path: '', redirectTo: '/heroes', pathMatch: 'full'
                },
                {
                    path: 'maps',
                    loadChildren: './modules/maps/maps.module#MapsModule'
                },
                {
                    path: '**',
                    component: EmptyComponent
                }
            ],
            {
                useHash: true
            }
        ),

        MatToolbarModule,
        MatButtonModule,

        CoreModule,

        MapsModule
    ],
    providers: [
        ngReduxProvider
    ],
    declarations: [
        AppComponent,
        AngularJSRouterOutletDirective,
        EmptyComponent
    ],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
    constructor(router: Router) {
        router.initialNavigation();
    }

    // tslint:disable:no-empty
    ngDoBootstrap() {
    }
}
