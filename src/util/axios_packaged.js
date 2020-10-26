import axios from 'axios';
import qs from 'qs'; // QueryString

const SERVER_HOST = window.location.hostname;
const SERVER_PORT = 5000;
const service = axios.create({
    // baseURL: 'http://' + SERVER_HOST + '/api', // for deployment
    baseURL: 'http://' + SERVER_HOST + ':' + SERVER_PORT + '/api', // for dev server
    timeout: 10000,
})
service.defaults.headers.common['Authorization'] = localStorage.getItem('jwt-token');

let http = {
    post: "",
    get: ""
}

http.post = function (api, data) {
    // let params = qs.stringify(data);
    return new Promise((resolve, reject) => {
        service.post(api, data).then((res) => {
            resolve(res);
        }).catch(reason => {
            reject(reason);
        })
    })
}

http.get = function (api) {
    return new Promise((resolve, reject) => {
        service.get(api).then((res) => {
            resolve(res);
        }).catch(reason => {
            reject(reason);
        })
    })
}

export default http;

