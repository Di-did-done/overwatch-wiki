import _ from 'lodash';

import { loadFiltersAction, changeSelectedFiltersAction } from '../../store/filters/actions';
import { getFilters, getFiltersLoading, getSelectedFilters } from '../../store/filters/selectors';

class HeroesFiltersController {
    // Actions
    loadFiltersAction;
    changeSelectedFiltersAction;

    // From store
    filters;
    loading: boolean;
    selectedFilters;

    // Local Variables
    unsubscribe: () => void;

    constructor($ngRedux) {
        this.unsubscribe = $ngRedux.connect(this._mapStateToThis, {
            loadFiltersAction,
            changeSelectedFiltersAction
        })(this);
    }

    $onInit() {
        this.loadFiltersAction();
    }

    $onDestroy() {
        this.unsubscribe();
    }

    onChangeSelected() {
        this.changeSelectedFiltersAction(this.selectedFilters);
    }

    _mapStateToThis(state) {
        return {
            filters: getFilters(state),
            loading: getFiltersLoading(state),
            selectedFilters: _.cloneDeep(getSelectedFilters(state))
        };
    }
}

HeroesFiltersController.$inject = ['$ngRedux'];

export const HeroesFiltersComponent = {
    controller: HeroesFiltersController,
    template: require('./heroes-filters.component.html')
};
