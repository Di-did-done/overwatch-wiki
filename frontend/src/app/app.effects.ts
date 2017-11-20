import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/mergeMap';

export const effect$ = new BehaviorSubject(undefined);
export const appEffects = (action$, store) =>
    effect$.mergeMap((effect) => effect(action$, store));

