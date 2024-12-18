import { Navigate } from "react-router-dom";
import React from 'react';
import { useDispatch } from "react-redux";
import { updateSelectedStore, updateStoresList } from "../reduxStore/storesSlice";
import { updateReferenceValues } from "../reduxStore/referenceValuesSlice";
import { AccountUrls } from "../constants/UrlConstants";
import { axiosInstance } from "../interceptor/genericAxiosInsatnce";

const AuthGuardRoutes = ({ children }: any) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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
        const response = await axiosInstance.get(AccountUrls.getRefValues);
        return response;
    };

    React.useEffect(() => {
        const checkAuth = async () => {
            let localStorageToken = null;
            if (localStorage.getItem("token")) {
                localStorageToken = localStorage.getItem("token");
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
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    console.log("entering")

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuardRoutes;