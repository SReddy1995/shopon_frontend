import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from '../Layout/TopBar';
import SideBar from '../Layout/sidebar/SideBar';
import { useSelector } from 'react-redux';

const LayoutContainer = styled.div`
    height: 100vh;
    width:100%;
    background-color: #1A1A1A;
    display: flex;
    flex-direction: column;
`;

const MainContentContainer = styled.div`
    height: calc(100vh - 56px);
    width: 100%;
    background-color: #F1F1F1;
    display: flex;
    flex-direction: row;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const SidebarContainer = styled.div<{ sidebar: any }>`
    width: 240px;
    min-width: 240px;
    height: 100%;
    border-top-left-radius: 12px;
    padding-right: 12px;
    padding-top: 12px;
    background-color: #EBEBEB;
    overflow-y: auto;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    display: ${({ sidebar }) => (sidebar ? "block" : "none")};
`;

const OutletContainer = styled.div`
    width: calc(100% - 240px);
    height: 100%;
    background: transparent;
    overflow-y: auto;

    @media only screen and (max-width: 768px){
        width:100%;
    }
`;

const LandingPage = () => {

    useEffect(() => {
        console.log("inside landing page")
    });

    const [roles, setUserRoles] = useState(localStorage.getItem('user_details') ? (JSON.parse(localStorage.getItem('user_details') || '{}').roles) : null)
    const sidebarState = useSelector((store: any) => store.sidebar.show);
    const handleStoreSwitched = () => {
        setUserRoles(localStorage.getItem('user_details') ? (JSON.parse(localStorage.getItem('user_details') || '{}').roles) : null)
    }
    
    
    return (
        <>
        <LayoutContainer>
            <TopBar handleStoreSwitched={handleStoreSwitched}></TopBar>
            <MainContentContainer>
                <SidebarContainer sidebar={sidebarState ? 1 : undefined}>
                    <SideBar roles={roles}></SideBar>
                </SidebarContainer>
                <OutletContainer>
                    <Outlet/>
                </OutletContainer>
            </MainContentContainer>
        </LayoutContainer>
        </>
    ) 

}

export default LandingPage;