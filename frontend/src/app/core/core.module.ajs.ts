import angular from 'angular';
import { downgradeInjectable } from '@angular/upgrade/static';

import { BaseHttpService } from './services/base-http.service';


export const CoreModuleAjs = angular
    .module('core', [])

    .service('BaseHttpService', downgradeInjectable(BaseHttpService));
