import axiosInstance from "../utils/interceptor/axiosInstance";
import { UserUrls } from "../utils/constants/UrlConstants";
import { jwtDecode } from "jwt-decode";


export const getUsersList = async () => {
    try{
  
        const response = await axiosInstance.get(UserUrls.getUsersList ) // Replace with your API endpoint
        
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const createUser = async (body : any) => {
    try{
  
        const response = await axiosInstance.post(UserUrls.createUser, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }

  export const updateUser = async (body : any, user_id: any) => {
    try{
  
        const response = await axiosInstance.put(UserUrls.updateUser+ '/' + user_id, body) // Replace with your API endpoint
        return response;
  
    } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }
  }
