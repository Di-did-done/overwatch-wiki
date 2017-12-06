import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BaseHttpService } from './services/base-http.service';


@NgModule({
    providers: [
        BaseHttpService
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
