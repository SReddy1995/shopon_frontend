import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankPage = () => {

    const navigate = useNavigate();

    const resendEmail = () => {

    }

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" ><span className="me-1"><i className="fa fa-shopping-bag" aria-hidden="true"></i></span>ShopOn</a>
                    <span style={{ fontSize:'30px',cursor:'pointer',color:'#fff'}} className="visible-xs">&#9776;</span>

                </div>


            </nav>
            <div className="content">
                <div className="wrapper-1">
                    <div className="wrapper-2">
                        <h1>Thank you for registering!</h1>
                        <p>We’re excited to have you on board.  </p>
                        <p>Please check your email for confirmation.</p>
                        <p>Our support team will contact you shortly via phone or email.</p>
                        <p>You can also reach us at: </p>
                        <p>
                            <i style={{ fontSize:'18px', color:'#000'}} className="fa">&#xf095;</i> : 080-12100900
                            <i style={{ fontSize:'18px',color:'#000'}} className="fa pl-2">&#xf0e0;</i> : ondc@opteamix.com
                        </p>
                        <p>Complete your profile by clicking <a className="anchor-text" onClick={() => goToLogin()}>here</a></p>
                    </div>
                    <div className="footer-like">
                        <p>Email not received?
                            <a onClick={() => resendEmail()}>Click here to send again</a>
                        </p>
                    </div>
                </div>
            </div>


        </>
    ) 

}

export default ThankPage;