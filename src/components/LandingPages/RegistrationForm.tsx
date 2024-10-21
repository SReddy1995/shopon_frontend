import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { getAccountDetails, saveRegistrationDetails } from '../../services/AccountService';
import { showSuccessMessage } from '../../shared/notificationProvider';

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
    has_existing_store: Yup.string(),
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

const RegistrationForm = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectedStore = useSelector((store: any) => store.stores.selectedStore);
    const storesList = useSelector((store: any) => store.stores.storesList);
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = () => {
        console.log("selected store = ", selectedStore)
        let buyer_id = selectedStore.buyer_id;
        getAccountDetails(buyer_id)
        .then((data: any) => {
            setData(data);
         
            if(data){
                console.log("account details = ", data)
                    initialValues.firstname = user_details ? user_details.firstname : '';
                    initialValues.lastname = user_details ? user_details.lastname : '';
                    initialValues.contact_number = data ? data.contact_number : '';
                    initialValues.email_address = user_details ? user_details.email_address : '';
                    initialValues.additional_info = data ? data.additional_info : '';
                    initialValues.store_url = data ? data.store_url : '';
                    initialValues.legal_entity_name = data ? data.legal_entity_name : '';
                    initialValues.has_existing_store = data ? data.has_existing_store : '';
            }
            else{
                // let default initial values load
            }
            setLoading(false);
        })
        .catch((err: any) => {
            console.log(err)
            setLoading(false);
        });
      }

    const updateBuyerRegistrationDetails = (values: FormikValues) => {
        saveRegistrationDetails(values)
         .then(response => {
            showSuccessMessage("Registration details updated successfully")
         })
      }

    return (
        <>
            {
                !loading ?
                    <section className="wrapper">
                        <div className="accordion mt-1" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne">
                                        Registration Details
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>This is the essential information that is collected to create a personal account in our platform.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={registerValidationSchema}
                            onSubmit={(values, actions) => {
                                console.log("register form submitted")
                                actions.setSubmitting(false);
                                updateBuyerRegistrationDetails(values);
                            }}
                        >
                            {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                                <form name="signin" className="form ">
                                    <div className="name-field">
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">First Name</label>
                                            <Field
                                                name="firstname" type="text"
                                                className={'form-control dashboard-namefield ' + (errors.firstname && touched.firstname ? 'input-field-error' : '')}
                                                id="exampleFormControlInput1"
                                                placeholder="First Name"
                                            />
                                            <ErrorMessage className='error' name="firstname" component="div" />
                                        </div>

                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Last Name</label>
                                            <Field
                                                name="lastname" type="text"
                                                className={'form-control dashboard-namefield ' + (errors.lastname && touched.lastname ? 'input-field-error' : '')}
                                                id="exampleFormControlInput1"
                                                placeholder="Last Name"
                                            />
                                            <ErrorMessage className='error' name="lastname" component="div" />
                                        </div>
                                    </div>

                                    <div className="name-field">
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
                                            />
                                            <ErrorMessage className='error' name="contact_number" component="div" />
                                        </div>

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
                                        <span className="striped-text">Store Information</span>
                                        <span className="striped-line"></span>
                                    </div>
                                    <div className="name-field">
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Legal Entity Name</label>
                                            <Field
                                                name="legal_entity_name"
                                                type="text"
                                                id="exampleFormControlInput1"
                                                placeholder="Legal Entity Name"
                                                className={'form-control dashboard-namefield ' + (errors.legal_entity_name && touched.legal_entity_name ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="legal_entity_name" component="div" />
                                        </div>

                                        <div className="custom-radio-box">
                                            <div className="input-control custom-radio-label">
                                                <label htmlFor="email" className="input-label ">Do you have the store already ?</label>
                                            </div>
                                            <div className="radio-buttons-container-dashboard dashboard-namefield">

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
                                    </div>
                                    <div className="name-field">
                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlInput1" className="form-label required">Store Url</label>
                                            <Field
                                                name="store_url"
                                                type="text"
                                                className={'form-control dashboard-namefield ' + (errors.store_url && touched.store_url ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="store_url" component="div" />
                                        </div>

                                        <div className="mb-3 form-field-container-full-width">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Additional Information</label>
                                            <Field
                                                name="additional_info"
                                                component="textarea"
                                                id="exampleFormControlTextarea1"
                                                rows={3}
                                                placeholder="Other Information"
                                                className={'form-control dashboard-namefield ' + (errors.additional_info && touched.additional_info ? 'input-field-error' : '')}
                                            />
                                            <ErrorMessage className='error' name="additional_info" component="div" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <a className="btn-link">
                                            <button type="button"
                                                className="btn-custom mt-2 btn-right"
                                                disabled={!(isValid && dirty) || isSubmitting}
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
                :
                <></>
            }

        </>
    ) 

}

export default RegistrationForm;