import { BaseHttpService } from '../../../core/services/base-http.service.ajs';

export class HeroesFiltersApiService {
    url: string = '/heroes/filters';

    constructor(public baseHttpService: BaseHttpService) {}

    getList() {
        return this.baseHttpService.getList(this.url).then((response) => {
            return response.data;
        });
    }
}

HeroesFiltersApiService.$inject = ['BaseHttpService'];
