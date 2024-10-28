import axiosInstance from "../utils/interceptor/axiosInstance";
import { AccountUrls } from "../utils/constants/UrlConstants";
import { jwtDecode } from "jwt-decode";


export const getReferenceValues = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getRefValues ) // Replace with your API endpoint
        
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

export const getLegalEntityDetails = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getLegalEntity) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const getAccountDetails = async (buyer_id : any) => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getAccountDetails + '/' + buyer_id) // Replace with your API endpoint
        setAuthTokens(response)
        setUserDetails(response)
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

    const setAuthTokens = (response: any) => {
        localStorage.setItem('token', response[0].token);
    }

    const setUserDetails = (response: any) => {
        const user_details = jwtDecode(response[0].token)
        localStorage.setItem('user_details', JSON.stringify(user_details));
    }

  export const saveRegistrationDetails = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(AccountUrls.saveAccountDetails, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const saveLegalEntityDetails = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(AccountUrls.saveLegalEntity, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const getBankInfo = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getBankInfo) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const saveBankInfo = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(AccountUrls.saveBankInfo, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const getOnlineStore = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getOnlineStore) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const saveOnlineStore = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(AccountUrls.saveOnlineStore, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const getDocumentDetailsList = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getDocumentsDetailsList) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const uploadDocument = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(AccountUrls.uploadDocument, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const deleteDocument = async (document_type : any) => {
    try{
  
        const response = await axiosInstance.delete(AccountUrls.deleteDocument+ '/' + document_type) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const downloadDocuments = async () => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.downloadDocumentsZip,{
            responseType: 'blob', // Important: Set response type to 'blob'
          })
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }