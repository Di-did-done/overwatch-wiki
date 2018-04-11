import './heroes-list.component.less';

import { Hero } from '../../models/hero.model';

class HeroesListController {
    // @Input
    heroes: Hero[];
    selectedHeroId: number;

    // @Output
    onSelect;

    selectHero(heroId: string) {
        this.onSelect({ heroId });
    }
}

export const HeroesListComponent = {
    controller: HeroesListController,
    template: require('./heroes-list.component.html'),
    bindings: {
        heroes: '<',
        selectedHeroId: '<',
        onSelect: '&'
    }
};
