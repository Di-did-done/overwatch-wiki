import * as angular from 'angular';

import ngReduxProvider from './components/ngRedux';
import { apiMiddleware } from './middlewares/api.middleware';

export const ngReduxModule = angular.module('ngRedux', [])
    .provider('$ngRedux', ngReduxProvider)
    .service('apiMiddleware', apiMiddleware);
