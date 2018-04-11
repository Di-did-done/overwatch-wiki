// tslint:disable:max-classes-per-file
import { Directive, ElementRef, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { UpgradeComponent } from '@angular/upgrade/static';

import { AppComponent } from './app.component';


@Directive({ selector: 'angularjs-router-outlet' })
export class AngularjsRouterOutletDirective extends UpgradeComponent {
    constructor(ref: ElementRef, injector: Injector) {
        super('angularjsRouterOutlet', ref, injector);
    }
}

@NgModule({
    imports: [
        BrowserModule,

        RouterModule.forRoot([]),

        MatToolbarModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        AngularjsRouterOutletDirective
    ],
    entryComponents: [
        AppComponent
    ]
})
export class AppModule {
    // tslint:disable:no-empty
    ngDoBootstrap() {}
}
