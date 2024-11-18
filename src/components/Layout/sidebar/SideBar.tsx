
import React from "react";
import styled from "styled-components";
import SubMenu from "./SubMenu";
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


const SideBar = (props: any) => {

    return (
      <SidebarNav>
        <SidebarWrap>
          {SidebarData
          .filter(menu => 
            menu.scopes.filter(scope => props.roles.indexOf(scope) !== -1).length > 0)
          .map((item, index) => {
            if(item.id !== 'product'){
              return <SubMenu item={item} key={index} depth={1} depthstep={10}/>
            }
            else if(item.id === 'product' && props.store_status === 'ACTIVE'){
              return <SubMenu item={item} key={index} depth={1} depthstep={10}/>
            }
          })}
        </SidebarWrap>
      </SidebarNav>
    );
  };
  export default SideBar;