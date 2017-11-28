import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import './polyfills';
import './vendor';

import { AppModule } from './app';


platformBrowserDynamic().bootstrapModule(AppModule);
