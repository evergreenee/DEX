import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8081/api",
    // timeout: 15000
    timeout: 0  // 0代表无限制
});

// 拦截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);


export function get(url, params) {
    return instance.get(url, {
        params
    });
}

export function post(url, data) {
    return instance.post(url, data);
}