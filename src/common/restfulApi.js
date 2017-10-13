import fetch from 'isomorphic-fetch'
export default class Api {
    constructor(root, token) {
        var defaultPath = "http://" + location.host+"/iwebap";
        this.rootPath = root || defaultPath;
    }

    get root() {
        return this.rootPath;
    }

    set root(value) {
        this.rootPath = value;
    }

    token = () => {
        if (window.sessionStorage) {
            var token = window.sessionStorage.getItem('token');
            return token ? token : '';
        } else {
        }
    }

    fullUrl(api) {
        var result = '';
        var connector = api.indexOf('?') > 0 ? '&' : '?';
        var token = this.token();
        if (token != '') {
            (api.indexOf(this.rootPath) === -1) ? result = this.rootPath + api + connector + 'token=' + token : result = api + connector + 'token=' + token;
        } else {
            (api.indexOf(this.rootPath) === -1) ? result = this.rootPath + api : result = api;
        }
        return result;
    }

    getApi(api, callback, errCallback){
        var url = this.fullUrl(api);

        var opts = {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            },
            mode: "cors"
        };
        return fetch(url, opts)
            .then(response => {
                return response.json();
            }).then(json => {
                if (callback) return callback(json);
                return json;
            }).catch(function (err) {
                if (errCallback) return errCallback(err);
                console.log(err);
            });
    }

    postApi(api, data, callback, errCallback) {
        const url = this.fullUrl(api);
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
            // mode: "cors",
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("status:" + response.status + " message:" + response.statusText);
            }
            return {};
        }).then(json => {
            if (callback) return callback(json);
            return json;
        }).catch(function (err) {
            if (errCallback) return errCallback(err);
            console.log(err);
        });
    }

    putApi(api, data, callback, errCallback) {
        const url = this.fullUrl(api);
        return fetch(url, {
            method: 'put',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: "cors",
        }).then(response => response.json())
            .then(json => {
                if (callback) return callback(json);
                return json;
            }).catch(function (err) {
                if (errCallback) return errCallback(err);
                console.log(err);
            });
    }

    deleteApi(api, callback, errCallback) {
        var url = this.fullUrl(api);
        var opts = {
            method: 'delete',
            headers: {
                'Content-type': 'application/json',
            },
            mode: "cors",
        };
        return fetch(url, opts)
            .then(response => {
                console.log(response.status) // 200
                console.log(response.statusText) // OK
                if (response.status == 200) {
                    return {
                        "errCode": 0,
                        "errMsg": "删除数据成功"
                    }
                } else {
                    return {
                        "errCode": -1,
                        "errMsg": "删除数据失败"
                    }
                }
            }).then(json => {
                if (callback) return callback(json);
                return json;
            }).catch(function (err) {
                if (errCallback) return errCallback(err);
                console.log(err);
            });
    }
}
