
import React, { useState } from 'react';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { requestOtpForLogin, verifyLoginOTP } from '../../services/AuthService';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { LOGIN_SUCCESSFULL, OTP_SENT } from '../../utils/constants/NotificationConstants';
import logo from '../../assets/images/logo-black.png';

interface FormValues {
 email_address: string;
 otp: string;
 otp1: string,
 otp2: string,
 otp3: string,
 otp4: string,
 otp5: string,
 otp6: string
}

const loginValidationSchema = Yup.object().shape({
 email_address: Yup.string().email('Invalid email').required('Email is required'),
 otp: Yup.string(),
  otp1: Yup.string().length(1, 'Must be 1 character').required('Required'),
  otp2: Yup.string().length(1, 'Must be 1 character').required('Required'),
  otp3: Yup.string().length(1, 'Must be 1 character').required('Required'),
  otp4: Yup.string().length(1, 'Must be 1 character').required('Required'),
  otp5: Yup.string().length(1, 'Must be 1 character').required('Required'),
  otp6: Yup.string().length(1, 'Must be 1 character').required('Required'),
});

const Login = () => {

  const navigate = useNavigate();
  const [allowEnterOtp, setAllowEnterOtp] = useState(false);

  const navigateToDashboard = () => {
    navigate("/landing-page/dashboard");
  };

  const initialValues: FormValues = {
    email_address: '',
    otp: '',
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: ''
   };

   const login = (event : any, values: FormikValues)=> {
    let body = {
      email_address : values.email_address
    }
    requestOtpForLogin(body)
      .then((data: any) => {
        showSuccessMessage(OTP_SENT);
          setAllowEnterOtp(true);
      })
      .catch(err => {
          setAllowEnterOtp(false);
      });
   }
  
   const verifyOtp = (values: FormikValues,
    { setSubmitting }: FormikHelpers<FormValues>) => {
      let entered_otp = '';
          for (let i = 0; i < 6 ; i++) {
            entered_otp = entered_otp + values[`otp${i+1}`];
          }
      let payload = {
        email_address: values.email_address,
        otp: entered_otp
      }
     verifyLoginOTP(payload)
     .then((response: any) => {
      setSubmitting(false);
      routeBasedOnRole();
      
     })
     .catch(err => {
      setSubmitting(false);
     });
   }

  const routeBasedOnRole = () => {
   let userDetails =  localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null
   if(userDetails){
    if(userDetails.roles.includes('Admin')){
      navigateToAccount();
    }
    else if(userDetails.roles.includes('Operator')){
      navigateToAccount();
    }
    else if(userDetails.roles.includes('Inventory') && userDetails.is_active === 'ACTIVE'){
      navigateToProducts();
    }
    else if(userDetails.roles.includes('Inventory') && userDetails.is_active !== 'ACTIVE'){
      navigateToStoreNotActive();
    }
    else if(userDetails.roles.includes('Finance')){
      navigateToFinance();
    }
   }
  }

  const navigateToAccount = () => {
    navigate("/landing-page/account");
  }

  const navigateToProducts = () => {
    navigate("/landing-page/products/products-list");
  }

  const navigateToFinance = () => {
    navigate("/landing-page/finance");
  }

  const navigateToStoreNotActive = () => {
     navigate("/landing-page/products/inactive-store")
  }

  const handleChangeEvent = (event: any, index: any, setFieldValue: any) => {
    const { value } = event.target;

    // Only update the input if it's a valid character (0-9)
    if (/^[0-9]$/.test(value)) {
      setFieldValue(`otp${index + 1}`, value);
      const nextInput = document.getElementById(`otp${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (event : any, index: any, setFieldValue: any, values: any) => {
    if (event.key === 'Backspace') {
      const prevIndex = index - 1;
      if(values[`otp${index + 1}`] === ''){
        if(index > 0){
          setFieldValue(`otp${index}`, '');
        }
        const prevInput = document.getElementById(`otp${prevIndex + 1}`);
        if (prevInput) prevInput.focus();
      }
      else{
        setFieldValue(`otp${index + 1}`, '');
      }
    }
  };

  const handleEnterPressForSearch = (event: any, values: any) => {
    console.log(event, values)
    if (event.key === 'Enter') {
      event.preventDefault()
        login(event, values)
    }
  };

  return (
    <div className="register-page register-body">
      <div className="main">
        <div className="custom-container">
        <Formik
                  initialValues={initialValues}
                  validationSchema={loginValidationSchema}
                  onSubmit={(values: any, actions) => {
                      verifyOtp(values, actions);
                  }}
                  >
                  {({ errors, touched, values, handleSubmit, setFieldValue, isValid, dirty, resetForm, initialValues}) => (
                      <section className="wrapper">
                        {/* <h2 className="index-logo pb-4">Shop On</h2> */}
                        <img src={logo} style={{margin:'auto',width:'250px'}} className='mb-4'/>
                        <hr/>
                          <h3 className="text-center heading mt-2">Login</h3>

                          <form name="signin" className="form">

                            <div className="mb-3 form-field-container">
                              <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                              <Field 
                                    name="email_address" 
                                    type="email" 
                                    placeholder="Email Address"
                                    id="exampleFormControlInput1"
                                    disabled={allowEnterOtp} 
                                    className={errors.email_address && touched.email_address ? 'form-control input-field-error' : 'form-control'}
                                    onKeyDown={(e: any)=>handleEnterPressForSearch(e,values)}
                              />
                              <ErrorMessage className='error' name="email_address" component="div" />
                            </div>
                            {
                              !allowEnterOtp ?
                                <div className="input-control">
                                  <a className=" font-medium text-indigo-500 hover:text-indigo-600 w-100" id="proceed">
                                    <button type="button" className="btn-custom mt-2 w-100 font-weight-bold" onClick={(e) => {
                                      if (!errors.email_address && touched.email_address) {
                                        login(e, values);
                                      }
                                    }}
                                    >
                                      Proceed {('>>')}
                                    </button>
                                  </a>
                                </div>
                              :

                              <>
                                <div className="d-flex flex-column" id="otp-section">
                                  <header className="mb-8 d-flex flex-row flex-start">

                                    <p className="otp_enter_title pl-1 required">Enter the verification code recieved on your Email</p>
                                  </header>
                                  <div id="otp-form">
                                    <div className="otp_fields_container justify-content-center">
                                        {
                                          Array.from({ length: 6 }, (_, index) => (
                                            <div key={index}>
                                              <Field
                                                name={`otp${index + 1}`}
                                                id={`otp${index + 1}`}
                                                type="text"
                                                className="otp_input_field"
                                                onKeyDown={(event: any) => handleKeyDown(event, index, setFieldValue, values)}
                                                onChange={(event:any) => handleChangeEvent(event, index, setFieldValue)}
                                                maxLength={1}
                                              />
                                            </div>
                                          ))
                                        }
                                    </div>

                                  </div>
                                  <div className="otp_enter_title mt-4 d-flex flex-row flex-start">
                                    
                                    <p className="otp_enter_title pl-1">Didn't receive code?&nbsp;</p>
                                    <a className="anchor-text"                   
                                      onClick={(e) => {
                                                if(!errors.email_address && touched.email_address){
                                                  login(e, values);
                                                }
                                              }}>
                                      Resend
                                    </a>
                                  </div>
                                  <div className="text-center">
                                    <a className="btn-link"  >
                                      <button type={'button'} 
                                              disabled={!(isValid && dirty)}
                                              onClick={() => {
                                                handleSubmit();
                                              }} 
                                              className="btn-custom mt-2 w-100 font-weight-bold" 
                                              id="login"
                                      >
                                        Login
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              </>

                            }

                          </form>
                      </section>
                  )}
        </Formik>
        </div>
      </div>
    </div>
  )
  };
  
  export default Login;