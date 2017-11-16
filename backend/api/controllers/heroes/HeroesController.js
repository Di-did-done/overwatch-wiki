import _ from 'lodash';
import HeroesDelegate from '../../delegates/heroes/HeroesDelegate';

_.defaults(sails.config.routes, {
    'get /api/heroes': {
        controller: 'heroes/HeroesController',
        action: 'findAll'
    },
    'get r|^/api/heroes/((?!filters).*)$|heroId': {
        controller: 'heroes/HeroesController',
        action: 'findOne'
    }
});

export function findAll(req, res) {
    HeroesDelegate.findAll(req, res);
}

export function findOne(req, res) {
    HeroesDelegate.findOne(req, res);
}

