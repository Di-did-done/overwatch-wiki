import angular from 'angular';

import { BaseHttpService } from './services/base-http.service';


export const CoreModule = angular
    .module('core', [])

    .service('BaseHttpService', BaseHttpService);
