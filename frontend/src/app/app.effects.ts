import 'rxjs/add/operator/mergeMap';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs/Observable';

export const effect$ = new ReplaySubject();
export const appEffects = (action$, store): Observable<Action> =>
    effect$.mergeMap((effect: any) => effect(action$, store));

