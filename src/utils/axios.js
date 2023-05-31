import axios from "axios";
import { store } from '../store/store'
import NProgress from "nprogress";
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 75,

})
const instance = axios.create({
    baseURL: "https://ecommerce-bga8.onrender.com/"
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // gửi token lên server start
    const access_token = store?.getState()?.user?.account?.token
    config.headers["Authorization"] = "Bearer " + access_token
    NProgress.start();
    //end

    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('>>> ', response);
    return response && response.data ? response.data : response;
}, function (error) {
    NProgress.done();
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('>>> ', error);
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance