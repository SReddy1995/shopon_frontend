import { Navigate } from "react-router-dom";
import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { updateSelectedStore, updateStoresList } from "../reduxStore/storesSlice";
import { updateReferenceValues } from "../reduxStore/referenceValuesSlice";
import { AccountUrls } from "../constants/UrlConstants";
import { axiosInstance } from "../interceptor/genericAxiosInsatnce";

const AuthGuardRoutes = ({ children }: any) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const addStoresToRedux = useCallback((state: any) => {
        dispatch(updateStoresList(state));
    },[dispatch]);

    const updateSelectedStoreToRedux = useCallback((state: any) => {
        dispatch(updateSelectedStore(state));
    },[dispatch]);

    const addReferencesToStore = useCallback((state: any) => {
        dispatch(updateReferenceValues(state));
    },[dispatch]);

    const fetchRef = async () => {
        const response = await axiosInstance.get(AccountUrls.getRefValues);
        return response;
    };

    React.useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("token")) {
                addStoresToRedux(JSON.parse(localStorage.getItem("associated_stores") || '{}'));
                updateSelectedStoreToRedux(JSON.parse(localStorage.getItem("selected_store") || '{}'));
                try {
                    const data: any = await fetchRef();
                    addReferencesToStore(data[0]);
                    console.log("ref res received");
                } catch (err) {
                    console.log(err);
                }
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [addReferencesToStore, addStoresToRedux, updateSelectedStoreToRedux]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log("entering")

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuardRoutes;