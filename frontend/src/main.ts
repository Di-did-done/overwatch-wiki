import angular from 'angular';

import './polyfills';
import './vendor';

import { AppModule } from './app';


angular.bootstrap(document, [AppModule.name]);
