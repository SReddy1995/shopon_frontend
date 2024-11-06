import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import React from 'react';
import Account from "./components/LandingPages/Account";
import Dashboard from "./components/LandingPages/Dashboard";
import Home from "./components/AuthPages/Home";
import Login from "./components/AuthPages/Login";
import Register from "./components/AuthPages/Register";
import LandingPage from "./components/LandingPages/LandingPage";
import Profile from "./components/LandingPages/Profile";
import Collections from "./components/LandingPages/Collections";
import Inventory from "./components/LandingPages/Inventory";
import ThankPage from "./components/AuthPages/ThankPage";
import UserManagement from "./components/LandingPages/UserManagement";
import AuthGuardRoutes from "./utils/route-guards/AuthGuardRoutes";
import StoreActivationGuard from "./utils/route-guards/StoreActivationGuard";
import Logout from "./components/LandingPages/Logout";
import ProductsList from "./components/LandingPages/ProductsList";
import MapComponent from "./components/LandingPages/MapComponent";
import PreviewProducts from "./components/LandingPages/PreviewProducts";
import RoleGuard from "./utils/route-guards/RoleGuard";
import Finance from "./components/LandingPages/Finance";

export const AppRoutes = () => {
  const childRoutes = [
    {
      path: "/landing-page/dashboard",
      element:<RoleGuard requiredRole={['Admin']}>
                  <Dashboard />
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
      element:<Navigate to="/home" replace />
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
  ]);

  return <RouterProvider router={router} />;
};
