import './heroes-container.component.less';

import { loadHeroesAction, selectHeroAction } from '../../store/heroes/actions';
import { getHeroesLoading, getHeroes, getSelectedHeroId } from '../../store/heroes/selectors';
import { Hero } from '../../models/hero.model';


class HeroesContainerController {
    // Actions
    loadHeroesAction;
    selectHeroAction;

    // From Store
    heroes: Hero[];
    loading: boolean;

    // Local Variables
    viewMode: 'blocks' | 'grid' = 'blocks';
    unsubscribe: () => void;

    constructor($ngRedux) {
        this.unsubscribe = $ngRedux.connect(this.mapStateToThis, {
            loadHeroesAction,
            selectHeroAction
        })(this);
    }

    $onInit() {
        this.loadHeroesAction();
    }

    $onDestroy() {
        this.unsubscribe();
    }

    selectHero(heroId: string) {
        this.selectHeroAction(heroId);
    }

    setViewMode(mode) {
        this.viewMode = mode;
    }

    isActiveViewMode(mode): boolean {
        return this.viewMode === mode;
    }

    private mapStateToThis(state) {
        return {
            loading: getHeroesLoading(state),
            heroes: getHeroes(state),
            selectedHeroId: getSelectedHeroId(state)
        };
    }
}

HeroesContainerController.$inject = ['$ngRedux'];

export const HeroesContainerComponent = {
    controller: HeroesContainerController,
    template: require('./heroes-container.component.html')
};
