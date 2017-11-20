import angular from 'angular';
import { combineReducers } from 'redux';

import { HeroesRoutesConfig } from './heroes.routes';

import { HeroesPageComponent } from './routes';
import { HeroesListComponent, HeroesFiltersComponent } from './containers';

import { HeroesApiService } from './services/heroes.api.service';
import { HeroesFiltersApiService } from './services/heroes-filters.api.service';
import { heroesReducer } from './store/heroes/reducer';
import { filtersReducer } from './store/filters/reducer';
import { effect$ } from '../../app.effects';
import { loadFilteredHeroesEffect } from './store/heroes/effects';


export const HeroesModule = angular
    .module('app.heroes', [])

    .component('heroesPage', HeroesPageComponent)

    .component('heroesList', HeroesListComponent)
    .component('heroesFilters', HeroesFiltersComponent)

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
