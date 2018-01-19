import { Injectable } from '@angular/core';

import { BaseHttpService } from '../../../core/services/base-http.service';

@Injectable()
export class MapsTypesApiService {
    url: string = '/maps/types';

    constructor(private baseHttpService: BaseHttpService) {}

    getList() {
        return this.baseHttpService.getList(this.url);
    }
}
