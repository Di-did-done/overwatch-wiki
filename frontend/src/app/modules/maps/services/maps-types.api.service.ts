import { Injectable } from '@angular/core';

import { BaseHttpService } from '../../../core/services/base-http.service';

@Injectable()
export class MapsTypesApiService {
    url: string = '/maps/types';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList(): Promise<string[]> {
        return this.BaseHttpService.getList(this.url);
    }
}
