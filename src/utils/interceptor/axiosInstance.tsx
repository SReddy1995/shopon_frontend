// src/axiosInstance.js
import axios from 'axios';
import { showSuccessMessage, showWarningMessage } from '../../shared/notificationProvider';
import { baseUrl, baseUrlSuffix } from '../constants/UrlConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSelectedStore, updateStoresList } from '../reduxStore/storesSlice';

const axiosInstance = axios.create({
  baseURL: baseUrl+baseUrlSuffix,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if(config.url !== "/generate_auth_otp" && config.url !== "/login" && config.url !== "/register"){
      const token = localStorage.getItem('token'); // Retrieve auth token from localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Check if the method is POST
    if (config.method === 'post' && config.data) {
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
axiosInstance.interceptors.response.use(
  function (response: any) {
    // Do formatting of response and return
    console.log(response)
    if(response.data.error === null){
      // showSuccessMessage(response.data.message.data[0])
      return response.data.message.data;
    }
    else{
      const messages = response.data.error.msg;
      console.log(messages)
      messages.forEach((msg: any) => {
          const errorDetails = msg.split(',')[0];
          // Show toast notification for each error message
          showWarningMessage(errorDetails)
      });
      return Promise.reject(response.data.message.data[0]);
    }
  },
  async function (error) {
    // Handle the response error and included refresh token logic
    const originalRequest = error.config;
    // showWarningMessage(error.error.msg)
    console.log(error)
    if(error.response.status == 401 && error.response.data.error == "Token expired"){
      showWarningMessage(error.error)
      localStorage.clear();
      window.location.href = '/login';
    }
    else if (error.response && error.response.data.error) {
      const messages = error.response.data.error.msg;
      messages.forEach((msg: any) => {
          const errorDetails = msg.split(',')[0];
          // Show toast notification for each error message
          showWarningMessage(errorDetails)
      });
    }
    else{
      showWarningMessage(error.config.message)   
    }
    // if (error.response.status === 401 && error.response.message == "Token Expired") {
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
    // if (error.response.status === 401 && error.response.message == "Unauthorized") {
    //     localStorage.clear();
    //     window.location.href = '/';
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;