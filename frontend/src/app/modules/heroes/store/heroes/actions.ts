import * as ActionTypes from './constants';

export const loadHeroesAction = (options?) => ({
    callApi: {
        types: [
            ActionTypes.REQUEST_HEROES_START,
            ActionTypes.REQUEST_HEROES_SUCCESS,
            ActionTypes.REQUEST_HEROES_ERROR
        ],
        serviceName: 'HeroesApiService',
        method: 'getList',
        params: [options]
    }
});

export const selectHeroAction = (selectedHeroId) => ({
    type: ActionTypes.SELECT_HERO,
    payload: {
        selectedHeroId
    }
});
