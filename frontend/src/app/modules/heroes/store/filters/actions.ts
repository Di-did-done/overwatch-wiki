import * as ActionTypes from './constants';

export const loadFiltersAction = () => ({
    callApi: {
        types: [
            ActionTypes.REQUEST_FILTERS_START,
            ActionTypes.REQUEST_FILTERS_SUCCESS,
            ActionTypes.REQUEST_FILTERS_ERROR
        ],
        serviceName: 'HeroesFiltersApiService',
        method: 'getList'
    }
});

export const changeSelectedFiltersAction = (selectedFilters) => ({
    type: ActionTypes.CHANGE_SELECTED_FILTERS,
    payload: {
        selectedFilters
    }
});
