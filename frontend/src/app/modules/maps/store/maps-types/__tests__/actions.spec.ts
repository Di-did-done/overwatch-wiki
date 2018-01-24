import { LoadMapsTypesAction, LoadMapsTypesErrorAction, LoadMapsTypesSuccessAction } from '../actions';
import { REQUEST_MAPS_TYPES, REQUEST_MAPS_TYPES_ERROR, REQUEST_MAPS_TYPES_SUCCESS } from '../constants';


describe('Maps Module', () => {
    describe('Store', () => {
        describe('Maps Types', () => {
            describe('Actions', () => {
                describe('LoadMapsTypesAction', () => {
                    it('should create an action', () => {
                        const action = new LoadMapsTypesAction();

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS_TYPES
                        });
                    });
                });

                describe('LoadMapsTypesSuccessAction', () => {
                    it('should create an action', () => {
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

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS_TYPES_SUCCESS,
                            payload: mapsTypes
                        });
                    });
                });

                describe('LoadMapsTypesErrorAction', () => {
                    it('should create an action', () => {
                        const error = { message: 'Load Error' };
                        const action = new LoadMapsTypesErrorAction(error);

                        expect({ ...action }).toEqual({
                            type: REQUEST_MAPS_TYPES_ERROR,
                            payload: error
                        });
                    });
                });
            });
        });
    });
});

