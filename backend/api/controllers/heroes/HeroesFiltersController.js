import _ from 'lodash';

_.defaults(sails.config.routes, {
    'get /api/heroes/filters': {
        controller: 'heroes/HeroesFiltersController',
        action: 'findAll'
    }
});

export function findAll(req, res) {
    res.json({
        roles: [
            {
                id: 'offense',
                name: 'Штурм'
            },
            {
                id: 'defense',
                name: 'Защита'
            },
            {
                id: 'tank',
                name: 'Танк'
            },
            {
                id: 'support',
                name: 'Поддержка'
            }
        ]
    });
}

