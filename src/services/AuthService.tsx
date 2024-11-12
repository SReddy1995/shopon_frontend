import axiosInstance from "../utils/interceptor/axiosInstance";
import { AuthUrls } from "../utils/constants/UrlConstants";
import { jwtDecode } from "jwt-decode";



export const registerBuyer = async (body : any) => {
  try{
      const response = await axiosInstance.post(AuthUrls.register, body) // Replace with your API endpoint
      return response;

  } catch (error) {
      console.error('Error fetching data: ', error);
      // Handle errors here or throw them to be handled where the function is called
      throw error;
    }
}

export const requestOtpForLogin = async (body : any) => {
  try{

      const response = await axiosInstance.post(AuthUrls.requestGenerateOtp, body) // Replace with your API endpoint
      return response;

  } catch (error) {
      console.error('Error fetching data: ', error);
      // Handle errors here or throw them to be handled where the function is called
      throw error;
    }
}

 export const verifyLoginOTP = async (body: any) => {

    try{
        const response = await axiosInstance.post(AuthUrls.verifyOtpAndLogin, body) // Replace with your API endpoint
        console.log(response)
        setRegiteredStores(response)
        setSelectedStore(response)
        setAuthTokens(response)
        setUserDetails(response)
        return response;
        

    }catch (error) {
        console.error('Error fetching data: ', error);
        // Handle errors here or throw them to be handled where the function is called
        throw error;
      }

 }

const setDataInLocalStorage = (response: any) => {
    setRegiteredStores(response)
    setSelectedStore(response)
    setAuthTokens(response)
    setUserDetails(response)
}

const setRegiteredStores = (response: any) => {
    if(response[0].buyersDetails){
        localStorage.setItem('associated_stores', JSON.stringify(response[0].buyersDetails));
    }

}

const setSelectedStore = (response: any) => {
    if(response[0].lastAccessedBuyer){
        localStorage.setItem('selected_store', JSON.stringify(response[0].lastAccessedBuyer.buyer_id));
    }
   
}

const setAuthTokens = (response: any) => {
    localStorage.setItem('token', response[0].token);
}

const setUserDetails = (response: any) => {
    const user_details = jwtDecode(response[0].token)
    localStorage.setItem('user_details', JSON.stringify(user_details));
}
