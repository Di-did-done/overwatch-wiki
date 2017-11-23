import './maps-list.component.less';

import { loadMapsAction } from '../../store/maps/actions';
import { getMapsByType, getMapsLoading } from '../../store/maps/selectors';
import { MapModel } from '../../models/map.model';

import { loadMapsTypesAction } from '../../store/maps-types/actions';
import { getMapsTypes, getTypesLoading } from '../../store/maps-types/selectors';
import { MapType } from '../../models/map-type.model';

class MapsListController {
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

    constructor($ngRedux) {
        this.unsubscribe = $ngRedux.connect(this._mapStateToThis, {
            loadMapsAction,
            loadMapsTypesAction
        })(this);
    }

    $onInit() {
        this.loadMapsAction();
        this.loadMapsTypesAction();
    }

    $onDestroy() {
        this.unsubscribe();
    }

    _mapStateToThis(state) {
        return {
            loadingMaps: getMapsLoading(state),
            loadingTypes: getTypesLoading(state),
            mapsByType: getMapsByType(state),
            types: getMapsTypes(state)
        };
    }
}

MapsListController.$inject = ['$ngRedux'];

export const MapsListComponent = {
    controller: MapsListController,
    template: require('./maps-list.component.html')
};
