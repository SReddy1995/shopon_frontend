import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png';

const ThankPage = () => {

    const navigate = useNavigate();

    const resendEmail = () => {

    }

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <>

            <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{height:'56px'}}>
                <div className="container-fluid">
                    <a className="navbar-brand" style={{marginLeft:'-10px'}}><img src={logo} style={{marginLeft:'-25px'}} alt="logo"/></a>

                </div>


            </nav>
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1>Thank you for registering!</h1>
                        <p  style={{ marginTop:'-5px'}}>We’re excited to have you on board.  </p>
                        <p>Please check your email for confirmation.</p>
                        <p>Our support team will contact you shortly via phone or email.</p>
                        <p>You can also reach us at: </p>
                        <p>
                            <i style={{ fontSize:'18px', color:'#000'}} className="fa">&#xf095;</i> : 080-12100900
                            <i style={{ fontSize:'18px',color:'#000'}} className="fa pl-2">&#xf0e0;</i> : ondc@opteamix.com
                        </p>
                        <p style={{ marginBottom:'-5px'}}>Complete your profile by clicking <span className="anchor-text cursor-pointer" onClick={() => goToLogin()}>here</span></p>
                    </div>
                    <div className="footer-like">
                        <p>Email not received?
                            <span onClick={() => resendEmail()}>Click here to send again</span>
                        </p>
                    </div>
                </div>
            </div>


        </>
    ) 

}

export default ThankPage;