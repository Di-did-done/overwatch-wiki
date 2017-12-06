import { Injectable } from '@angular/core';

import { BaseHttpService } from '../../../core/services/base-http.service';
import { MapModel } from '../models/map.model';


@Injectable()
export class MapsApiService {
    url: string = '/maps';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList(): Promise<MapModel[]> {
        return this.BaseHttpService.getList(this.url);
    }
}
