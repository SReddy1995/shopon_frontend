import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo-black.png';

const Home = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const navigateToRegister = () => {
        navigate("/register");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])

    return (
        <>
            {
                !loading &&
                <div className="index-body">
                    <div className="custom-container">
                        <div className="row m-5 no-gutters shadow index-card">
                        <div className="col-md-6 d-none d-md-block">
                            <img 
                                src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" 
                                className="img-fluid" 
                                style={{ minHeight: '100%' }} 
                                alt=""
                            />
                        </div>
                        <div className="col-md-6 bg-white p-5 box">

                            {/* <h2 className="index-logo pb-4">Shop On</h2> */}
                            <img src={logo} style={{margin:'auto',width:'250px'}} className='mb-4'/>
                    
                        <div className="form-style">
                        
                        <div>
                                    <button type="submit" 
                                            className="btn btn-primary w-100 font-weight-bold mt-2 landingpageBtn" 
                                            style={{ height: '50px' }}
                                            onClick={() => navigateToRegister()}
                                    >
                                        Sign Up
                                    </button>
                                    <button type="submit" 
                                            className="btn btn-dark w-100 font-weight-bold mt-2 landingpageBtn" 
                                            style={{ height: '50px' }}
                                            onClick={() => navigateToLogin()}
                                    >
                                        Login
                                    </button>
                        </div>
                        
                        </div> 
                        
                        </div>
                        </div>
                        </div>
                </div>
            }
        </>
    ) 

}

export default Home;