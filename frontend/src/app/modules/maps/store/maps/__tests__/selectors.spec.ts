import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { MapModel } from '../../../models/map.model';

import { MapsModuleState, reducers } from '../../maps.state';

import { getMapsByType, getMapsEntities, getMapsLoading } from '../selectors';
import { LoadMapsAction, LoadMapsSuccessAction } from '../actions';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps', () => {
            describe('Selectors', () => {
                let store: Store<MapsModuleState>;

                const maps = [
                    {
                        id: 'Eichenwalde',
                        name: 'Айхенвальд',
                        type: 'gybrid',
                        description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                    },
                    {
                        id: 'Hollywood',
                        name: 'Голливуд',
                        type: 'gybrid',
                        description: 'Киностудия робота-режиссера по имени HAL-FRED Glitchbot. '
                    }
                ] as MapModel[];

                const entities = {
                    Eichenwalde: {
                        id: 'Eichenwalde',
                        name: 'Айхенвальд',
                        type: 'gybrid',
                        description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                    },
                    Hollywood: {
                        id: 'Hollywood',
                        name: 'Голливуд',
                        type: 'gybrid',
                        description: 'Киностудия робота-режиссера по имени HAL-FRED Glitchbot. '
                    }
                };

                beforeEach(() => {
                   TestBed.configureTestingModule({
                       imports: [
                           StoreModule.forRoot({
                               mapsModule: combineReducers(reducers)
                           })
                       ]
                   });

                   store = TestBed.get(Store);
                });

                describe('getMapsLoading', () => {
                   it('should return maps loading flag', () => {
                        let result;

                        store
                            .select(getMapsLoading)
                            .subscribe((value) => result = value);

                        expect(result).toBe(false);

                        store.dispatch(new LoadMapsAction());

                        expect(result).toBe(true);

                        store.dispatch(new LoadMapsSuccessAction(maps));

                        expect(result).toBe(false);
                   });
                });

                describe('getMapsEntities', () => {
                    it('should return maps entities', () => {
                        let result;

                        store
                            .select(getMapsEntities)
                            .subscribe((value) => result = value);

                        expect(result).toEqual({});

                        store.dispatch(new LoadMapsSuccessAction(maps));

                        expect(result).toEqual(entities);
                    });
                });

                describe('getMapsByType', () => {
                    it('should return maps grouped by type', () => {
                        let result;

                        store
                            .select(getMapsByType)
                            .subscribe((value) => result = value);

                        expect(result).toEqual({});

                        store.dispatch(new LoadMapsSuccessAction(maps));

                        expect(result).toEqual({
                            gybrid: [
                                {
                                    id: 'Eichenwalde',
                                    name: 'Айхенвальд',
                                    type: 'gybrid',
                                    description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                                },
                                {
                                    id: 'Hollywood',
                                    name: 'Голливуд',
                                    type: 'gybrid',
                                    description: 'Киностудия робота-режиссера по имени HAL-FRED Glitchbot. '
                                }
                            ]
                        });
                    });
                });
            });
        });
    });
});
