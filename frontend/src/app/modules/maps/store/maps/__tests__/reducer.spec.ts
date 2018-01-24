import { MapModel } from '../../../models/map.model';

import { INITIAL_STATE, mapsReducer } from '../reducer';
import { LoadMapsAction, LoadMapsErrorAction, LoadMapsSuccessAction } from '../actions';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps', () => {
            describe('Reducer', () => {
                describe('undefined action', () => {
                    it('should return  the default state', () => {
                        const action = {} as any;
                        const state = mapsReducer(undefined, action);

                        expect(state).toBe(INITIAL_STATE);
                    });
                });

                describe('REQUEST_MAPS action', () => {
                    it('should set loading to true', () => {
                        const action = new LoadMapsAction();
                        const state = mapsReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(true);
                    });
                });

                describe('REQUEST_MAPS_ERROR action', () => {
                    it('should set loading to false', () => {
                        const action = new LoadMapsErrorAction({ message: 'Load Error'});
                        const state = mapsReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(false);
                    });
                });

                describe('REQUEST_MAPS_SUCCESS action', () => {
                    it('should set loading to false', () => {
                        const maps = [{
                            id: 'Eichenwalde',
                            name: 'Айхенвальд',
                            type: 'gybrid',
                            description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                        }] as MapModel[];
                        const action = new LoadMapsSuccessAction(maps);
                        const state = mapsReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(false);
                    });
                    it('should set entities and ids of maps', () => {
                        const maps = [
                            {
                                id: 'Eichenwalde',
                                name: 'Айхенвальд',
                                type: 'gybrid',
                                description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                            }
                        ] as MapModel[];
                        const action = new LoadMapsSuccessAction(maps);
                        const state = mapsReducer(INITIAL_STATE, action);

                        expect(state.ids).toEqual(['Eichenwalde']);
                        expect(state.entities).toEqual({
                            Eichenwalde: {
                                id: 'Eichenwalde',
                                name: 'Айхенвальд',
                                type: 'gybrid',
                                description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                            }
                        });
                    });
                });
            });
        });
    });
});
