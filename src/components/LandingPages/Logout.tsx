import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSelectedStore, updateStoresList } from '../../utils/reduxStore/storesSlice';

const Logout = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateStoresList(null));
        dispatch(updateSelectedStore(null));
        localStorage.clear();
        navigateToLogin();
      },[]);

    return (
        <>
        <h1>
            Logout
        </h1>
        </>
    ) 

}

export default Logout;