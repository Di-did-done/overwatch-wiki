import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from '../../../../core/services/base-http.service';

import { MapsTypesApiService } from '../maps-types.api.service';


describe('Maps Module', () => {
    describe('Services', () => {
        describe('MapsTypesApiService', () => {
            let service: MapsTypesApiService;

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
                        MapsTypesApiService
                    ]
                });

                service = TestBed.get(MapsTypesApiService);
            });

            afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
                httpMock.verify();
            }));

            describe('getList', () => {
                it('should call correct HTTP API',
                    inject([HttpClient, HttpTestingController],
                        (http: HttpClient, httpMock: HttpTestingController) => {
                            service.getList().subscribe();

                            httpMock.expectOne('/api/maps/types').flush([]);
                        }
                    )
                );

                it('should return list of maps',
                    inject([HttpClient, HttpTestingController],
                        (http: HttpClient, httpMock: HttpTestingController) => {
                            service.getList().subscribe((value) => {
                                expect(value).toEqual(mapsTypes);
                            });

                            httpMock.expectOne('/api/maps/types').flush(mapsTypes);
                        }
                    )
                );
            });
        });
    });
});

