import { Navigate } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import { SidebarData } from "../../components/Layout/sidebar/SidebarData";


const StoreSwitchRouteGuard = ({ children }: any) => {

    const navigateToAccount = () => {
        return <Navigate to={"/landing-page/account"} replace/>
      }
    
      const navigateToProducts = () => {
        return <Navigate to={"/landing-page/products/products-list"} replace/>
      }

      const navigateToStoreNotActive = () => {
        return <Navigate to={"/landing-page/products/inactive-store"} replace/>
      }
    
      const navigateToFinance = () => {
        return <Navigate to={"/landing-page/finance"} replace/>
      }


    const location = useSelector((store: any) => store.storeSwitch.locationToLoad);
    let userDetails =  localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null
    let requiredRole = SidebarData.filter((item: any)=>item.path===location).length>0? SidebarData.filter((item: any)=>item.path===location)[0].scopes:[]
    if(userDetails){
        const hasAtLeastOne = userDetails.roles.some((item: any) => requiredRole.includes(item));
        if(hasAtLeastOne){
            return  <Navigate to={location} replace/>;
        }
        else{
            if(userDetails.roles.includes('Admin')){
                return navigateToAccount();
              }
              else if(userDetails.roles.includes('Operator')){
                return navigateToAccount();
              }
              else if(userDetails.roles.includes('Inventory') && userDetails.is_active === 'ACTIVE'){
                return navigateToProducts();
              }
              else if(userDetails.roles.includes('Inventory') && userDetails.is_active !== 'ACTIVE'){
                return navigateToStoreNotActive();
              }
              else if(userDetails.roles.includes('Finance')){
                return navigateToFinance();
              }
        }
        
    }
    return <Navigate to="/login" replace/>
	
};

export default StoreSwitchRouteGuard;