import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { MapsPageComponent } from './routes';
import { MapsListComponent } from './containers';
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
    declarations: [
        MapsPageComponent,
        MapsListComponent
    ],
    entryComponents: [
        MapsPageComponent
    ]
})
export class MapsModule {}

