import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { BaseHttpService } from '../../../../core/services/base-http.service';

import { MapsApiService } from '../maps.api.service';
import { MapModel } from '../../models/map.model';


describe('Maps Module', () => {
    describe('Services', () => {
        describe('MapsApiService', () => {
            let service: MapsApiService;

            const maps = [{
                id: 'Eichenwalde',
                name: 'Айхенвальд',
                type: 'gybrid',
                description: 'Сражение разворачивается в заброшенной немецкой деревушке недалеко от Штутгарта.'
            }] as MapModel[];

            beforeEach(() => {
                TestBed.configureTestingModule({
                    imports: [
                        HttpClientTestingModule
                    ],
                    providers: [
                        BaseHttpService,
                        MapsApiService
                    ]
                });

                service = TestBed.get(MapsApiService);
            });

            afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
                httpMock.verify();
            }));

            describe('getList', () => {
                it('should call correct HTTP API',
                    inject([HttpClient, HttpTestingController],
                        (http: HttpClient, httpMock: HttpTestingController) => {
                            service.getList().subscribe();

                            httpMock.expectOne('/api/maps').flush([]);
                        }
                    )
                );

                it('should return list of maps',
                    inject([HttpClient, HttpTestingController],
                        (http: HttpClient, httpMock: HttpTestingController) => {
                            service.getList().subscribe((value) => {
                                expect(value).toEqual(maps);
                            });

                            httpMock.expectOne('/api/maps').flush(maps);
                        }
                    )
                );
            });
        });
    });
});
