import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, FormikValues } from 'formik';
import { updateSelectedOrderInfo, updateSelectedSeller } from "../../utils/reduxStore/sellerSlice";
import { updateSelectedIssueInfo, updateSelectedItemInfo } from "../../utils/reduxStore/issueSlice";


const igmCreateValidationSchema = Yup.object().shape({
    customer_name: Yup.string(),
    customer_phone: Yup.string()
     .min(10, 'Contact number must be 10 characters')
     .max(10, 'Contact number must be 10 characters'),
    customer_email: Yup.string().email('Invalid email format').required('Email is required'),
  seller_name: Yup.string(),
    provider_name: Yup.string()
    .required('Required'),
    seller_phone: Yup.string()
     .min(10, 'Contact number must be 10 characters')
     .max(10, 'Contact number must be 10 characters'),
    seller_email: Yup.string().email('Invalid email format'),
    title:Yup.string(),
    description: Yup.string(),
});

const initialValues = {
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    seller_name: '',
    seller_phone: '',
    seller_email: '',
    provider_name:'',
    title: '',
    description: '',
   };

   
const IgmCreate = ()=>{
    
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const orderInfoFromRedux = useSelector((store: any) => store.seller.selectedOrderInfo);
    const selected_order_info = orderInfoFromRedux
        ? orderInfoFromRedux
        : localStorage.getItem("selected_order_info")
            ? JSON.parse(localStorage.getItem("selected_order_info")!)
            : null;
    const sellerFromRedux = useSelector(
        (store: any) => store.seller.selectedSeller
    );
    const selected_seller = sellerFromRedux
        ? sellerFromRedux
        : localStorage.getItem("selected_seller")
            ? JSON.parse(localStorage.getItem("selected_seller")!)
            : null;
    const itemFromRedux = useSelector(
        (store: any) => store.issue.selectedItem
    );
    const selected_item = itemFromRedux
        ? itemFromRedux
        : localStorage.getItem("selected_item")
            ? JSON.parse(localStorage.getItem("selected_item")!)
            : null;
    const issueFromRedux = useSelector(
        (store: any) => store.issue.selectedIssue
    );
    const selected_issue = issueFromRedux
        ? issueFromRedux
        : localStorage.getItem("selected_issue")
            ? JSON.parse(localStorage.getItem("selected_issue")!)
            : null;
    const navigate = useNavigate();
        const navigateToOrderDetails = () => {
            navigate("/landing-page/orders/order-details")
        }

        const navigateToIGMList = () => {
            navigate("/landing-page/orders/igm-list")
        }
        const [allowUserToEditStoreContactDetails, setAllowUserToEditStoreContactDetails] = useState(true)

    // const [allowUserToEditStoreContactDetails, setAllowUserToEditStoreContactDetails] = useState(true)

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
    //                 initialValues.customer_phone = data[0] ? data[0].buyersDetails.registered_by.customer_phone : '';
    //                 initialValues.customer_email = data[0] ? data[0].buyersDetails.registered_by.customer_email : '';
    //                 initialValues.additional_info = data[0] ? data[0].buyersDetails.additional_info : '';
    //                 initialValues.store_url = data[0] ? data[0].buyersDetails.store_url : '';
    //                 initialValues.legal_entity_name = data[0] ? data[0].buyersDetails.legal_entity_name : '';
    //                 initialValues.has_existing_store = data[0] ? data[0].buyersDetails.has_existing_store : '';
    //                 if(user_details.customer_email === data[0].buyersDetails.registered_by.customer_email){
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
    //       },[dispatch, user_details.buyer_id, user_details.customer_email]);
    
    // const updateBuyerRegistrationDetails(values: { firstname: string; lastname: string; customer_phone: string; customer_email: string; legal_entity_name: string; has_existing_store: string; store_url: string; additional_info: string; }) {
    //     throw new Error("Function not implemented.");
    // }


       const updateIgmProductDetails = (values: FormikValues) => {
            console.log("reg form details = ", values)
            // saveRegistrationDetails(values)
            //  .then(response => {
            //     showSuccessMessage(REGISTRATION_UPDATE_SUCCESS)
            //     props.reloadStatus();
            //  })
            //  .catch(error=>{
            //     console.log(error)
            //  })
          }

    useEffect(() => {
        if(selected_issue){
            console.log(selected_issue)
                initialValues.customer_name = selected_issue.customer_name ? selected_issue.customer_name : '';
                initialValues.customer_phone = selected_issue.customer_phone ? selected_issue.customer_phone : '';
                initialValues.customer_email= selected_issue.customer_email ? selected_issue.customer_email : '';
                initialValues.seller_name= selected_issue.seller_name ? selected_issue.seller_name : '';
                initialValues.seller_phone= selected_issue.seller_phone ? selected_issue.seller_phone : '';
                initialValues.seller_email= selected_issue.seller_email ? selected_issue.seller_email : '';
                initialValues.provider_name= selected_issue.provider_name ? selected_issue.provider_name : '';
                initialValues.title= '';
                initialValues.description= '';
        }
        else{
            initialValues.customer_name= selected_order_info.customer_info?.first_name + ' ' + selected_order_info.customer_info?.last_name;
            initialValues.customer_phone= selected_order_info.customer_info?.phone ? selected_order_info.customer_info?.phone : '';
            initialValues.customer_email= selected_order_info.customer_info?.email ? selected_order_info.customer_info?.email : '';
            initialValues.seller_name= selected_seller.seller_name ? selected_seller.seller_name : '';
            initialValues.seller_phone= selected_seller.seller_phone ? selected_seller.seller_phone : '';
            initialValues.seller_email= selected_seller.seller_email ? selected_seller.seller_email : '';
            initialValues.provider_name= selected_seller.provider_info.name;
            initialValues.title= '';
            initialValues.description= '';
        }
        setLoading(false)
        return () => {
            dispatch(updateSelectedSeller(null));
            dispatch(updateSelectedOrderInfo(null));
            dispatch(updateSelectedItemInfo(null));
            dispatch(updateSelectedIssueInfo(null))
        }
    }, []);
    
    return (
        <>
        {
            !loading && <>
                <div className="container-fluid h-auto mt-3 px-3">
            <div className="row mt-1">
                <div className="col-12 text-left d-flex">
                    <div>
                        <div className="d-flex">
                            <div>
                                
                                    {
                                        selected_issue && selected_issue.product ?
                                        <h4><span className='cursor-pointer d-flex'><span className='back-btn me-1' onClick={navigateToIGMList}><i className='fa fa-arrow-left me-2 fa-left-icon'></i></span>Issue details</span></h4> :
                                        <h4><span className='cursor-pointer d-flex'><span className='back-btn me-1' onClick={navigateToOrderDetails}><i className='fa fa-arrow-left me-2 fa-left-icon'></i></span>Create IGM</span></h4>
                                    }
                                    


                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <div className="row">
                <div className="col-12 order-summary-container">
                    <div className="card shadow bg-white shadow bg-white mb-0 py-3 px-3">
                        <div className="seller-wise-order-info" >
                            {
                                selected_issue && selected_issue.product ? <h3>{selected_issue.product}</h3> :
                                    <h3>{selected_item.name}</h3>
                            }
                        </div>
                        {/* </div> */}

                        <div className="striped">
                            <span className="striped-line"></span>
                            <span className="striped-text">Customer Information</span>
                            <span className="striped-line"></span>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={igmCreateValidationSchema}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(false);
                                actions.validateForm().then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        updateIgmProductDetails(values);
                                    } else {
                                        console.log('Form has validation errors');
                                    }
                                });

                            }}
                        >
                            {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                                <form name="signin" className="form " style={{ marginTop: '0rem' }}>
                                    <div className="name-field">
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Name</label>
                                            <Field
                                                name="customer_name" type="text"
                                                className={'form-control dashboard-namefield ' + (errors.customer_name && touched.customer_name ? 'input-field-error' : '')}
                                                id="exampleFormControlInput1"
                                                placeholder="Customer Name"
                                                disabled={!allowUserToEditStoreContactDetails}
                                            />
                                            <ErrorMessage className='error' name="firstname" component="div" />
                                        </div>

                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Phone Number</label>
                                            <Field
                                                placeholder="Phone Number"
                                                name="customer_phone"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                className={'form-control dashboard-namefield ' + (errors.customer_phone && touched.customer_phone ? 'input-field-error' : '')}
                                                onKeyPress={(e: any) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                disabled={!allowUserToEditStoreContactDetails}
                                            />
                                            <ErrorMessage className='error' name="customer_phone" component="div" />
                                        </div>


                                    </div>

                                    <div className="name-field">


                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                                            <Field name="customer_email"

                                                type="email"
                                                id="exampleFormControlInput1"
                                                placeholder="Email Address"
                                                className={'form-control dashboard-namefield ' + (errors.customer_email && touched.customer_email ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="customer_email" component="div" />
                                        </div>
                                    </div>

                                    <div className="striped">
                                        <span className="striped-line"></span>
                                        <span className="striped-text">Seller App Information</span>
                                        <span className="striped-line"></span>
                                    </div>


                                    <div className="name-field">
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Seller name</label>
                                            <Field
                                                name="seller_name"
                                                disabled
                                                type="text"
                                                className={'form-control dashboard-namefield ' + (errors.seller_name && touched.seller_name ? 'input-field-error' : '')}
                                                id="exampleFormControlInput1"
                                                placeholder="Name"
                                            // disabled={!allowUserToEditStoreContactDetails}
                                            />
                                            <ErrorMessage className='error' name="seller_name" component="div" />
                                        </div>

                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Phone Number</label>
                                            <Field
                                                disabled
                                                placeholder="Phone Number"
                                                name="seller_phone"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                className={'form-control dashboard-namefield ' + (errors.seller_phone && touched.seller_phone ? 'input-field-error' : '')}
                                                onKeyPress={(e: any) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            // disabled={!allowUserToEditStoreContactDetails}
                                            />
                                            <ErrorMessage className='error' name="customer_phone" component="div" />
                                        </div>
                                    </div>

                                    <div className="name-field">


                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                                            <Field name="seller_email"
                                                disabled
                                                type="email"
                                                id="exampleFormControlInput1"
                                                placeholder="Email Address"
                                                className={'form-control dashboard-namefield ' + (errors.seller_email && touched.seller_email ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="customer_email" component="div" />
                                        </div>
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Provider name</label>
                                            <Field
                                                name="provider_name"
                                                disabled
                                                type="text"
                                                className={'form-control dashboard-namefield ' + (errors.provider_name && touched.provider_name ? 'input-field-error' : '')}
                                                id="exampleFormControlInput1"
                                                placeholder="Name"
                                            // disabled={!allowUserToEditStoreContactDetails}
                                            />
                                            <ErrorMessage className='error' name="provider_name" component="div" />
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
                                            <Field name="title"

                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Item Name"
                                                className={'form-control dashboard-namefield ' + (errors.title && touched.title ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="title" component="div" />
                                        </div>


                                        <div className="mb-3 form-field-container-full-width" style={{ width: '45.5%' }}>
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Description</label>

                                            <Field
                                                name="description"
                                                component="textarea"
                                                id="exampleFormControlTextarea1"
                                                rows={3}
                                                cols={8}
                                                placeholder="Item Description"
                                                className={errors.description && touched.description ? 'form-control input-field-error' : 'form-control'}
                                            />
                                            <ErrorMessage className='error' name="description" component="div" />

                                        </div>
                                    </div>
                                    <div className="mb-3 form-field-container-full-width" style={{ marginTop: '-45px' }}>
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">Upload Media</label>
                                        <Field name="upload"

                                            type="file"
                                            id="exampleFormControlInput1"
                                            placeholder="Item Name"
                                            className={'form-control dashboard-namefield ' + (errors.customer_email && touched.customer_email ? 'input-field-error' : '')}
                                        />
                                        <ErrorMessage className='error' name="customer_email" component="div" />
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
            </>
        }
        </>
        
    )

}
export default IgmCreate;