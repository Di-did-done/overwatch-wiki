import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as ActionTypes from './constants';
import { LoadMapsErrorAction, LoadMapsSuccessAction } from './actions';

import { MapsApiService } from '../../services/maps.api.service';
import { MapModel } from '../../models/map.model';


@Injectable()
export class MapsEffects {
    constructor(
        private actions$: Actions,
        private mapsApiService: MapsApiService
    ) {}

    @Effect()
    loadMaps$ = this.actions$.ofType(ActionTypes.REQUEST_MAPS).pipe(
        switchMap(() => {
            return this.mapsApiService
                .getList()
                .pipe(
                    map((maps: MapModel[]) => new LoadMapsSuccessAction(maps)),
                    catchError((error) => of(new LoadMapsErrorAction(error)))
                );
        })
    );
}
