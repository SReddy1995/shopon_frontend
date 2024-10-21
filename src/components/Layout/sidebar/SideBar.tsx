
import React, { useState } from "react";
import styled from "styled-components";
import SubMenu from "./SubMenu";
import { useSelector } from "react-redux";
import { SidebarData } from "./SidebarData";

const SidebarNav = styled.nav`
  overflow-y: auto;
  background: #EBEBEB;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  transition: 350ms;
  z-index: 10;
  width: 100%;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const SideBar = () => {
    const roles = localStorage.getItem('user_details') ? (JSON.parse(localStorage.getItem('user_details') || '{}').roles) : null;

    return (
      <SidebarNav>
        <SidebarWrap>
          {SidebarData
          .filter(menu => 
            menu.scopes.filter(scope => roles.indexOf(scope) !== -1).length > 0)
          .map((item, index) => {
            return <SubMenu item={item} key={index} depth={1} depthstep={10}/>
          })}
        </SidebarWrap>
      </SidebarNav>
    );
  };
  export default SideBar;