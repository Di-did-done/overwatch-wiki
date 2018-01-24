import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { cold, hot } from 'jasmine-marbles';

import { BaseHttpService } from '../../../../../core/services/base-http.service';

import { MapModel } from '../../../models/map.model';
import { MapsApiService } from '../../../services/maps.api.service';

import { MapsEffects } from '../effects';
import { LoadMapsAction, LoadMapsSuccessAction } from '../actions';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps', () => {
            describe('Effects', () => {
                let actions$: Observable<any>;
                let service: MapsApiService;
                let effects: MapsEffects;

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

                beforeEach(() => {
                    TestBed.configureTestingModule({
                        imports: [
                            HttpClientTestingModule
                        ],
                        providers: [
                            BaseHttpService,
                            MapsApiService,
                            MapsEffects,
                            provideMockActions(() => actions$)
                        ]
                    });

                    service = TestBed.get(MapsApiService);
                    effects = TestBed.get(MapsEffects);

                    spyOn(service, 'getList').and.returnValue(of(maps));
                });

                describe('loadMaps', () => {
                    it('should return a collection of map from LoadMapsSuccess', () => {
                        const action = new LoadMapsAction();
                        const completion = new LoadMapsSuccessAction(maps);

                        actions$ = hot('-a', { a: action });
                        const expected = cold('-b', { b: completion });

                        expect(effects.loadMaps$).toBeObservable(expected);
                    });
                });
            });
        });
    });
});
