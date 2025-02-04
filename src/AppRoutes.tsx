import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import React from 'react';
import Account from "./components/LandingPages/Account";
import Dashboard from "./components/LandingPages/Dashboard";
import Home from "./components/AuthPages/Home";
import Login from "./components/AuthPages/Login";
import Register from "./components/AuthPages/Register";
import LandingPage from "./components/LandingPages/LandingPage";
import Collections from "./components/LandingPages/Collections";
import ThankPage from "./components/AuthPages/ThankPage";
import UserManagement from "./components/LandingPages/UserManagement";
import AuthGuardRoutes from "./utils/route-guards/AuthGuardRoutes";
import Logout from "./components/LandingPages/Logout";
import ProductsList from "./components/LandingPages/ProductsList";
import PreviewProducts from "./components/LandingPages/PreviewProducts";
import RoleGuard from "./utils/route-guards/RoleGuard";
import Finance from "./components/LandingPages/Finance";
import StoreSwitchRouteGuard from "./utils/route-guards/StoreSwitchRouteGuard";
import RouteSwitch from "./components/LandingPages/RouteSwitch";
import StoreInactive from "./components/LandingPages/StoreInactive";
import Orders from './components/LandingPages/Orders';  
import OrderDetails from "./components/LandingPages/OrderDetails";
import ReturnDetails from "./components/LandingPages/ReturnDetails";
import Igm from "./components/LandingPages/Igm";
import IgmCreate from "./components/LandingPages/IgmCreate";

export const AppRoutes = () => {
  const childRoutes = [
    {
      path: "/landing-page/dashboard",
      element:<RoleGuard requiredRole={['Admin']}>
                  <Dashboard />
                </RoleGuard>
    },
    {
      path: "/landing-page/switch-store",
      element:<StoreSwitchRouteGuard>
                  <RouteSwitch />
                  </StoreSwitchRouteGuard>
    },
    {
      path: "/landing-page/orders/orders-list",
      element:<RoleGuard requiredRole={['Admin','Operator']}>
                  <Orders />
              </RoleGuard>
    },
    {
      path: "/landing-page/orders/igm-list",
      element:<RoleGuard requiredRole={['Admin','Operator']}>
                  <Igm />
              </RoleGuard>
    },
    {
      path: "/landing-page/orders/igm-create",
      element:<RoleGuard requiredRole={['Admin','Operator']}>
                  <IgmCreate />
              </RoleGuard>
    },
    {
      path: "/landing-page/orders/order-details",
      element:<RoleGuard requiredRole={['Admin','Operator']}>
                  <OrderDetails />
              </RoleGuard>
    },
    {
      path: "/landing-page/orders/return-details",
      element:<RoleGuard requiredRole={['Admin','Operator']}>
                  <ReturnDetails />
              </RoleGuard>
    },
    {
      path: "/landing-page/account",
      element: <RoleGuard requiredRole={['Admin','Operator']}>
                  <Account />
                </RoleGuard>,
    },
    {
      path: "/landing-page/products/collections",
      element: <RoleGuard requiredRole={['Admin','Inventory']}>
                  <Collections />
                </RoleGuard>
    },
    {
      path: "/landing-page/products/inactive-store",
      element: <RoleGuard requiredRole={['Inventory']}>
                  <StoreInactive />
                </RoleGuard>
    },
    {
      path: "/landing-page/products/products-list",
      element: <RoleGuard requiredRole={['Admin','Inventory']}>
                  <ProductsList />
                  </RoleGuard>
    },
    {
      path: "/landing-page/products/products-preview",
      element: <RoleGuard requiredRole={['Admin','Inventory']}>
                  <PreviewProducts />
                  </RoleGuard>
    },
    {
      path: "/landing-page/manage-users",
      element: <RoleGuard requiredRole={['Admin']}>
                  <UserManagement />
                  </RoleGuard>
    },
    {
      path: "/landing-page/finance",
      element: <RoleGuard requiredRole={['Admin','Finance']}>
                  <Finance />
                  </RoleGuard>
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Navigate to="/landing-page/switch-store" replace />
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/thank-you",
      element: <ThankPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/landing-page",
      element: <AuthGuardRoutes>
                  <LandingPage />
               </AuthGuardRoutes>,
      children: childRoutes,
    },
    {
        path: '*',
        element: <Navigate to="/home" replace />
    },
  ],{
    basename: process.env.REACT_APP_BASENAME,
  });

  return <RouterProvider router={router} />;
};
