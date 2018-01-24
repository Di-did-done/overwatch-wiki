import { MapModel } from '../../../models/map.model';

import { LoadMapsAction, LoadMapsErrorAction, LoadMapsSuccessAction } from '../actions';
import { REQUEST_MAPS, REQUEST_MAPS_ERROR, REQUEST_MAPS_SUCCESS } from '../constants';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps', () => {
            describe('Actions', () => {
                describe('LoadMaps', () => {
                    it('should create an action', () => {
                        const action = new LoadMapsAction();

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS
                        });
                    });
                });

                describe('LoadMapsSuccess', () => {
                    it('should create an action', () => {
                        const maps = [{
                            id: 'Eichenwalde',
                            name: 'Айхенвальд',
                            type: 'gybrid',
                            description: 'Сражение разворачивается в немецкой деревушке недалеко от Штутгарта.'
                        }] as MapModel[];
                        const action = new LoadMapsSuccessAction(maps);

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS_SUCCESS,
                            payload: maps
                        });
                    });
                });

                describe('LoadMapsError', () => {
                    it('should create an action', () => {
                        const error = { message: 'Load Error' };
                        const action = new LoadMapsErrorAction(error);

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS_ERROR,
                            payload: error
                        });
                    });
                });
            });
        });
    });
});
