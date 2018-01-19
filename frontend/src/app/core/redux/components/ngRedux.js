/*eslint-disable*/

import Connector from './connector';
import invariant from 'invariant';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {addReducer, removeReducer} from '../utils/dynamicReducers';

import * as _ from 'lodash';

const typeIs = _.curry((type, val) => typeof val === type);
const isObject = typeIs('object');
const isString = typeIs('string');

export default function ngReduxProvider() {
    let _reducer = undefined;
    let _middlewares = undefined;
    let _storeEnhancers = undefined;
    let _initialState = undefined;
    let _reducerIsObject = undefined;
    let _fixedReducers = undefined;

    this.createStoreWith = (reducer, middlewares, storeEnhancers, initialState) => {
        invariant(
            _.isFunction(reducer) || isObject(reducer),
            'The reducer parameter passed to createStoreWith must be a Function or an Object. Instead received %s.',
            typeof reducer
        );

        invariant(
            !storeEnhancers || _.isArray(storeEnhancers),
            'The storeEnhancers parameter passed to createStoreWith must be an Array. Instead received %s.',
            typeof storeEnhancers
        );

        _reducer = reducer;
        _reducerIsObject = isObject(reducer);
        _storeEnhancers = storeEnhancers;
        _middlewares = middlewares || [];
        _initialState = initialState;
    };

    this.$get = ($injector) => {
        const resolveMiddleware = middleware => isString(middleware)
            ? $injector.get(middleware)
            : middleware;

        const resolvedMiddleware = _.map(_middlewares, resolveMiddleware);

        const resolveStoreEnhancer = storeEnhancer => isString(storeEnhancer)
            ? $injector.get(storeEnhancer)
            : storeEnhancer;

        const resolvedStoreEnhancer = _.map(_storeEnhancers, resolveStoreEnhancer);

        if(_reducerIsObject) {
            const getReducerKey = key => isString(_reducer[key])
                ? $injector.get(_reducer[key])
                : _reducer[key];

            const resolveReducerKey = (result, key) => _.assign({}, result,
                { [key]: getReducerKey(key) }
            );

            const reducersObj = _fixedReducers = Object
                .keys(_reducer)
                .reduce(resolveReducerKey, {});

            _reducer = combineReducers(reducersObj);
        }

        const finalCreateStore = resolvedStoreEnhancer ? compose(...resolvedStoreEnhancer)(createStore) : createStore;

        //digestMiddleware needs to be the last one.
        //resolvedMiddleware.push(digestMiddleware($injector.get('$rootScope')));

        const store = _initialState
            ? _.assign({ asyncReducers: {}, fixedReducers: _fixedReducers }, applyMiddleware(...resolvedMiddleware)(finalCreateStore)(_reducer, _initialState))
            : _.assign({ asyncReducers: {}, fixedReducers: _fixedReducers }, applyMiddleware(...resolvedMiddleware)(finalCreateStore)(_reducer));

        return _.assign({}, store, {
            addReducer: addReducer(store),
            connect: Connector(store),
            removeReducer: removeReducer(store)
        });
    };

    this.$get.$inject = ['$injector'];
}
