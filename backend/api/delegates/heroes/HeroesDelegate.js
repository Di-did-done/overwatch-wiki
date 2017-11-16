const heroes = require('../../templates/heroes/HeroesTemplate.json');

class HeroesDelegate {
    static generateHeroes() {
        Heroes.create(heroes).then(() => {
            console.log('heroes were created');
        });
    }

    static findAll(req, res) {
        const searchOptions = {};
        const params = req.allParams();

        if (params.name) {
            searchOptions.name = {
                'contains': params.name
            };
        }

        if (params.role) {
            searchOptions.role = params.role
        }

        Heroes.find(searchOptions).then((heroes) => {
            res.json(heroes);
        });
    }

    static findOne(req, res) {
        Heroes.findOne({ id: req.param('heroId') }).then((hero) => {
            res.json(hero);
        });
    }
}

export default HeroesDelegate;