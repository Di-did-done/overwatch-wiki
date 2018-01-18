import { Component } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.less').toString()]
})
export class AppComponent {
    activeModule: string;

    constructor(location: Location) {
        this.setActiveModule(location.path());

        location.subscribe(
            (event: PopStateEvent) => this.setActiveModule(event.url)
        );
    }

    isActiveModule(module: string): boolean {
        return module === this.activeModule;
    }

    private setActiveModule(url: string): void {
        this.activeModule = url.split('/')[1];
    }
}
