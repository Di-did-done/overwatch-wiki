import './heroes-page.component.less';

import { getSelectedHero } from '../../store/heroes/selectors';
import { Hero } from '../../models/hero.model';

class HeroesPageController {
    // From Store
    selectedHero: Hero;

    // Local Variables
    unsubscribe: () => void;

    constructor($ngRedux) {
        this.unsubscribe = $ngRedux.connect(this._mapStateToThis)(this);
    }

    $onDestroy() {
        this.unsubscribe();
    }

    _mapStateToThis(state) {
        return {
            selectedHero: getSelectedHero(state)
        };
    }
}

HeroesPageController.$inject = ['$ngRedux'];

export const HeroesPageComponent = {
    controller: HeroesPageController,
    template: require('./heroes-page.component.html')
};
