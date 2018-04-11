import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { MapsPageComponent } from './routes';
import { MapsListComponent } from './containers';


@NgModule({
    imports: [
        CommonModule,

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

