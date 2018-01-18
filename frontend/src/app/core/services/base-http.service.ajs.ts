const BASE_URL: string = '/api';

export class BaseHttpService {
    constructor(public $http: ng.IHttpService) {
    }

    getList(url: string, options = {}) {
        return this.$http.get(`${BASE_URL}${url}`, options);
    }

    getOne(url: string, id, options = {}) {
        return this.$http.get(`${BASE_URL}${url}/${id}`, options);
    }

    create(url: string, data, options = {}) {
        return this.$http.post(`${BASE_URL}${url}`, data, options);
    }

    update(url: string, id, data, options = {}) {
        return this.$http.put(`${BASE_URL}${url}/${id}`, data, options);
    }

    remove(url: string, id) {
        return this.$http.delete(`${BASE_URL}${url}/${id}`);
    }

    customRequest(method: string, url: string, data = {}, options = {}) {
        return this.$http({
            method,
            data,
            url: `${BASE_URL}${url}`,
            ...options
        });
    }

    getFullUrl(url: string) {
        return `${BASE_URL}${url}`;
    }
}

BaseHttpService.$inject = ['$http'];

