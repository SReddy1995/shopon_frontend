
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateSidebarState } from '../../utils/reduxStore/sideBarSlice';
import { useNavigate } from 'react-router-dom';
import { updateSelectedStore } from '../../utils/reduxStore/storesSlice';
import { getAccountDetails } from '../../services/AccountService';
import { useLocation } from 'react-router-dom';
import { updateLOcationToReload } from '../../utils/reduxStore/storeSwitchSlice';
import logo from '../../assets/images/logo-white.png';

const OverlayMenuContainer = styled.div<{ overlaymenu: any }>`
  background-color: #FFFFFF;
  position: absolute;
  top: 60px;
  right: 10px;
  width: 300px;
  height: 390px;
  border-radius: 8px;
  box-shadow: inset 0 0 5px gray;
  display: ${({ overlaymenu }) => (overlaymenu ? "block" : "none")}
`;

const SidebarToggler = styled.div`
  display: none;
  
  @media only screen and (max-width: 768px){
    display: block;
  }
`;

const HamburgerFaIcon = () => {
    return <i className="fa fa-reorder"></i>;
  };

const BarsIcon = styled(HamburgerFaIcon)`
  color: white;
  font-size: 1.5rem;
`;

const TopBarContainer = styled.div`
    height: 56px;
    width: 100%;
    background: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LogoContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: white;
    padding-left: 16px;
`;

const ProfileContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding-right: 16px;
    cursor: pointer;
`;

const LogoFaIcon = () => {
    return <i className="fa fa-shopping-bag"></i>;
  };

const LogoIcon = styled(LogoFaIcon)`
    color: white;
    font-size: 2rem;
    align-self: center;
`;

const LogoTitle = styled.p`
    font-size: 17px;
    font-weight: 650;
    font-style: italic;
    color: white;
    margin-bottom: 0;
    margin-left:5px;
`;

const ProfileIcon = styled.div`
    width: 28px;
    height: 28px;
    background-color: #2CE0D4;
    font-size: 12px;
    font-weight: 450;
    align-items: center;
    border-radius: 8px;
    color: black;
    margin-right: 10px;
`;

const ProfileIconInitial = styled.p`
    font-size: 9px;
    font-weight: 450;
    line-height: 16px;
    color: black;
    margin-top: 6px;
    margin-bottom: 0px;
    align-self: center;
`;

const ProfileName = styled.p`
    font-size: 14px;
    font-weight: 550;
    line-height: 16px;
    color: #FFFFFF;
    margin-bottom: 0;
    margin-right: 10px;
`;

const TopBar = (props:any) => {

    const selectedStoreData = useSelector((store: any) => store.stores.selectedStore);
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sidebarState = useSelector((store: any) => store.sidebar.show);
  
    const handleSideBarToggle = () => {
      dispatch(updateSidebarState(!sidebarState));
    };

    const handleLogOut = () => {
        navigate("/logout");
    }

    const handleStoreSwitched = (store: any) => {
        getAccountDetails(store.buyer_id)
        .then((data: any) => {
            if(data){
                dispatch(updateSelectedStore(store.buyer_id));
                localStorage.setItem('selected_store', store.buyer_id)
                props.handleStoreSwitched();
                navigateToSwitchStore();
                // navigate(location.pathname)
            }
            else{
                // let default initial values load
            }
        })
        .catch((err: any) => {
            console.log(err)
        });
    }

    const navigateToDashBoard = () => {
        navigate("/landing-page/dashboard");
    };

    const navigateToSwitchStore = () => {
        dispatch(updateLOcationToReload(location.pathname))
        navigate("/landing-page/switch-store");
    };

    const stores_list = useSelector((store: any) => store.stores.storesList);

    return (
        <TopBarContainer>
            <LogoContainer>
                <SidebarToggler onClick={handleSideBarToggle}>
                    <BarsIcon />
                </SidebarToggler>
                {/* <LogoIcon></LogoIcon> */}
                <LogoTitle><img src={logo} style={{marginLeft:'-25px'}}/></LogoTitle>
            </LogoContainer>
            <ProfileContainer className="profile-container">
                <ProfileName >
                    { user_details ? user_details.legal_entity_name : '' } , {user_details.firstname + ' ' + user_details.lastname}
                </ProfileName>
                <ProfileIcon>
                    <ProfileIconInitial >{user_details.firstname.charAt(0).toUpperCase()+user_details.lastname.charAt(0).toUpperCase()}</ProfileIconInitial>
                </ProfileIcon>
                <div className="dropdown-menu pb-2" aria-labelledby="dropdownUser">
                    <div className="dropdown-item">
                        <h6>Linked Stores</h6>

                    </div>
                    {/* <div className="dropdown-divider"></div> */}
                    <div className="">
                        <ul className="list-unstyled">
                            <ul className="list-unstyled ms-4 px-2">
                                {
                                selectedStoreData && stores_list ?
                                stores_list
                                .map((store : any, index: any) => {
                                    return store.is_active !== 'INACTIVE' && <li key={index} onClick={() => handleStoreSwitched(store)}>
                                        <a className="dropdown-item ml-0 pl-0 ellipsis" >
                                            <span className="acc-icons"
                                                style={{ color: selectedStoreData && store.buyer_id == selectedStoreData ? 'green' : '' }}>
                                                <i className={selectedStoreData && store.buyer_id == selectedStoreData ? "fa fa-check-circle" : "fa fa-circle-thin"}></i>
                                            </span>
                                            <span className='ml-2'>
                                                {store.store_url}
                                            </span>
                                        </a>
                                            </li>
                                })
                            
                            :
                                <></>
                            }

                            </ul>
                            <div className="dropdown-divider"></div>


                        </ul>
                    </div>

                    <ul className="list-unstyled">
                        <li>
                            <a className="dropdown-item" onClick={handleLogOut}>
                            <span className="me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-power">
                                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg></span>
                                Log Out
                            </a>
                        </li>

                    </ul>

                </div>
            </ProfileContainer>

        </TopBarContainer>
    )
}

export default TopBar;