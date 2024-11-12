import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const navigateToRegister = () => {
        navigate("/register");
    }

    const navigateToLogin = () => {
        navigate("/login");
    }

    return (
        <>
            <div className="index-body">
                <div className="custom-container">
                    <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block">
                        <img 
                            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" 
                            className="img-fluid" 
                            style={{ minHeight: '100%' }} 
                            alt=""
                        />
                    </div>
                    <div className="col-md-6 bg-white p-5 box">

                        <h2 className="index-logo pb-4">Shop On</h2>
                
                    <div className="form-style">
                    
                    <div>
                                <button type="submit" 
                                        className="btn btn-primary w-100 font-weight-bold mt-2 " 
                                        style={{ height: '50px' }}
                                        onClick={() => navigateToRegister()}
                                >
                                    Sign Up
                                </button>
                                <button type="submit" 
                                        className="btn btn-dark w-100 font-weight-bold mt-2" 
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
        </>
    ) 

}

export default Home;