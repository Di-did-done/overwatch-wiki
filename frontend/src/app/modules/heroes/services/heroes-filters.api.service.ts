import { BaseHttpService } from '../../../core/services/base-http.service';

export class HeroesFiltersApiService {
    url: string = '/heroes/filters';

    constructor(public BaseHttpService: BaseHttpService) {}

    getList() {
        return this.BaseHttpService.getList(this.url);
    }
}

HeroesFiltersApiService.$inject = ['BaseHttpService'];
