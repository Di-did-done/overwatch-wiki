import _ from 'lodash';
import { MapsDelegate } from "../../delegates/maps/MapsDelegate";

_.defaults(sails.config.routes, {
    'get /api/maps': {
        controller: 'maps/MapsController',
        action: 'findAll'
    },
    'get /api/maps/types': {
        controller: 'maps/MapsController',
        action: 'findTypes'
    }
});

export function findAll(req, res) {
    MapsDelegate.getMaps(req, res);
}

export function findTypes(req, res) {
    MapsDelegate.getMapsTypes(req, res);
}
