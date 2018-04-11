import { BaseHttpService } from '../../../core/services/base-http.service.ajs';

export class HeroesFiltersApiService {
    url: string = '/heroes/filters';

    constructor(public BaseHttpService: BaseHttpService) {}

    getList() {
        return this.BaseHttpService.getList(this.url).then((response) => {
            return response.data;
        });
    }
}

HeroesFiltersApiService.$inject = ['BaseHttpService'];
