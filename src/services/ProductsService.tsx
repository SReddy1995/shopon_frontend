import { ProductSearchUrls, UserUrls } from "../utils/constants/UrlConstants";
import axios from "axios";
import productSearchAxiosInstance from "../utils/interceptor/productsSearchAxiosInstance";

export const initiateSearch = async (body: any) => {
    try {

      const response = await productSearchAxiosInstance.post(ProductSearchUrls.initiateSearch, body); // Replace with your API endpoint
      return response;

    } catch (error) {
      console.error('Error fetching data: ', error);
      // Handle errors here or throw them to be handled where the function is called
      throw error;
    }
  };

  export const getSearchResults = async (body: any) => {
    try {
      const response = await productSearchAxiosInstance.post(ProductSearchUrls.getSearchResults, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const getSellersList = async (body: any) => {
    try {
      const response = await productSearchAxiosInstance.post(ProductSearchUrls.getSellersList, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const getSpecialityList = async (body: any) => {
    try {
      const response = await productSearchAxiosInstance.post(ProductSearchUrls.getSpecialityList, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

