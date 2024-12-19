
import { OrderUrls } from "../utils/constants/UrlConstants";
import { orderServiceAxiosInstance } from "../utils/interceptor/genericAxiosInsatnce";



  export const getOrdersList = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.fetchOrdersList, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const getOrderDetails = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.fetchOrderDetails, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const fetchTrackOrderBySeller = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.trackOrderBySeller, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const fetchStatusBySeller = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.statusBySeller, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const fetchCancelOrderBySeller = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.cancelBySeller, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };
  

