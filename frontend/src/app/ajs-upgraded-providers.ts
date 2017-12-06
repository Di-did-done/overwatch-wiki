// tslint:disable:max-classes-per-file

// $ngRedux
export abstract class NgRedux {
    connect;
}

export function ngReduxFactory(i: any) {
    return i.get('$ngRedux');
}

export const ngReduxProvider = {
    provide: NgRedux,
    useFactory: ngReduxFactory,
    deps: ['$injector']
};
