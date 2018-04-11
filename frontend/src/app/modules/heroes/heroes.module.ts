import angular from 'angular';
import { combineReducers } from 'redux';

import { effect$ } from '../../app.effects';

import { HeroesRoutesConfig } from './heroes.routes';

import { HeroesPageComponent } from './routes';
import { HeroesFiltersComponent, HeroesContainerComponent } from './containers';
import { HeroPreviewComponent, HeroesListComponent, HeroesGridComponent } from './components';

import { HeroesApiService } from './services/heroes.api.service';
import { HeroesFiltersApiService } from './services/heroes-filters.api.service';
import { heroesReducer } from './store/heroes/reducer';
import { filtersReducer } from './store/filters/reducer';
import { loadFilteredHeroesEffect, selectHeroAfterLoadingEffect } from './store/heroes/effects';


export const HeroesModule = angular
    .module('app.heroes', [
        'ui.grid',
        'ui.grid.selection'
    ])

    .component('heroesPage', HeroesPageComponent)

    .component('heroesContainer', HeroesContainerComponent)
    .component('heroesFilters', HeroesFiltersComponent)

    .component('heroPreview', HeroPreviewComponent)
    .component('heroesList', HeroesListComponent)
    .component('heroesGrid', HeroesGridComponent)

    .service('HeroesApiService', HeroesApiService)
    .service('HeroesFiltersApiService', HeroesFiltersApiService)

    .config([
        ...HeroesRoutesConfig
    ])

    .run(['$ngRedux', ($ngRedux) => {
        $ngRedux.addReducer('heroesModule', combineReducers({
            heroes: heroesReducer,
            filters: filtersReducer
        }));
    }]);

effect$.next(loadFilteredHeroesEffect);
effect$.next(selectHeroAfterLoadingEffect);
