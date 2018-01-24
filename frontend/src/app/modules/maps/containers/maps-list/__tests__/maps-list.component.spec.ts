import { ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { MapsModuleState, reducers } from '../../../store/maps.state';
import { LoadMapsAction, LoadMapsSuccessAction } from '../../../store/maps/actions';
import { LoadMapsTypesAction, LoadMapsTypesSuccessAction } from '../../../store/maps-types/actions';

import { MapModel } from '../../../models/map.model';

import { MapsListComponent } from '../maps-list.component';


describe('Maps Module', () => {
   describe('Containers', () => {
        describe('Maps List', () => {
            let component: MapsListComponent;
            let fixture: ComponentFixture<MapsListComponent>;
            let store: Store<MapsModuleState>;

            const maps = [{
                id: 'Eichenwalde',
                name: 'Айхенвальд',
                type: 'gybrid',
                description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
            }] as MapModel[];

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
                        }),

                        MatProgressSpinnerModule,
                        MatCardModule
                    ],
                    declarations: [
                        MapsListComponent
                    ]
                });

                store = TestBed.get(Store);

                spyOn(store, 'dispatch').and.callThrough();

                fixture = TestBed.createComponent(MapsListComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
            });

            it('should be created', () => {
                expect(component).not.toBeUndefined();
            });

            it('should dispatch an action to load maps when created', () => {
                const action = new LoadMapsAction();

                expect(store.dispatch).toHaveBeenCalledWith(action);
            });

            it('should dispatch an action to load map types when created', () => {
                const action = new LoadMapsTypesAction();

                expect(store.dispatch).toHaveBeenCalledWith(action);
            });

            it('should set loading flags to true when created', () => {
                component.loadingMaps$.subscribe((loading) => {
                    expect(loading).toBeTruthy();
                });
                component.loadingTypes$.subscribe((loading) => {
                    expect(loading).toBeTruthy();
                });
            });

            it('should set loading maps to false when maps is loaded', () => {
                const action = new LoadMapsSuccessAction(maps);

                store.dispatch(action);

                component.loadingMaps$.subscribe((loading) => {
                    expect(loading).toBeFalsy();
                });
            });

            it('should set loading types to false when types is loaded', () => {
                const action = new LoadMapsTypesSuccessAction(mapsTypes);

                store.dispatch(action);

                component.loadingTypes$.subscribe((loading) => {
                    expect(loading).toBeFalsy();
                });
            });

            it('should contain maps when maps is loaded', () => {
                const action = new LoadMapsSuccessAction(maps);

                store.dispatch(action);

                component.mapsByType$.subscribe((mapsByType) => {
                    expect(mapsByType.gybrid).toEqual([
                        {
                            id: 'Eichenwalde',
                            name: 'Айхенвальд',
                            type: 'gybrid',
                            description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                        }
                    ]);
                });
            });

            it('should contain types when types is loaded', () => {
                const action = new LoadMapsTypesSuccessAction(mapsTypes);

                store.dispatch(action);

                component.types$.subscribe((types) => {
                    expect(types).toEqual(mapsTypes);
                });
            });
        });
   });
});
