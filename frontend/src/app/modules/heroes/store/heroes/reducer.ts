import * as ActionTypes from './constants';
import { Hero } from '../../models/hero.model';

interface HeroesState {
    loading: boolean;
    listById: {
        [heroId: string]: Hero
    };
    selectedId: string;
}

const INITIAL_STATE: HeroesState = {
    loading: false,
    listById: {},
    selectedId: undefined
};

export const heroesReducer = (state: HeroesState = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.REQUEST_HEROES_START: {
            return {
                ...state,
                loading: true
            };
        }
        case ActionTypes.REQUEST_HEROES_SUCCESS: {
            const heroes = payload.apiResponse;
            const listById: {
                [heroId: string]: Hero
            } = {};

            heroes.forEach((hero) => {
                listById[hero.id] = hero;
            });

            return {
                ...state,
                listById,
                loading: false
            };
        }
        case ActionTypes.REQUEST_HEROES_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case ActionTypes.SELECT_HERO: {
            return {
                ...state,
                selectedId: payload.selectedHeroId
            };
        }
        default:
            return state;
    }
};
