import { BaseHttpService } from '../../../core/services/base-http.service.ajs';
import { Hero } from '../models/hero.model';

interface HeroesListResponse {
    data: Hero[];
}

interface HeroResponse {
    data: Hero;
}

export class HeroesApiService {
    url: string = '/heroes';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList(options) {
        return this.BaseHttpService.getList(this.url, options).then((response: HeroesListResponse) => {
            return response.data;
        });
    }

    getOne(id: string) {
        return this.BaseHttpService.getOne(this.url, id).then((response: HeroResponse) => {
            return response.data;
        });
    }
}

HeroesApiService.$inject = ['BaseHttpService'];
