import { Navigate } from "react-router-dom";
import React from 'react';
import { useDispatch } from "react-redux";
import { updateSelectedStore, updateStoresList } from "../reduxStore/storesSlice";
import { updateReferenceValues } from "../reduxStore/referenceValuesSlice";
import { AccountUrls } from "../constants/UrlConstants";
import { axiosInstance } from "../interceptor/genericAxiosInsatnce";

const AuthGuardRoutes = ({ children }: any) => {

    const dispatch = useDispatch();

    const addStoresToRedux = (state: any) => {
      dispatch(updateStoresList(state));
    };
  
    const updateSelectedStoreToRedux = (state: any) => {
        dispatch(updateSelectedStore(state));
      };

    const addReferencesToStore = (state: any) => {
        dispatch(updateReferenceValues(state));
      };

      const fetchRef = async () => {
        const response = await axiosInstance.get(AccountUrls.getRefValues )
        return response;
      }

    let localStorageToken = null;
    if (localStorage.getItem("token")){
        localStorageToken = localStorage.getItem("token");
        addStoresToRedux(JSON.parse(localStorage.getItem("associated_stores") || '{}'));
        updateSelectedStoreToRedux(JSON.parse(localStorage.getItem("selected_store") || '{}'));
        fetchRef().then((data: any)=>{
          addReferencesToStore(data[0])
        })
        .catch((err: any) => {
          console.log(err)
        });
    }
	return localStorageToken ? children : <Navigate to="/login"  replace/>;
};

export default AuthGuardRoutes;