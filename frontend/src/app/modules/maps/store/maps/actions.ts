import { Action } from '@ngrx/store';

import * as ActionTypes from './constants';
import { MapModel } from '../../models/map.model';


export class LoadMapsAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS;
}

export class LoadMapsSuccessAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS_SUCCESS;

    constructor(public payload: MapModel[]) {}
}

export class LoadMapsErrorAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS_ERROR;

    constructor(public payload: any) {}
}

export type MapsActions = LoadMapsAction | LoadMapsSuccessAction | LoadMapsErrorAction;
