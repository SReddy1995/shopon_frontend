import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { getBankInfo, saveBankInfo } from '../../services/AccountService';
import { BANK_INFO_UPDATE_SUCCESS } from '../../utils/constants/NotificationConstants';

const ifscRegex = new RegExp("^[A-Z]{4}[0]{1}[A-Z0-9]{6}$")
const bankEscrowValidationSchema = Yup.object().shape({
    has_escrow_account: Yup.string().required('Select whether you have Escrow Account'),   
    escrow_account_number: Yup.string()
    .when('has_escrow_account', 
        ([has_escrow_account], schema) => {
            if(has_escrow_account === 'Y' ){ 
               return Yup.string().required("Enter Escrow Account Number");
            }
            else{
                return Yup.string();
            }
    }),
    confirm_escrow_account_number: Yup.string()
    .when(['escrow_account_number', 'has_escrow_account'],
        ([escrow_account_number, has_escrow_account], schema) => {
            if(escrow_account_number && escrow_account_number.split('').length>0 && has_escrow_account === 'Y'){ 
               return Yup.string().required("Confirm Account Number")
               .oneOf([Yup.ref('escrow_account_number'), ''], 'Account number must match');
            }
            else{
                return Yup.string();
            }
    }),
    ifsc: Yup.string()
    .when('has_escrow_account', 
        ([has_escrow_account], schema) => {
            if(has_escrow_account === 'Y'){ 
               return Yup.string().required("Enter Bank Name");
            }
            else{
                return Yup.string();
            }
    }),
    bank_name: Yup.string()
    .when('has_escrow_account', 
        ([has_escrow_account], schema) => {
            if(has_escrow_account === 'Y'){ 
               return Yup.string().required("Enter Bank Name");
            }
            else{
                return Yup.string();
            }
    }),
});

const BankEscrowForm = (props: any) => {

    const [loading, setLoading] = useState(true);
    const [showBankAccountDetails, setShowBankAccountDetails] = useState(false)
    const [initialValues, setInitialValues] = useState({
        has_escrow_account: '',   
        escrow_account_number: '',
        confirm_escrow_account_number: '',
        ifsc: '',
        bank_name: ''
       }); 


    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = () => {
        getBankInfo()
        .then((data: any) => {
            if(data){
                initialValues.has_escrow_account = data[0].has_escrow_account
                initialValues.escrow_account_number = data[0].escrow_account_number
                initialValues.confirm_escrow_account_number = data[0].escrow_account_number
                initialValues.ifsc = data[0].ifsc
                initialValues.bank_name = data[0].bank_name
                if(data[0].has_escrow_account === "N"){
                    setShowBankAccountDetails(false)
                }
                else{
                    setShowBankAccountDetails(true)
                }
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
      }

    const updateBankEscrowDetails = (values: FormikValues) => {
        let filteredValuesPayload = values;
        if(values.has_escrow_account === 'N'){
            const{ confirm_escrow_account_number,escrow_account_number, ifsc,bank_name, ...filteredValues } = filteredValuesPayload;
            filteredValuesPayload = filteredValues 
        }
        else{
            const{ confirm_escrow_account_number, ...filteredValues } = filteredValuesPayload;
            filteredValuesPayload = filteredValues
        }
        saveBankInfo(filteredValuesPayload)
         .then(response => {
            showSuccessMessage(BANK_INFO_UPDATE_SUCCESS)
            props.reloadStatus();
         })
         .catch(err => {
            // setAllowEnterOtp(false);
         });
      }

    return (
        <>
            <div className="accordion mt-1" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            Fund Holding Account

                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>This section collects the Bank Escrow on behalf of ONDC which is to ensure - to ensure secure,
                                transparent, and trustworthy transactions between buyers and sellers.</p>
                        </div>
                    </div>
                </div>


            </div>
            {
                !loading ?

                    <Formik
                        initialValues={initialValues}
                        validationSchema={bankEscrowValidationSchema}
                        onSubmit={(values, actions) => {
                            actions.setSubmitting(false);
                            updateBankEscrowDetails(values);
                        }}
                    >
                        {({ isSubmitting, errors,setErrors, touched, values, handleChange,setFieldValue, handleSubmit, isValid, dirty, resetForm, validateForm }) => (
                            <form name="signin" className="form" >
                                <div className="name-field">
                                    <div className="custom-radio-box">
                                        <div className="input-control custom-radio-label">
                                            <label htmlFor="has_escrow_account" className="input-label required">Do you have Escrow Account?</label>
                                        </div>
                                        <div className="radio-buttons-container-dashboard dashboard-namefield">

                                            <div className="radio-button">
                                            <Field
                                                        name="has_escrow_account"
                                                        type="radio"
                                                        id="radio2"
                                                        value="Y"
                                                        onChange={async(e: any) => {
                                                            const { value } = e.target;
                                                            setFieldValue('has_escrow_account', value);
                                                            // Reset other fields when field changes
                                                            const formErrors = await validateForm();
                                                            // Set errors if there are any
                                                            setErrors(formErrors);
                                                            if(value=='N'){
                                                                setFieldValue('bank_name', '');
                                                                setFieldValue('escrow_account_number', '');
                                                                setFieldValue('confirm_escrow_account_number', '');
                                                                setFieldValue('ifsc', '');
                                                                setShowBankAccountDetails(false)
                                                            }
                                                            else{
                                                                setShowBankAccountDetails(true)   
                                                            }
                                                          }}
                                                        className={errors.has_escrow_account && touched.has_escrow_account ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                                    />
                                                    <label htmlFor="radio2" className="radio-button__label">
                                                        <span className="radio-button__custom"></span>

                                                        Yes
                                                    </label>
                                            </div>
                                            <div className="radio-button">
                                            <Field
                                                        name="has_escrow_account"
                                                        type="radio"
                                                        id="radio1"
                                                        value="N"
                                                        onChange={async(e: any) => {
                                                            const { value } = e.target;
                                                            setFieldValue('has_escrow_account', value);
                                                            // Reset other fields when field changes
                                                            const formErrors = await validateForm();
                                                            // Set errors if there are any
                                                            setErrors(formErrors);
                                                            if(value=='N'){
                                                            setFieldValue('bank_name', '');
                                                            setFieldValue('escrow_account_number', '');
                                                            setFieldValue('confirm_escrow_account_number', '');
                                                            setFieldValue('ifsc', '');
                                                            setShowBankAccountDetails(false)
                                                            }
                                                            else{
                                                                setShowBankAccountDetails(true)   
                                                            }
                                                          }}
                                                        className={errors.has_escrow_account && touched.has_escrow_account ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                                    />
                                                    <label htmlFor="radio1" className="radio-button__label">
                                                        <span className="radio-button__custom"></span>

                                                        No
                                                    </label>
                                            </div>
                                        </div>
                                        <ErrorMessage className='error' name="has_escrow_account" component="div" />

                                    </div>

                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className={'form-label '+ (values.has_escrow_account === 'Y' ? ' required' : '')}>Bank Name</label>
                                        <Field 
                                            name="bank_name" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.bank_name && touched.bank_name ? 'input-field-error' : '')}
                                            placeholder="Bank Name" 
                                            disabled={!showBankAccountDetails}
                                        />
                                        <ErrorMessage className='error' name="bank_name" component="div" />
                                    </div>

                                </div>

                                <div className="name-field">
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className={'form-label '+ (values.has_escrow_account === 'Y' ? ' required' : '')}>Escrow Account Number</label>
                                        <Field
                                                placeholder="Escrow Account Number"
                                                name="escrow_account_number"
                                                onChange={handleChange}
                                                type="text"
                                                className={'form-control dashboard-namefield ' + (errors.escrow_account_number && touched.escrow_account_number ? 'input-field-error' : '')}
                                                onKeyPress={(e: any) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                disabled={!showBankAccountDetails}
                                            />
                                        <ErrorMessage className='error' name="escrow_account_number" component="div" />
                                    </div>
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className={'form-label '+ (values.has_escrow_account === 'Y' ? ' required' : '')}>Confirm Escrow Account Number</label>
                                        <Field
                                                placeholder="Escrow Account Number"
                                                name="confirm_escrow_account_number"
                                                type="password"
                                                className={'form-control dashboard-namefield ' + (errors.confirm_escrow_account_number && touched.confirm_escrow_account_number ? 'input-field-error' : '')}
                                                onKeyPress={(e: any) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                disabled={!showBankAccountDetails}
                                            />
                                        <ErrorMessage className='error' name="confirm_escrow_account_number" component="div" />
                                    </div>
                                </div>

                                <div className="name-field">
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className={'form-label '+ (values.has_escrow_account === 'Y' ? ' required' : '')}>IFSC</label>
                                        <Field 
                                            name="ifsc" type="email" 
                                            className={'form-control dashboard-namefield ' + (errors.ifsc && touched.ifsc ? 'input-field-error' : '')}
                                            onKeyPress={(e: any) => {
                                                if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                e.preventDefault();
                                                }
                                            }}
                                            placeholder="IFSC code" 
                                            disabled={!showBankAccountDetails}
                                        />
                                        <ErrorMessage className='error' name="ifsc" component="div" />

                                    </div>




                                </div>

                                <div className="text-center">
                                    <a className="btn-link"><button type="button"   
                                        disabled={!(isValid) || isSubmitting}
                                        onClick={() => {
                                        handleSubmit();
                                        }}
                                        className="btn-custom  mt-2 btn-right" >Submit</button></a>
                                </div>
                            </form>
                        )}
                    </Formik>

                    :

                    <></>
            }
        </>
    ) 

}

export default BankEscrowForm;