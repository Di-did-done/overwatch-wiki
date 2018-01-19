import { Injectable } from '@angular/core';

import { BaseHttpService } from '../../../core/services/base-http.service';


@Injectable()
export class MapsApiService {
    url: string = '/maps';

    constructor(private baseHttpService: BaseHttpService) {}

    getList() {
        return this.baseHttpService.getList(this.url);
    }
}
