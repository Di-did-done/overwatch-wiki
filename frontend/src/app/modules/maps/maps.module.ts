import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { MapsPageComponent } from './routes';
import { MapsListComponent } from './containers';
import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';

import { reducers } from './store/maps.state';
import { effects } from './store/maps.effects';


@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild([
            { path: '', component: MapsPageComponent }
        ]),

        StoreModule.forFeature('mapsModule', reducers),
        EffectsModule.forFeature(effects),

        MatProgressSpinnerModule,
        MatCardModule
    ],
    providers: [
        MapsApiService,
        MapsTypesApiService
    ],
    declarations: [
        MapsPageComponent,
        MapsListComponent
    ],
    entryComponents: [
        MapsPageComponent
    ]
})
export class MapsModule {}

