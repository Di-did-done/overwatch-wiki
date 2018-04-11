import angular from 'angular';

import { BaseHttpService } from './services/base-http.service';
import { GridResizeDirective } from './directives/grid-resize.directive';


export const CoreModule = angular
    .module('core', [])

    .directive('gridResize', GridResizeDirective)

    .service('BaseHttpService', BaseHttpService);
