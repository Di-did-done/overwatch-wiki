// tslint:disable:max-classes-per-file
export abstract class NgRedux {
    connect;
}

function ngReduxFactory(injector) {
    return injector.get('$ngRedux');
}

export const ngReduxProvider = {
    provide: NgRedux,
    useFactory: ngReduxFactory,
    deps: ['$injector']
};
