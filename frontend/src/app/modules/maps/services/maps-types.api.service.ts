import { BaseHttpService } from '../../../core/services/base-http.service';

export class MapsTypesApiService {
    url: string = '/maps/types';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList() {
        return this.BaseHttpService.getList(this.url).then((response) => {
            return response.data;
        });
    }
}

MapsTypesApiService.$inject = ['BaseHttpService'];
