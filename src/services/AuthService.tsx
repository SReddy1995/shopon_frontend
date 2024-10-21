import axiosInstance from "../utils/interceptor/axiosInstance";
import { AccountUrls, AuthUrls } from "../utils/constants/UrlConstants";
import { jwtDecode } from "jwt-decode";



export const registerBuyer = async (body : any) => {
  try{

      body['contact_number'] = Number(body['contact_number'])
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
    const login_response = {
        "version": "1.0.0",
        "message": {
            "data": [
                {
                    "buyersDetails": [
                        {
                            "buyer_id": "1",
                            "store_url": "opteamix.com1",
                            "legal_entity_name": "Opteamix",
                            "has_existing_store": "Y",
                            "additional_info": "",
                            "subscriber_id": "opteamix",
                            "isActive": "active",
                            "createdAt": "2024-10-18T04:03:46.940Z",
                            "updatedAt": "2024-10-18T04:03:46.940Z",
                            "user_buyer_mapping": {
                                "createdAt": "2024-10-18T04:03:46.972Z",
                                "updatedAt": "2024-10-18T04:03:46.972Z",
                                "user_id": 1,
                                "buyer_id": "1"
                            },
                            "status": "Activated"
                        },
                        {
                            "buyer_id": "2",
                            "store_url": "opteamix.com2",
                            "legal_entity_name": "Opteamix",
                            "has_existing_store": "Y",
                            "additional_info": "",
                            "subscriber_id": "opteamix",
                            "isActive": "active",
                            "createdAt": "2024-10-18T04:03:46.940Z",
                            "updatedAt": "2024-10-18T04:03:46.940Z",
                            "user_buyer_mapping": {
                                "createdAt": "2024-10-18T04:03:46.972Z",
                                "updatedAt": "2024-10-18T04:03:46.972Z",
                                "user_id": 1,
                                "buyer_id": "1"
                            },
                            "status": null
                        },
                        {
                            "buyer_id": "3",
                            "store_url": "opteamix.com3",
                            "legal_entity_name": "Opteamix",
                            "has_existing_store": "Y",
                            "additional_info": "",
                            "subscriber_id": "opteamix",
                            "isActive": "active",
                            "createdAt": "2024-10-18T04:03:46.940Z",
                            "updatedAt": "2024-10-18T04:03:46.940Z",
                            "user_buyer_mapping": {
                                "createdAt": "2024-10-18T04:03:46.972Z",
                                "updatedAt": "2024-10-18T04:03:46.972Z",
                                "user_id": 1,
                                "buyer_id": "1"
                            },
                            "status": null
                        },
    
                    ],
                    "lastAccessedBuyer": {
                        "buyer_id": "2",
                        "email_address": "rjadar@opteamix.com",
                        "createdAt": "2024-10-18T04:03:46.979Z",
                        "updatedAt": "2024-10-18T04:03:46.979Z",
                        "status": null
                    },
                    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbF9hZGRyZXNzIjoicmphZGFyQG9wdGVhbWl4LmNvbSIsInJvbGVzIjpbIkFkbWluIl0sImZpcnN0bmFtZSI6IkogTSIsImxhc3RuYW1lIjoiUmFzaG1pIiwiaWF0IjoxNzI5MjI1NTUyLCJleHAiOjE3MjkyMjkxNTIsImlzcyI6Ik15IEFwcCJ9.U7k3Xj04ILVlx414hnd5N8cpp0Pj2XYPi1oCIuo8NFpsdtXUgjh6SfaiON7O5PzkGSu3HmpLVoByYo4McVlloGQSSA7f3bLj9vYULpmayzp80tFDQ_MEvhUOzMj9IbZU_rtP3DpZbUzuss6yPEcXmaMh50YwKFP4aavaaP-g_albmOrJtTKOdqPkVVoh7WrkYrDQkgerNYNp2hKKf51M46D7e2JLXuxKfzFiyY-y-ydHEXvAj_jxvr6pMhHEHOnX6K-00HTPEmQDaHEm8bBJyGLz5qAPF7H9_rC0ixjMNrGITrr6XRokTxxY7_NwPfEb5d9x72e_0IJYgK-Y1t2toebC3F60TqH_WH9f9QDsAiVPZ8GXsi9WWqZXD9AxED1r7xGctPJMaqYwfe9x4J8M1lOYBmTweT2vm-4BkazED4t7v-sfsAIDmR2Mrn8fVbS-4axT3ZEhtG0ELmfxh_ImdMf94rePUm4Ehze6u4GXaFWMVuGBJCnOZVeDH594Pbzp0hKSURnr_fmO_8k8GpgC72zBGqCMUnfmZa_EIRs2Sozpx90eUzomoRRlbM4A4ZHkBkK6-l5geu9Skgfdx_-a8m7BzjAr1Mg9Bfodog3gGAuFi6pv9bSiddp4Fk0YeElHjIM2dimVUDZW-DulLz-YJicwATGxa8VqgPqzEGIL3JU"
                }
            ]
        },
        "error": null
    }

    const actual_response = {
        "version": "1.0.0",
        "message": {
            "data": [
                {
                    "buyersDetails": [
                        {
                            "buyer_id": "100001",
                            "store_url": "https://test-store-url-1",
                            "legal_entity_name": "test entity1",
                            "has_existing_store": "Y",
                            "additional_info": "",
                            "subscriber_id": "https://test-store-url-1.shopon.opteamix.com",
                            "isActive": "active",
                            "createdAt": "2024-10-19T07:27:56.969Z",
                            "updatedAt": "2024-10-19T07:27:56.969Z",
                            "user_buyer_mapping": {
                                "createdAt": "2024-10-19T07:27:56.980Z",
                                "updatedAt": "2024-10-19T07:27:56.980Z",
                                "user_id": 2,
                                "buyer_id": "100001"
                            }
                        }
                    ],
                    "lastAccessedBuyer": {
                        "buyer_id": "100001",
                        "email_address": "ysarvamangala@opteamix.com",
                        "createdAt": "2024-10-19T07:27:56.982Z",
                        "updatedAt": "2024-10-19T07:27:56.982Z"
                    },
                    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbF9hZGRyZXNzIjoieXNhcnZhbWFuZ2FsYUBvcHRlYW1peC5jb20iLCJyb2xlcyI6WyJBZG1pbiJdLCJmaXJzdG5hbWUiOiJzYXJ2YW1hbmdhbGEiLCJsYXN0bmFtZSI6InlhdGhhZGEiLCJpYXQiOjE3Mjk0MDcxNTYsImV4cCI6MTcyOTQxMDc1NiwiaXNzIjoic3lzdGVtIHNlcnZpY2UifQ.asMdQ4VhiBR89zBBFCSSrQLNzk1MBaOqBmdEGEvwHx0qlbyjf8RuYAzXNZIeXPPosyU_aeyLUYb9Gmp4lSGCj5AoEqd0SeEq0t5aRZFvMpwj3pGk_FrfIOW-36ygGNp2tR8HNBgjnr8QyEnCAlVP5CMoEuK8jK4dD-SVJQuGb3a6fIaqhOgVjNo94TzwYV3mI6yOCscavVi_ABFfNbl68niz070yPuPmAyg6rv2-jrZuJGR3lruJ5FUJjTDG7LEK9mc95B9-jf7fKfDvTraJYgCjQc12eoWLwjftuUDuQq4rIehKwtpeD_nYEM65YP8MlcpQp1MGst4fvJwcYAQP32r1hfE7LrFj95yZgf7uRITwkB0heRG16V4UbYsGwgUN4NPEOlhAL3J8D8Q9eS_hYwP65d-JwHjG_5BlPpheUok7q1Ym45snO-xWsjKkl8Y6apW_v5hFwPX_oG5ZZudDUFgRpdbKgtFp_Kila5o4e-tt0JT6Cuo_m0LrqyP8lDAFusq1QM9F2eDgpCu6b1OREKaf1tm1fEvgo4DPkMziv7eQwadoRHrvyufsn6EBUt5s0Uz4YAGtjilcg10igKPrzuiFsUvbu9ATPw1d97DsV1qdDS2p79MStfpm1797eppDxabbGh3PNy92S6WTw2CmxHM2EpLe7iYHJLJwH8E27ng"
                }
            ]
        },
        "error": null
    }

    try{
        const response = await axiosInstance.post(AuthUrls.verifyOtpAndLogin, body) // Replace with your API endpoint
        console.log(response)
        setRegiteredStores(response)
        setLastAccessedStore(response)
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
    setLastAccessedStore(response)
    setAuthTokens(response)
    setUserDetails(response)
}

const setRegiteredStores = (response: any) => {
    if(response[0].buyersDetails){
        localStorage.setItem('associated_stores', JSON.stringify(response[0].buyersDetails));
    }

}

const setLastAccessedStore = (response: any) => {
    if(response[0].lastAccessedBuyer){
        localStorage.setItem('last_accessed_store', JSON.stringify(response[0].lastAccessedBuyer));
    }
   
}

const setAuthTokens = (response: any) => {
    localStorage.setItem('token', response[0].token);
}

const setUserDetails = (response: any) => {
    const user_details = jwtDecode(response[0].token)
    localStorage.setItem('user_details', JSON.stringify(user_details));
}
