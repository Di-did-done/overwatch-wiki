import './heroes-list.component.less';

import { loadHeroesAction, selectHeroAction } from '../../store/heroes/actions';
import { getHeroes, getHeroesLoading, getSelectedHeroId } from '../../store/heroes/selectors';
import { Hero } from '../../models/hero.model';

class HeroesListController {
    // Actions
    loadHeroesAction;
    selectHeroAction;

    // From Store
    heroes: Hero[];
    loading: boolean;

    // Local Variables
    unsubscribe: () => void;

    constructor($ngRedux) {
        this.unsubscribe = $ngRedux.connect(this._mapStateToThis, {
            loadHeroesAction,
            selectHeroAction
        })(this);
    }

    $onInit() {
        this.loadHeroes();
    }

    $onDestroy() {
        this.unsubscribe();
    }

    loadHeroes() {
        this.loadHeroesAction().then(() => {
            if (this.heroes.length) {
                this.selectHero(this.heroes[0].id);
            }
        });
    }

    selectHero(heroId: string) {
        this.selectHeroAction(heroId);
    }

    _mapStateToThis(state) {
        return {
            loading: getHeroesLoading(state),
            heroes: getHeroes(state),
            selectedHeroId: getSelectedHeroId(state)
        };
    }
}

export const HeroesListComponent = {
    controller: HeroesListController,
    template: require('./heroes-list.component.html')
};
