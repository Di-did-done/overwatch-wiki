import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpService } from '../../../core/services/base-http.service';
import { MapType } from '../models/map-type.model';


@Injectable()
export class MapsTypesApiService {
    url: string = '/maps/types';

    constructor(private baseHttpService: BaseHttpService) {}

    getList(): Observable<MapType[]> {
        return this.baseHttpService.getList(this.url);
    }
}
