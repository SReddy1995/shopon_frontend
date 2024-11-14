import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues } from 'formik';
import { registerBuyer } from '../../services/AuthService';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { REGISTRATION_SUCCESSFULL } from '../../utils/constants/NotificationConstants';
import logo from '../../assets/images/logo-black.png';

interface FormValues {
  firstname: string;
  lastname: string;
  contact_number: number;
  email_address: string;
  legal_entity_name: string;
  has_existing_store: string;
  store_url: string;
  additional_info: string;
 }

 const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

 const registerValidationSchema = Yup.object().shape({
  firstname: Yup.string()
  .required('Required'),
  lastname: Yup.string()
  .required('Required'),
  contact_number: Yup.string()
   .min(10, 'Contact number must be 10 characters')
   .max(10, 'Contact number must be 10 characters')
   .required('Contact number is required'),
  email_address: Yup.string().email('Invalid email format').matches(emailRegex,'Invalid format').required('Email is required'),
  legal_entity_name: Yup.string()
  .required('Required'),
  has_existing_store: Yup.string().required("Required"),
  store_url: Yup.string()
  .required('Required'),
  additional_info: Yup.string(),
 });

const Register = () => {

  const navigate = useNavigate();

  const navigateToThankYouPage = () => {
      navigate("/thank-you");
  }

  const registerUser = (values: FormikValues) => {
    registerBuyer(values)
     .then(response => {
      showSuccessMessage(REGISTRATION_SUCCESSFULL)
      navigateToThankYouPage();
     })
     .catch(error => {
      console.log("error caught")
     })
  }

  const initialValues = {
    firstname: '',
    lastname: '',
    contact_number: '',
    email_address: '',
    legal_entity_name: '',
    has_existing_store: 'Y',
    store_url: '',
    additional_info: '',
   };

   const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div className="register-body">

        <main className="main">
          <div className="custom-container">
            <section className="wrapper">
              {/* <h2 className="index-logo pb-4">Shop On</h2> */}
              <img src={logo} style={{margin:'auto',width:'250px'}} className='mb-4'/>
              <hr/>
              <h3 className="text-center heading mt-2">Registration</h3>
              <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={(values, actions) => {
                  console.log("register form submitted")
                  actions.setSubmitting(false);
                  registerUser(values);
                }}
              >
                {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                  <form name="signin" className="form ">

                    <div className="name-field">
                      <div className="mb-3 form-field-container">
                        <label htmlFor="exampleFormControlInput1" className="form-label required">First Name</label>
                        <Field 
                              name="firstname" type="text" 
                              className={errors.firstname && touched.firstname ? 'form-control input-field-error' : 'form-control'} 
                              id="exampleFormControlInput1" 
                              placeholder="First Name" 
                        />
                        <ErrorMessage className='error' name="firstname" component="div" />
                      </div>

                      <div className="mb-3 form-field-container">
                        <label htmlFor="exampleFormControlInput1" className="form-label required">Last Name</label>
                        <Field 
                              name="lastname" type="text" 
                              className={errors.lastname && touched.lastname ? 'form-control input-field-error' : 'form-control'} 
                              id="exampleFormControlInput1" 
                              placeholder="Last Name" 
                        />
                        <ErrorMessage className='error' name="lastname" component="div" />
                      </div>
                    </div>

                    <div className="mb-3 form-field-container">
                      <label htmlFor="exampleFormControlInput1" className="form-label required">Phone Number</label>
                      <Field
                                  placeholder="Phone Number"
                                  name="contact_number"
                                  type="text"
                                  id="exampleFormControlInput1"
                                  className={errors.contact_number && touched.contact_number ? 'form-control input-field-error' : 'form-control'} 
                                  onKeyPress={(e: any) => {
                                    if (!/[0-9]/.test(e.key)) {
                                      e.preventDefault();
                                    }
                                  }}
                        />
                      <ErrorMessage className='error' name="contact_number" component="div" />
                    </div>

                    <div className="mb-3 form-field-container">
                      <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                      <Field name="email_address" 
                             type="email" 
                             id="exampleFormControlInput1"
                             placeholder="Email Address"
                             className={errors.email_address && touched.email_address ? 'form-control input-field-error' : 'form-control'} 
                      />
                      <ErrorMessage className='error' name="email_address" component="div" />
                    </div>




                    <div className="striped">
                      <span className="striped-line"></span>
                      <span className="striped-text">Store Information</span>
                      <span className="striped-line"></span>
                    </div>

                    <div className="mb-3 form-field-container">
                      <label htmlFor="exampleFormControlInput1" className="form-label required">Legal Entity Name</label>
                      <Field 
                            name="legal_entity_name" 
                            type="text" 
                            id="exampleFormControlInput1"
                            placeholder="Legal Entity Name"
                            className={errors.legal_entity_name && touched.legal_entity_name ? 'form-control input-field-error' : 'form-control'} 
                      />
                      <ErrorMessage className='error' name="legal_entity_name" component="div" />
                    </div>

                    <div className="custom-radio-box">
                      <div className="input-control custom-radio-label">
                        <label htmlFor="email" className="input-label" >Do you have the store already ?</label>
                      </div>
                      <div className="radio-buttons-container">

                        <div className="radio-button">
                          <Field 
                            name="has_existing_store" 
                            type="radio" 
                            id="radio2"
                            placeholder="Legal Entity Name"
                            value="Y"
                            className={errors.has_existing_store && touched.has_existing_store ? 'radio-button__input input-field-error' : 'radio-button__input'} 
                          />
                          <label htmlFor="radio2" className="radio-button__label">
                            <span className="radio-button__custom"></span>

                            Yes
                          </label>
                        </div>
                        <div className="radio-button">
                          <Field 
                            name="has_existing_store" 
                            type="radio" 
                            id="radio1"
                            placeholder="Legal Entity Name"
                            value="N"
                            className={errors.has_existing_store && touched.has_existing_store ? 'radio-button__input input-field-error' : 'radio-button__input'} 
                          />
                          <label htmlFor="radio1" className="radio-button__label">
                            <span className="radio-button__custom"></span>

                            No
                          </label>
                        </div>
                      </div>

                    </div>

                    <div className="mb-3 form-field-container">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        <span className='required'>
                          Store Url
                        </span>
                        <span
                          className="info-icon"
                          onMouseEnter={() => setShowTooltip(true)}  // Show tooltip on hover
                          onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when hover ends
                        >
                          <i className='fa fa-info'
                          ></i>
                          {showTooltip && (
                            <div className="info-tooltip">
                              Url should be in a valid format ex:https://eazehub.com
                            </div>
                      )}
                        </span>
                      </label>
                      <Field 
                            name="store_url" 
                            type="text" 
                            className={errors.store_url && touched.store_url ? 'form-control input-field-error' : 'form-control'} 
                      />
                      <ErrorMessage className='error' name="store_url" component="div" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Additional Information</label>
                      <Field 
                            name="additional_info" 
                            component="textarea" 
                            id="exampleFormControlTextarea1"
                            rows={3}
                            placeholder="Other Information"
                            className={errors.additional_info && touched.additional_info ? 'form-control input-field-error' : 'form-control'} 
                      />
                      <ErrorMessage className='error' name="additional_info" component="div" />
                    </div>
                    <div className="text-center">
                      <a className="btn-link">
                          <button type="button" className="btn-custom  w-100 mt-2" disabled={!(isValid && dirty) || isSubmitting}
                                  onClick={() => {
                                    handleSubmit();
                                  }}>
                            Submit
                          </button>
                      </a>
                    </div>
                  </form>
                )}
              </Formik>

            </section>
          </div>
        </main>
      </div>
    ) 

}

export default Register;