import * as _ from 'lodash';
import { createSelector } from 'reselect';

export const getHeroesLoading = (state) => state.heroesModule.heroes.loading;
export const getHeroesById = (state) => state.heroesModule.heroes.listById;
export const getSelectedHeroId = (state) => state.heroesModule.heroes.selectedId;

export const getHeroes = createSelector(
    getHeroesById,
    (heroesById) => _.values(heroesById)
);

export const getSelectedHero = createSelector(
    getHeroesById, getSelectedHeroId,
    (heroesById, selectedHeroId) => heroesById[selectedHeroId]
);
