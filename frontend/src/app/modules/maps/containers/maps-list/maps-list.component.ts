import './maps-list.component.less';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { NgRedux } from '../../../../ajs-upgraded-providers';

import { loadMapsAction } from '../../store/maps/actions';
import { getMapsByType, getMapsLoading } from '../../store/maps/selectors';
import { MapModel } from '../../models/map.model';

import { loadMapsTypesAction } from '../../store/maps-types/actions';
import { getMapsTypes, getTypesLoading } from '../../store/maps-types/selectors';
import { MapType } from '../../models/map-type.model';

@Component({
    selector: 'maps-list',
    template: require('./maps-list.component.html')
})
export class MapsListComponent implements OnInit, OnDestroy {
    // Actions
    loadMapsAction;
    loadMapsTypesAction;

    // From Store
    loadingMaps: boolean;
    loadingTypes: boolean;
    types: MapType[];
    mapsByType: {
        [type: string]: MapModel[]
    };

    // Local Variables
    unsubscribe: () => void;
    imagePath: string = '../../../../../assets/images/maps';

    constructor($ngRedux: NgRedux) {
        this.unsubscribe = $ngRedux.connect(this._mapStateToThis, {
            loadMapsAction,
            loadMapsTypesAction
        })(this);
    }

    ngOnInit() {
        // this.loadMapsAction();
        // this.loadMapsTypesAction();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    getMapImage(mapId: string): string {
        return `${this.imagePath}/${mapId}.jpg`;
    }

    _mapStateToThis(state) {
        return {
            /*loadingMaps: getMapsLoading(state),
            loadingTypes: getTypesLoading(state),
            mapsByType: getMapsByType(state),
            types: getMapsTypes(state)*/
        };
    }
}
