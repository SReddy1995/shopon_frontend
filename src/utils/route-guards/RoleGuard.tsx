import { Navigate } from "react-router-dom";
import React from 'react';

const RoleGuard = ({ children, requiredRole, ...rest } : any) => {

    let userDetails =  localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null
   if(userDetails){
    const hasAtLeastOne = userDetails.roles.some((item: any) => requiredRole.includes(item));
    
	return hasAtLeastOne ? children : <Navigate to="/logout"  replace/>;
};
}
export default RoleGuard;