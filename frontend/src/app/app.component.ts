import { Component } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
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
