const maps = require('../../templates/maps/MapsTemplate.json');
const mapsTypes = require('../../templates/maps/MapsTypesTemplate.json');

export class MapsDelegate {
    static generateMaps() {
        Maps.create(maps).then(() => {
            console.log('maps were created');
        });
    }

    static getMaps(req, res) {
        Maps.find().then((maps) => {
            res.json(maps);
        });
    }

    static getMapsTypes(req, res) {
        res.json(mapsTypes);
    }
}
