
import { OrderUrls } from "../utils/constants/UrlConstants";
import { orderServiceAxiosInstance, reconServiceAxiosInstance } from "../utils/interceptor/genericAxiosInsatnce";



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

  export const getUpdatedStatusesForOrder = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.fetchUpdatedStatusesForOrder, body);  // Adjust the endpoint accordingly
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

  export const fetchTrackDetailsBySeller = async (body: any) => {
    try {
      const response = await orderServiceAxiosInstance.post(OrderUrls.trackDetailsBySeller, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const fetchSettleOrderBySeller = async (body: any) => {
    try {
      const response = await reconServiceAxiosInstance.post(OrderUrls.settleOrderBySeller, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const fetchSettleDetailsBySeller = async (body: any) => {
    try {
      const response = await reconServiceAxiosInstance.post(OrderUrls.settleDetailsBySeller, body);  // Adjust the endpoint accordingly
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

  export const getExportedOrdersInCSV = async (body: any) => {
    try{
  
        const response = await orderServiceAxiosInstance.post(OrderUrls.downloadOrdersCsv, body,{
            responseType: 'blob', // Important: Set response type to 'blob'
          })
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }
  

