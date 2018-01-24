import { TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import { MapsModuleState, reducers } from '../../maps.state';

import { getMapsTypes, getMapsTypesLoading } from '../selectors';
import { LoadMapsTypesAction, LoadMapsTypesSuccessAction } from '../actions';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps Types', () => {
            describe('Selectors', () => {
                let store: Store<MapsModuleState>;

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

                describe('getMapsTypesLoading', () => {
                    it('should return maps types loading flag', () => {
                        let result;

                        store
                            .select(getMapsTypesLoading)
                            .subscribe((value) => result = value);

                        expect(result).toBe(false);

                        store.dispatch(new LoadMapsTypesAction());

                        expect(result).toBe(true);

                        store.dispatch(new LoadMapsTypesSuccessAction(mapsTypes));

                        expect(result).toBe(false);
                    });
                });

                describe('getMapsTypes', () => {
                    it('should return maps types array', () => {
                        let result;

                        store
                            .select(getMapsTypes)
                            .subscribe((value) => result = value);

                        expect(result).toEqual([]);

                        store.dispatch(new LoadMapsTypesSuccessAction(mapsTypes));

                        expect(result).toEqual(mapsTypes);
                    });
                });
            });
        });
    });
});
