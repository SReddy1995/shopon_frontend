import axios from 'axios';
import { showWarningMessage } from '../../shared/notificationProvider';
import { NOT_FOUND_ERROR, TIMEOUT_ERROR } from '../constants/NotificationConstants';

const baseURL = process.env.REACT_APP_BASEURL!;
const baseEnv = process.env.REACT_APP_ENV!;
const baseUrlSuffix = process.env.REACT_APP_BASEURLSUFFIX!;
const discoveryServiceUrlSuffix = process.env.REACT_APP_DISCOVER_SERVICE_URLSUFFIX!;
const storeServiceUrlSuffix = process.env.REACT_APP_STORE_SERVICE_URLSUFFIX!;
const integration_key = process.env.REACT_APP_INTEGRATION_KEY!;
const orderServiceUrlSuffix = process.env.REACT_APP_ORDER_SERVICE_URLSUFFIX!;
const reconServiceUrlSuffix = process.env.REACT_APP_RECON_SERVICE_URLSUFFIX!;

const createAxiosInstance = (urlSuffix: string) => {
  return axios.create({
    baseURL: baseURL + baseEnv + urlSuffix,
    timeout: 0,
    headers: { 'Content-Type': 'application/json' }
  });
};

const axiosInstance = createAxiosInstance(baseUrlSuffix);
const productSearchAxiosInstance = createAxiosInstance(discoveryServiceUrlSuffix);
const storeServiceAxiosInstance = createAxiosInstance(storeServiceUrlSuffix);
const orderServiceAxiosInstance = createAxiosInstance(orderServiceUrlSuffix);
const reconServiceAxiosInstance = createAxiosInstance(reconServiceUrlSuffix);

// Request interceptor
const requestInterceptor = (config: any) => {
  if (config.url !== "/generate_auth_otp" && config.url !== "/login" && config.url !== "/register") {
    const token = localStorage.getItem('token'); // Retrieve auth token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.baseURL.includes(storeServiceUrlSuffix)) {
      config.headers['x-integration-key'] = integration_key;
    }
  }
  if (config.url === "/document" && config.method === 'post') {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  if (config.url === "/track_by_seller" && config.method === 'post') {
    config.data = {
      payload: config.data
    };
  }
  // Check if the method is POST or PUT
  else if ((config.method === 'post' || config.method === 'put') && config.data) {
    // Modify the request body as needed
    let payload_formatted = [];
    payload_formatted.push(config.data);
    config.data = {
      payload: payload_formatted
    };
  }
  return config;
};

axiosInstance.interceptors.request.use(requestInterceptor);
productSearchAxiosInstance.interceptors.request.use(requestInterceptor);
storeServiceAxiosInstance.interceptors.request.use(requestInterceptor)
orderServiceAxiosInstance.interceptors.request.use(requestInterceptor);
reconServiceAxiosInstance.interceptors.request.use(requestInterceptor);

// Response interceptor
const responseInterceptor = (response: any) => {
  console.log(response);
  if (response.config.url.split('/').slice(0, 2).join('/') === 'documents/download') {
    return response.data;
  } else if (response.data.error === null) {
    return response.data.message.data;
  } else {
    const messages = response.data.error.msg;
    if (Array.isArray(messages)) {
      messages.forEach((msg: any) => {
        const errorDetails = msg.split(',')[0];
        showWarningMessage(errorDetails);
      });
    } else {
      showWarningMessage(messages);
    }
    return Promise.reject(response.data.error);
  }
};

const errorInterceptor = async (error: any) => {
  console.log(error);
  if (error.status === 401 && error.response.data.error.code === "1020005") {
    showWarningMessage(error.error);
    localStorage.clear();
    window.location.href = `${process.env.REACT_APP_BASENAME}/login`;
  } else if (error.status === 404) {
    showWarningMessage(NOT_FOUND_ERROR);
  } else if (error.status === 504) {
    showWarningMessage(TIMEOUT_ERROR);
  } else if (error.status === 500 && error.response && error.response.data && error.response.data.error && error.response.data.error.code && error.response.data.error.code === "2017004") {
    // don't show any warning message
  } else {
    showWarningMessage(error.response.data.error.msg);
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
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
productSearchAxiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
storeServiceAxiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
orderServiceAxiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);
reconServiceAxiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export { axiosInstance, productSearchAxiosInstance, storeServiceAxiosInstance, orderServiceAxiosInstance, reconServiceAxiosInstance };