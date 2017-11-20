import 'rxjs/add/operator/mergeMap';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export const effect$ = new ReplaySubject();
export const appEffects = (action$, store) =>
    effect$.mergeMap((effect: any) => effect(action$, store));

