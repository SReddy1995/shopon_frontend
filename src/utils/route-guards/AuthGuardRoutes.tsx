import { Navigate, Outlet, useLocation } from "react-router-dom";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedStore, updateStoresList } from "../reduxStore/storesSlice";
import { getReferenceValues } from "../../services/AccountService";
import { updateReferenceValues } from "../reduxStore/referenceValuesSlice";
import axiosInstance from "../interceptor/axiosInstance";
import { AccountUrls } from "../constants/UrlConstants";

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
        fetchRef().then((data)=>{
          addReferencesToStore(data)
        })
    }
	return localStorageToken ? children : <Navigate to="/login"  replace/>;
};

export default AuthGuardRoutes;