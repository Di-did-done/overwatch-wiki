import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';


const BASE_URL: string = '/api';

@Injectable()
export class BaseHttpService {
    constructor(public http: HttpClient) {}

    getList<T>(url: string, options = {}): Observable<T> {
        return this.http
            .get<T>(`${BASE_URL}${url}`, options)
            .pipe(
                catchError((error: any) => Observable.throw(error.json()))
            );
    }

    getOne(url: string, id, options = {}) {
        return this.http.get(`${BASE_URL}${url}/${id}`, options);
    }

    create(url: string, data, options = {}) {
        return this.http.post(`${BASE_URL}${url}`, data, options);
    }

    update(url: string, id, data, options = {}) {
        return this.http.put(`${BASE_URL}${url}/${id}`, data, options);
    }

    remove(url: string, id) {
        return this.http.delete(`${BASE_URL}${url}/${id}`);
    }

    customRequest(method: string, url: string, data = {}, options = {}) {
        return this.http.request(method, `${BASE_URL}${url}`, {
            body: data,
            ...options
        });
    }

    getFullUrl(url: string) {
        return `${BASE_URL}${url}`;
    }
}
