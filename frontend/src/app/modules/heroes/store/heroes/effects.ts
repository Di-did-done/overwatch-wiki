import { map } from 'rxjs/operators/map';

import { CHANGE_SELECTED_FILTERS } from '../filters/constants';
import { getSelectedFilters } from '../filters/selectors';
import { loadHeroesAction } from './actions';

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
