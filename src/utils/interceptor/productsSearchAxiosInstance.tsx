// src/axiosInstance.js
import axios from 'axios';
import { showWarningMessage } from '../../shared/notificationProvider';
import { NOT_FOUND_ERROR } from '../constants/NotificationConstants';


const baseURL = process.env.REACT_APP_BASEURL!;
const baseEnv = process.env.REACT_APP_ENV!;
const discoveryServiceUrlSuffix = process.env.REACT_APP_DISCOVER_SERVICE_URLSUFFIX!;
const productSearchAxiosInstance = axios.create({
  baseURL: baseURL+baseEnv+discoveryServiceUrlSuffix,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor
productSearchAxiosInstance.interceptors.request.use(
  function (config) {
    if(config.url !== "/generate_auth_otp" && config.url !== "/login" && config.url !== "/register"){
      const token = localStorage.getItem('token'); // Retrieve auth token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if(config.url === "/document" && config.method === 'post'){
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    // Check if the method is POST
    else if ((config.method === 'post' || config.method === 'put') && config.data) {
      // Modify the request body as needed
      let payload_formatted = [];
      payload_formatted.push(config.data)
      config.data = {
        payload: payload_formatted
      };
    }
    return config;
  }
);

// Response interceptor
productSearchAxiosInstance.interceptors.response.use(
  function (response: any) {
    // Do formatting of response and return
    console.log(response)
    if(response.config.url.split('/').slice(0, 2).join('/') === 'documents/download'){
      return response.data
    }
    else if(response.data.error === null){
      return response.data.message.data;
    }
    else{
      const messages = response.data.error.msg;
      if(Array.isArray(messages)){
        messages.forEach((msg: any) => {
          const errorDetails = msg.split(',')[0];
          showWarningMessage(errorDetails)
      });
      }
      else{
        showWarningMessage(messages)
      }
      return Promise.reject(response.data.error);
    }
  },
  async function (error) {
    // Handle the response error and included refresh token logic
    // const originalRequest = error.config;
    // showWarningMessage(error.error.msg)
    console.log(error)
    if(error.status === 401 && error.response.data.error.code === "1020005"){
      showWarningMessage(error.error)
      localStorage.clear();
      window.location.href = `${process.env.REACT_APP_BASENAME}/login`;
    }
    else if(error.status === 404){
      showWarningMessage(NOT_FOUND_ERROR)
    }
    else if (error.status === 500 && error.response && error.response.data && error.response.data.error && error.response.data.error.code && error.response.data.error.code === "2017004"){
      // dont show any warning message
    }
    else{
      showWarningMessage(error.response.data.error.msg)
    }
    // if (error.response.status === 401 && error.response.message === "Token Expired") {
    //   try {
    //     const refreshToken = localStorage.getItem('refreshToken');
    //     const response = await axios.post('/refresh-token', { refreshToken });
    //     const { token } = response.data;

    //     localStorage.setItem('accessToken', response.data.token);

    //     // Retry the original request with the new token
    //     originalRequest.headers.Authorization = `Bearer ${token}`;
    //     return axios(originalRequest);
    //   } catch (error) {
    //     // Handle refresh token error or redirect to login
    //     localStorage.clear();
    //     window.location.href = '/';
    //   }
    // }
    // if (error.response.status === 401 && error.response.message === "Unauthorized") {
    //     localStorage.clear();
    //     window.location.href = '/';
    // }

    return Promise.reject(error);
  }
);

export default productSearchAxiosInstance;