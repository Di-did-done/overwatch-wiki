import { BaseHttpService } from '../../../core/services/base-http.service';
import { MapModel } from '../models/map.model';

export class MapsApiService {
    url: string = '/maps';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList() {
        return this.BaseHttpService.getList(this.url).then((response) => {
            return response.data as MapModel[];
        });
    }

    getTypes() {
        return this.BaseHttpService.getList(`${this.url}/types`).then((response) => {
            return response.data;
        });
    }
}

MapsApiService.$inject = ['BaseHttpService'];
