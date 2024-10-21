import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateSidebarState } from "../../../utils/reduxStore/sideBarSlice";
import { useSelector } from "react-redux";

const SidebarLinkContainer = styled.div`
  padding-left: 12px;
`;

const SidebarLink = styled(NavLink)<{ depth: any; depthstep: any }>`
  display: flex;
  color: ${(props) => props.depth == 1 ? 'black' : 'rgb(97,97,97)'};
  justify-content: space-between;
  align-items: center;
  padding: 5px ${(props) => (props.depth * (props.depthstep+8))}px;
  padding-left: 8px;
  list-style: none;
  height: 30px;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 550;
  margin-top: 1px;

  &:hover {
    background: #F1F1F1;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
  }
`;

const IconContainer = styled.span`
 
`;

const SidebarLabel = styled.span<{ depth: any}>`
  margin-left: 8px;
  padding-left: ${(props) => props.depth == 1 ? 0 : 8}px;
  font-size: 0.8125rem;
  font-weight: inherit;
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
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
