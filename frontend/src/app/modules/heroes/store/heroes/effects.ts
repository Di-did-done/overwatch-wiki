import { map } from 'rxjs/operators/map';

import { CHANGE_SELECTED_FILTERS } from '../filters/constants';
import { getSelectedFilters } from '../filters/selectors';

import { loadHeroesAction, selectHeroAction } from './actions';
import { REQUEST_HEROES_SUCCESS } from './constants';
import { getHeroes } from './selectors';


export const loadFilteredHeroesEffect = (action$, store) =>
    action$
        .ofType(CHANGE_SELECTED_FILTERS)
        .pipe(
            map(() => {
                const selectedFilters = getSelectedFilters(store.getState());

                return loadHeroesAction({
                    params: selectedFilters
                });
            })
        );

export const selectHeroAfterLoadingEffect = (action$, store) =>
    action$
        .ofType(REQUEST_HEROES_SUCCESS)
        .pipe(
            map(() => {
                const heroes = getHeroes(store.getState());

                return selectHeroAction(heroes.length ? heroes[0].id : undefined);
            })
        );
