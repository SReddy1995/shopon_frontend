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

export const getLegalEntityDetails = async (buyer_id : any) => {
    try{
  
        const response = await axiosInstance.get(AccountUrls.getLegalEntity + '/' + buyer_id) // Replace with your API endpoint
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
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
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