import { BaseHttpService } from '../../../core/services/base-http.service';
import { Hero } from '../models/hero.model';

export class HeroesApiService {
    url: string = '/heroes';

    constructor(private BaseHttpService: BaseHttpService) {}

    getList(options): Promise<Hero[]> {
        return this.BaseHttpService.getList(this.url, options);
    }

    getOne(id: string): Promise<Hero> {
        return this.BaseHttpService.getOne(this.url, id);
    }
}

HeroesApiService.$inject = ['BaseHttpService'];
