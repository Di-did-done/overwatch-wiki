import HeroesDelegate from '../delegates/heroes/HeroesDelegate';
import { MapsDelegate } from "../delegates/maps/MapsDelegate";

module.exports = {
    generate: function () {
        HeroesDelegate.generateHeroes();

        MapsDelegate.generateMaps();
    }
};
