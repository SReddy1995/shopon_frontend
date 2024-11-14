import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateSidebarState } from "../../../utils/reduxStore/sideBarSlice";
import { useSelector } from "react-redux";

const SidebarLinkContainer = styled.div`
  
`;

const SidebarLink = styled(NavLink)<{ depth: any; depthstep: any }>`
  display: flex;
  color: ${(props) => props.depth === 1 ? 'black' : 'rgb(97,97,97)'};
  justify-content: space-between;
  align-items: center;
  padding: 5px ${(props) => (props.depth * (props.depthstep+8))}px;
  padding-left: 8px;
  list-style: none;
  height: 35px;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 550;
  margin-top: 1px;
  color:#303030;
  font-size:13px;
  line-height: 40px;

  &:hover {
    text-decoration: none;
    color: #006C50;
    background: #e4e5e5; ;
    
  }
`;

const IconContainer = styled.span`
 
`;

const SidebarLabel = styled.span<{ depth: any}>`
  padding-left: ${(props) => props.depth === 1 ? 0 : 40}px;
  font-size: 13px;
  font-weight: inherit;
  color: ${(props) => props.depth === 1 ? '#303030' : 'rgba(97, 97, 97, 1)'};
  margin-left: ${(props) => props.depth === 1 ? 8 : 0}px;
    &:hover {
     color: ${(props) => props.depth === 1 ? '#006C50;' : '#006c50'};
}
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 13px;
`;

interface SubMenuProps {
  item: any;
  depth: number;
  depthstep: any;
}

const SubMenu = ({ item, depth, depthstep}: SubMenuProps) => {

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const device = useSelector((store: any) => store.sidebar.device);

  const dispatch = useDispatch();

  const handleSideBarToggle = (state: any) => {
    dispatch(updateSidebarState(state));
  };

  const handleClickOnLink = (e: any) => {
    if (item.subNav) {
      e.preventDefault();
      showSubnav();
    } else {
      if (device === "mobile") {
        handleSideBarToggle(false);
      }
    }
  };

  return (
    <>
    <SidebarLinkContainer>
      <SidebarLink
        to={item.path}
        depth={depth}
        depthstep={depthstep}
        onClick={handleClickOnLink}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <SubMenuContainer>
          <IconContainer>
            {item.icon}
          </IconContainer>
          <SidebarLabel depth={depth}>{item.title}</SidebarLabel>
        </SubMenuContainer>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item: any, index: number) => {
          return (
            <SubMenu
              depth={depth + 1}
              depthstep={depthstep}
              item={item}
              key={index}
            />
          );
        })}
      </SidebarLinkContainer>
    </>
  );
};

export default SubMenu;
