import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseHttpService } from '../../../core/services/base-http.service';

import { MapModel } from '../models/map.model';


@Injectable()
export class MapsApiService {
    url: string = '/maps';

    constructor(private baseHttpService: BaseHttpService) {}

    getList(): Observable<MapModel[]> {
        return this.baseHttpService.getList<MapModel[]>(this.url);
    }
}
