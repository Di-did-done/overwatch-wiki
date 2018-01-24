import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BaseHttpService } from '../../../../../core/services/base-http.service';
import { MapsTypesApiService } from '../../../services/maps-types.api.service';

import { MapsTypesEffects } from '../effects';
import { LoadMapsTypesAction, LoadMapsTypesSuccessAction } from '../actions';

describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps Types', () => {
            describe('Effects', () => {
                let actions$: Observable<any>;
                let service: MapsTypesApiService;
                let effects: MapsTypesEffects;

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
                            HttpClientTestingModule
                        ],
                        providers: [
                            BaseHttpService,
                            MapsTypesApiService,
                            MapsTypesEffects,
                            provideMockActions(() => actions$)
                        ]
                    });

                    service = TestBed.get(MapsTypesApiService);
                    effects = TestBed.get(MapsTypesEffects);

                    spyOn(service, 'getList').and.returnValue(of(mapsTypes));
                });

                describe('loadMapsTypes', () => {
                    it('should return a collection of map types from LoadMapsTypesSuccess', () => {
                        const action = new LoadMapsTypesAction();
                        const completion = new LoadMapsTypesSuccessAction(mapsTypes);

                        actions$ = hot('-a', { a: action });
                        const expected = cold('-b', { b: completion });

                        expect(effects.loadMapsTypes$).toBeObservable(expected);
                    });
                });
            });
        });
    });
});
