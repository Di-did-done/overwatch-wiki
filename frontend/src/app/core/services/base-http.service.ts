import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

const BASE_URL: string = '/api';

@Injectable()
export class BaseHttpService {
    constructor(public http: HttpClient) {}

    getList(url: string, options = {}) {
        return this.http.get(`${BASE_URL}${url}`, options).toPromise();
    }

    getOne(url: string, id, options = {}) {
        return this.http.get(`${BASE_URL}${url}/${id}`, options).toPromise();
    }

    create(url: string, data, options = {}) {
        return this.http.post(`${BASE_URL}${url}`, data, options).toPromise();
    }

    update(url: string, id, data, options = {}) {
        return this.http.put(`${BASE_URL}${url}/${id}`, data, options).toPromise();
    }

    remove(url: string, id) {
        return this.http.delete(`${BASE_URL}${url}/${id}`).toPromise();
    }

    customRequest(method: string, url: string, data = {}, options = {}) {
        return this.http.request(method, `${BASE_URL}${url}`, {
            body: data,
            ...options
        }).toPromise();
    }

    getFullUrl(url: string) {
        return `${BASE_URL}${url}`;
    }
}
