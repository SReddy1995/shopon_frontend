import React from 'react';
import styled from 'styled-components';

const TopBarContainer = styled.div`
    height: 60px;
    width: 100%;
    background-color: black;
    display: flex;
    flex-direction: row;
    justify-content: start;
    border-bottom: 6px solid darkgray;
`;

const LogoContainer = styled.div`
    padding-left: 10px;
    display: flex;
    align-items: center;
`;

const LogoFaIcon = () => {
    return <i className="fa fa-shopping-bag"></i>;
  };

const LogoIcon = styled(LogoFaIcon)`
  color: white;
  font-size: 1rem;
`;

const TitleContainer = styled.div`
    padding-left: 5px;
    display: flex;
    align-items: center;
`;

const ApplicationTitle = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  font-style: italic;
`;

const AuthPageTopBar = () => {

    return (
        <>
            <TopBarContainer>
                <LogoContainer>
                    <LogoIcon />
                </LogoContainer>
                <TitleContainer>
                    <ApplicationTitle>Shop ON</ApplicationTitle>
                </TitleContainer>
            </TopBarContainer>
        </>
    ) 

}

export default AuthPageTopBar;