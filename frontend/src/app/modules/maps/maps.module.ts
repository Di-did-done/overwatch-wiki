import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { MapsApiService } from './services/maps.api.service';
import { MapsTypesApiService } from './services/maps-types.api.service';

import { MapsListComponent } from './containers';
import { MapsPageComponent } from './routes';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,

        RouterModule.forChild([
            { path: '', component: MapsPageComponent }
        ]),

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
export class MapsModule {
}
