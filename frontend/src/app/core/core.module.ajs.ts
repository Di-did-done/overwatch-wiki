import angular from 'angular';

import { BaseHttpService } from './services/base-http.service.ajs';
import { GridResizeDirective } from './directives/grid-resize.directive';


export const CoreModuleAjs = angular
    .module('core', [])

    .directive('gridResize', GridResizeDirective)

    .service('BaseHttpService', BaseHttpService);
