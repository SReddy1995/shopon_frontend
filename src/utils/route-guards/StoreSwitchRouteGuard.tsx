import { Navigate, } from "react-router-dom";
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";


const StoreSwitchRouteGuard = ({ children }: any) => {
    const location = useSelector((store: any) => store.storeSwitch.locationToLoad);

	return  <Navigate to={location} replace/>;
};

export default StoreSwitchRouteGuard;