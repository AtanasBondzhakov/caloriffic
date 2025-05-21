const BASE_URL = 'http://localhost:5000'; //TODO change this with env

const request = async (method, url, data) => {
    const options = {
        method,
        headers: {},
        credentials: 'include'
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }


    const response = await fetch(BASE_URL + url, options);

    const result = await response.json();

    if (!response.ok) {
        throw result;
    }

    return result;

};

const get = (url) => request('GET', url);
const post = (url, data) => request('POST', url, data);
const put = (url, data) => request('PUT', url, data);
const del = (url) => request('DELETE', url);

export default {
    get,
    post,
    put,
    del
};