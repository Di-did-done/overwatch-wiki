import { INITIAL_STATE, mapsTypesReducer } from '../reducer';
import { LoadMapsTypesAction, LoadMapsTypesErrorAction, LoadMapsTypesSuccessAction } from '../actions';

describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps Types', () => {
            describe('Reducer', () => {
                describe('undefined action', () => {
                    it('should return the default state', () => {
                        const action = {} as any;
                        const state = mapsTypesReducer(undefined, action);

                        expect(state).toBe(INITIAL_STATE);
                    });
                });

                describe('REQUEST_MAPS_TYPES action', () => {
                    it('should set loading to true', () => {
                        const action = new LoadMapsTypesAction();
                        const state = mapsTypesReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(true);
                    });
                });

                describe('REQUEST_MAPS_TYPES_ERROR action', () => {
                    it('should set loading to false', () => {
                        const action = new LoadMapsTypesErrorAction({ message: 'Load Error'});
                        const state = mapsTypesReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(false);
                    });
                });

                describe('REQUEST_MAPS_TYPES_SUCCESS action', () => {
                    it('should set loading to false', () => {
                        const mapsTypes = [
                            {
                                id: 'gybrid',
                                name: 'Гибридная карта'
                            },
                            {
                                id: 'escort',
                                name: 'Сопровождение'
                            }
                        ];
                        const action = new LoadMapsTypesSuccessAction(mapsTypes);
                        const state = mapsTypesReducer(INITIAL_STATE, action);

                        expect(state.loading).toBe(false);
                    });
                    it('should set entities and ids of map types', () => {
                        const mapsTypes = [
                            {
                                id: 'gybrid',
                                name: 'Гибридная карта'
                            },
                            {
                                id: 'escort',
                                name: 'Сопровождение'
                            }
                        ];
                        const action = new LoadMapsTypesSuccessAction(mapsTypes);
                        const state = mapsTypesReducer(INITIAL_STATE, action);

                        expect(state.ids).toEqual(['gybrid', 'escort']);
                        expect(state.entities).toEqual({
                            gybrid: {
                                id: 'gybrid',
                                name: 'Гибридная карта'
                            },
                            escort: {
                                id: 'escort',
                                name: 'Сопровождение'
                            }
                        });
                    });
                });
            });
        });
    });
});
