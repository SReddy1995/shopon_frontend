import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, FormikValues } from 'formik';


const registerValidationSchema = Yup.object().shape({
    firstname: Yup.string()
    .required('Required'),
    lastname: Yup.string()
    .required('Required'),
    contact_number: Yup.string()
     .min(10, 'Contact number must be 10 characters')
     .max(10, 'Contact number must be 10 characters')
     .required('Contact number is required'),
    email_address: Yup.string().email('Invalid email format').required('Email is required'),
    legal_entity_name: Yup.string()
    .required('Required'),
    has_existing_store: Yup.string().required("Required"),
    store_url: Yup.string()
    .required('Required'),
    additional_info: Yup.string(),
});
const initialValues = {
    firstname: '',
    lastname: '',
    contact_number: '',
    email_address: '',
    legal_entity_name: '',
    has_existing_store: '',
    store_url: '',
    additional_info: '',
   };

const IgmCreate = ()=>{
    const navigate = useNavigate();
        const navigateToOrderDetails = () => {
            // dispatch(updateSelectedOrder(null));
            navigate("/landing-page/orders/order-details")
        }
    const [allowUserToEditStoreContactDetails, setAllowUserToEditStoreContactDetails] = useState(true)

    //  const fetchData = useCallback(() => {
    //         getAccountDetails(user_details.buyer_id)
    //         .then((data: any) => {
    //             if(data){
    //                 console.log(data[0])
    //                 dispatch(updateSelectedStore(user_details.buyer_id));
    //                 localStorage.setItem('selected_store', user_details.buyer_id)
    //                 setUserDetails(localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null)
    //                 initialValues.firstname = data[0] ? data[0].buyersDetails.registered_by.firstname : '';
    //                 initialValues.lastname = data[0] ? data[0].buyersDetails.registered_by.lastname : '';
    //                 initialValues.contact_number = data[0] ? data[0].buyersDetails.registered_by.contact_number : '';
    //                 initialValues.email_address = data[0] ? data[0].buyersDetails.registered_by.email_address : '';
    //                 initialValues.additional_info = data[0] ? data[0].buyersDetails.additional_info : '';
    //                 initialValues.store_url = data[0] ? data[0].buyersDetails.store_url : '';
    //                 initialValues.legal_entity_name = data[0] ? data[0].buyersDetails.legal_entity_name : '';
    //                 initialValues.has_existing_store = data[0] ? data[0].buyersDetails.has_existing_store : '';
    //                 if(user_details.email_address === data[0].buyersDetails.registered_by.email_address){
    //                     setAllowUserToEditStoreContactDetails(true)
    //                 }
    //                 else{
    //                     setAllowUserToEditStoreContactDetails(false)
    //                 }
    //                 setLoading(false)
    //             }
    //             else{
    //                 // let default initial values load
    //             }
    //         })
    //         .catch((err: any) => {
    //             console.log(err)
    //         });
    //       },[dispatch, user_details.buyer_id, user_details.email_address]);
    
    function updateBuyerRegistrationDetails(values: { firstname: string; lastname: string; contact_number: string; email_address: string; legal_entity_name: string; has_existing_store: string; store_url: string; additional_info: string; }) {
        throw new Error("Function not implemented.");
    }

    return(
        <div className="container-fluid h-auto mt-3 px-3">
         <div className="row mt-1">
            <div className="col-12 text-left d-flex">
                <div>
                    <div className="d-flex">
                    <div>
                                        <h4><span className='cursor-pointer d-flex'>
                                            <span className='back-btn me-1' onClick={navigateToOrderDetails}><i className='fa fa-arrow-left me-2 fa-left-icon'></i></span>Create IGM</span></h4>
                                    
                            
                        </div>
                        
                    </div>
                </div>
                </div>

        </div>

        
                <div className="row">
                    <div className="col-12 order-summary-container">
                    <div className="card shadow bg-white shadow bg-white mb-0 py-3 px-3">
                    <div className="seller-wise-order-info" >
                            {/* <div className="provider-seller-info-container px-2 py-2"> */}
                            <h3>Nivea Men Fresh Ocean Deo</h3><br />
                            {/* <span className="font-small text-grey">SKU: d90a9f67-c736-4460-a213-6b40098a889d</span>
                            <span className="font-small text-grey">Alt Id: d90a9f67-c736-4460-a213-6b40098a889d</span><br /> */}
                            </div>
                    {/* </div> */}

                    <div className="striped">
                                                                                                <span className="striped-line"></span>
                                                                                                <span className="striped-text">Customer Information</span>
                                                                                                <span className="striped-line"></span>
                                                                                            </div>
                      <Formik
                                                initialValues={initialValues}
                                                validationSchema={registerValidationSchema}
                                                onSubmit={(values, actions) => {
                                                    actions.setSubmitting(false);
                                                    actions.validateForm().then((errors) => {
                                                        if (Object.keys(errors).length === 0) {
                                                          updateBuyerRegistrationDetails(values);
                                                        } else {
                                                          console.log('Form has validation errors');
                                                        }
                                                      });
                                                    
                                                }}
                                            >
                    {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                        <form name="signin" className="form " style={{marginTop:'0rem'}}>
                                                        <div className="name-field">
                                                            <div className="mb-3 form-field-container-full-width">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Name</label>
                                                                <Field
                                                                    name="firstname" type="text"
                                                                    className={'form-control dashboard-namefield ' + (errors.firstname && touched.firstname ? 'input-field-error' : '')}
                                                                    id="exampleFormControlInput1"
                                                                    placeholder="First Name"
                                                                    disabled={!allowUserToEditStoreContactDetails}
                                                                />
                                                                <ErrorMessage className='error' name="firstname" component="div" />
                                                            </div>

                                                            <div className="mb-3 form-field-container-full-width">
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Phone Number</label>
                                                                                                    <Field
                                                                                                        placeholder="Phone Number"
                                                                                                        name="contact_number"
                                                                                                        type="text"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.contact_number && touched.contact_number ? 'input-field-error' : '')}
                                                                                                        onKeyPress={(e: any) => {
                                                                                                            if (!/[0-9]/.test(e.key)) {
                                                                                                                e.preventDefault();
                                                                                                            }
                                                                                                        }}
                                                                                                        disabled={!allowUserToEditStoreContactDetails}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="contact_number" component="div" />
                                                                                                </div>
                    
                                                           
                                                        </div>

                                                          <div className="name-field">
                                                                                             
                                                        
                                                                                                <div className="mb-3 form-field-container-full-width">
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                                                                                                    <Field name="email_address"
                                                                                                      
                                                                                                        type="email"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        placeholder="Email Address"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.email_address && touched.email_address ? 'input-field-error' : '')}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="email_address" component="div" />
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="striped">
                                                                                                <span className="striped-line"></span>
                                                                                                <span className="striped-text">Network Provider Information</span>
                                                                                                <span className="striped-line"></span>
                                                                                            </div>


                                                                                            <div className="name-field">
                                                            <div className="mb-3 form-field-container-full-width">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Name</label>
                                                                <Field
                                                                    name="firstname"
                                                                    disabled
                                                                    type="text"
                                                                    className={'form-control dashboard-namefield ' + (errors.firstname && touched.firstname ? 'input-field-error' : '')}
                                                                    id="exampleFormControlInput1"
                                                                    placeholder="First Name"
                                                                    // disabled={!allowUserToEditStoreContactDetails}
                                                                />
                                                                <ErrorMessage className='error' name="firstname" component="div" />
                                                            </div>
                    
                                                            <div className="mb-3 form-field-container-full-width">
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Phone Number</label>
                                                                                                    <Field
                                                                                                    disabled
                                                                                                        placeholder="Phone Number"
                                                                                                        name="contact_number"
                                                                                                        type="text"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.contact_number && touched.contact_number ? 'input-field-error' : '')}
                                                                                                        onKeyPress={(e: any) => {
                                                                                                            if (!/[0-9]/.test(e.key)) {
                                                                                                                e.preventDefault();
                                                                                                            }
                                                                                                        }}
                                                                                                        // disabled={!allowUserToEditStoreContactDetails}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="contact_number" component="div" />
                                                                                                </div>
                                                        </div>

                                                          <div className="name-field">
                                                                                             
                                                        
                                                                                                <div className="mb-3 form-field-container-full-width">
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                                                                                                    <Field name="email_address"
                                                                                                        disabled
                                                                                                        type="email"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        placeholder="Email Address"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.email_address && touched.email_address ? 'input-field-error' : '')}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="email_address" component="div" />
                                                                                                </div>
                                                                                            </div>


                                                                                            <div className="striped">
                                                                                                <span className="striped-line"></span>
                                                                                                <span className="striped-text">Please add your item detais here</span>
                                                                                                <span className="striped-line"></span>
                                                                                            </div>
                                                                                            <div className="name-field">
                                                                                            <div className="mb-3 form-field-container-full-width">
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Title</label>
                                                                                                    <Field name="email_address"
                                                                                                        
                                                                                                        type="text"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        placeholder="Item Name"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.email_address && touched.email_address ? 'input-field-error' : '')}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="email_address" component="div" />
                                                                                                </div>


                                                                                                <div className="mb-3 form-field-container-full-width" style={{width:'45.5%'}}>
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Description</label>
                                                                                                     
                                                                                                                          <Field 
                                                                                                                                name="additional_info" 
                                                                                                                                component="textarea" 
                                                                                                                                id="exampleFormControlTextarea1"
                                                                                                                                rows={3}
                                                                                                                                cols={8}
                                                                                                                                placeholder="Item Description"
                                                                                                                                className={errors.additional_info && touched.additional_info ? 'form-control input-field-error' : 'form-control'} 
                                                                                                                          />
                                                                                                                          <ErrorMessage className='error' name="additional_info" component="div" />
                                                                                                                      
                                                                                                </div>
                                                                                            </div>
                                                                                                <div className="mb-3 form-field-container-full-width" style={{marginTop:'-45px'}}>
                                                                                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Upload Media</label>
                                                                                                    <Field name="upload"
                                                                                                        
                                                                                                        type="file"
                                                                                                        id="exampleFormControlInput1"
                                                                                                        placeholder="Item Name"
                                                                                                        className={'form-control dashboard-namefield ' + (errors.email_address && touched.email_address ? 'input-field-error' : '')}
                                                                                                    />
                                                                                                    <ErrorMessage className='error' name="email_address" component="div" />
                                                                                                </div>

                                                                                                <div className="text-center">
                                            <button type="button"
                                                className="btn-custom mt-2 btn-right"
                                                onClick={() => {
                                                    handleSubmit();
                                                }}>
                                                Save
                                            </button>
                                    </div>


                                        </form>
                                              )}
                                                                </Formik>
                    </div>
                    </div>
                </div>
    </div>
    )

}
export default IgmCreate;