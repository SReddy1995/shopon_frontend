
import { CollectionUrls } from "../utils/constants/UrlConstants";
import storeServiceAxiosInstance from "../utils/interceptor/storeServiceAxiosInstance";



  export const getShopifyProducts = async (body: any) => {
    try {
      const response = await storeServiceAxiosInstance.post(CollectionUrls.fetchShopifyProducts, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };

  export const deleteProductFromCollection = async (body: any) => {
    try {
      const response = await storeServiceAxiosInstance.post(CollectionUrls.deleteShopifyProduct, body);  // Adjust the endpoint accordingly
      return response;
    } catch (error) {
        console.error('Error fetching data: ', error);
      throw error;  // Throw the error so the calling component can handle it
    }
  };
  

