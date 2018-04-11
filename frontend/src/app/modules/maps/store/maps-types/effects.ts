import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MapsTypesApiService } from '../../services/maps-types.api.service';
import { MapType } from '../../models/map-type.model';

import * as ActionTypes from './constants';
import { LoadMapsTypesErrorAction, LoadMapsTypesSuccessAction } from './actions';


@Injectable()
export class MapsTypesEffects {
    constructor(
        private actions$: Actions,
        private mapsTypesApiService: MapsTypesApiService
    ) {}

    @Effect()
    loadMapsTypes$ = this.actions$.ofType(ActionTypes.REQUEST_MAPS_TYPES).pipe(
        switchMap(() => {
            return this.mapsTypesApiService
                .getList()
                .pipe(
                    map((mapsTypes: MapType[]) => new LoadMapsTypesSuccessAction(mapsTypes)),
                    catchError((error) => of(new LoadMapsTypesErrorAction(error)))
                );
        })
    );
}
