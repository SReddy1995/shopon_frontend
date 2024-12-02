import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSelectedStore, updateStoresList } from '../../utils/reduxStore/storesSlice';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateStoresList(null));
        dispatch(updateSelectedStore(null));
        localStorage.clear();
        navigate("/login");
    }, [dispatch, navigate]);

    return (
        <div>
            <h1>Logout</h1>
        </div>
    );
}

export default Logout;
