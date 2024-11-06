import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const selectedStore = useSelector((store: any) => store.stores.selectedStore);
    return (
        <>
        <h1>
            Dashboard
        </h1>
        </>
    ) 

}

export default Dashboard;