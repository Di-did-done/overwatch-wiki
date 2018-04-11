import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MapModel } from '../../models/map.model';
import { MapType } from '../../models/map-type.model';

import { MapsModuleState } from '../../store/maps.state';

import { getMapsByType, getMapsLoading } from '../../store/maps/selectors';
import { LoadMapsAction } from '../../store/maps/actions';

import { getMapsTypes, getMapsTypesLoading } from '../../store/maps-types/selectors';
import { LoadMapsTypesAction } from '../../store/maps-types/actions';


@Component({
    selector: 'maps-list',
    template: require('./maps-list.component.html'),
    styles: [require('./maps-list.component.less').toString()]
})
export class MapsListComponent implements OnInit {
    mapsByType$: Observable<{ [mapType: string]: MapModel[] }>;
    types$: Observable<MapType[]>;
    loadingMaps$: Observable<boolean>;
    loadingTypes$: Observable<boolean>;

    // Local Variables
    imagePath: string = '../../../../../assets/images/maps';

    constructor(private store: Store<MapsModuleState>) {
    }

    ngOnInit() {
        this.mapState();

        this.store.dispatch(new LoadMapsAction());
        this.store.dispatch(new LoadMapsTypesAction());
    }

    getMapImage(mapId: string): string {
        return `${this.imagePath}/${mapId}.jpg`;
    }

    private mapState() {
        this.loadingMaps$ = this.store.select(getMapsLoading);
        this.loadingTypes$ = this.store.select(getMapsTypesLoading);

        this.mapsByType$ = this.store.select(getMapsByType);
        this.types$ = this.store.select(getMapsTypes);
    }
}
