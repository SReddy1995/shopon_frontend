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

export const AppRoutes = () => {
  const childRoutes = [
    {
      path: "/landing-page/dashboard",
      element: <StoreActivationGuard>
                  <Dashboard />,
              </StoreActivationGuard>
    },
    {
      path: "/landing-page/account",
      element: <Account />,
    },
    {
      path: "/landing-page/profile",
      element: <StoreActivationGuard>
                  <Profile />,
               </StoreActivationGuard>
    },
    {
      path: "/landing-page/products/collections",
      element: <StoreActivationGuard>
                  <Collections />,
               </StoreActivationGuard>
    },
    {
      path: "/landing-page/products/inventory",
      element: <StoreActivationGuard>
                <Inventory />
               </StoreActivationGuard>,
    },
    {
      path: "/landing-page/manage-users",
      element: <StoreActivationGuard>
                  <UserManagement />
               </StoreActivationGuard>
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
