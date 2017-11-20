import * as ActionTypes from './constants';

interface HeroesFiltersState {
    loading: boolean;
    availableValues: {
        [filterName: string]: any[];
    };
    selected: {
        [filterName: string]: any;
    };
}

const INITIAL_STATE: HeroesFiltersState = {
    loading: false,
    availableValues: {},
    selected: {}
};

export const filtersReducer = (state: HeroesFiltersState = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.REQUEST_FILTERS_START: {
            return {
                ...state,
                loading: true
            };
        }
        case ActionTypes.REQUEST_FILTERS_SUCCESS: {
            return {
                ...state,
                loading: false,
                availableValues: payload.apiResponse
            };
        }
        case ActionTypes.REQUEST_FILTERS_ERROR: {
            return {
                ...state,
                loading: false
            };
        }
        case ActionTypes.CHANGE_SELECTED_FILTERS: {
            return {
                ...state,
                selected: payload.selectedFilters
            };
        }
        default:
            return state;
    }
};
