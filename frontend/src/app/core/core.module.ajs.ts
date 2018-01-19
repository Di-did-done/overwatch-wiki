import * as angular from 'angular';

import { BaseHttpService } from './services/base-http.service.ajs';


export const CoreModuleAjs = angular
    .module('core', [])

    .service('BaseHttpService', BaseHttpService);
