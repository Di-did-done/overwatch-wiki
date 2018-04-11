import { Action } from '@ngrx/store';

import * as ActionTypes from './constants';
import { MapType } from '../../models/map-type.model';


export class LoadMapsTypesAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS_TYPES;
}

export class LoadMapsTypesSuccessAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS_TYPES_SUCCESS;

    constructor(public payload: MapType[]) {}
}

export class LoadMapsTypesErrorAction implements Action {
    readonly type = ActionTypes.REQUEST_MAPS_TYPES_ERROR;

    constructor(public payload: any) {}
}

export type MapsTypesActions = LoadMapsTypesAction | LoadMapsTypesSuccessAction | LoadMapsTypesErrorAction;
