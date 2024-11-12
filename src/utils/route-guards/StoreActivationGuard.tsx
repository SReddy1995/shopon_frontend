import { Navigate, useLocation } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";

const StoreActivationGuard = ({ children }: any) => {
    const location = useLocation();
    let selectedStore = null;
    selectedStore = useSelector((store: any) => store.stores.selectedStore);
    if(selectedStore === null){
        selectedStore = localStorage.getItem('selected_store') ? JSON.parse(localStorage.getItem('selected_store') || '{}') : null;
    }
    console.log(selectedStore)

	return selectedStore && selectedStore.status && selectedStore.status !== null ? children : <Navigate to="/landing-page/account"  replace/>;
};

export default StoreActivationGuard;