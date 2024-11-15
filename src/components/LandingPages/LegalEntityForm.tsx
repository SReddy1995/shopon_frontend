import { ErrorMessage, Field, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { getLegalEntityDetails, saveLegalEntityDetails } from '../../services/AccountService';
import { useSelector } from 'react-redux';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { LEGAL_ENTITY_UPDATE_SUCCESS } from '../../utils/constants/NotificationConstants';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const panRegex = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}")
const aadharRegexWithSpace = new RegExp("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")
const aadharRegex = new RegExp("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")
const legalEntityValidationSchema = Yup.object().shape({
    authorised_signatory_name: Yup.string().required('Required'),
    authorised_signatory_designation: Yup.string().required('Required'),
    authorised_signatory_phone_number: Yup.string()
                                        .min(10, 'Contact number must be 10 characters')
                                        .max(10, 'Contact number must be 10 characters')
                                        .required('Contact number is required'),
    authorised_signatory_email_address: Yup.string().email('Invalid email format').matches(emailRegex,'Invalid format').required('Required'),
    
    pan_or_aadhar: Yup.string().required("Pan/Aadhar must be selected"),
    authorised_signatory_pan: Yup.string()
    .when('pan_or_aadhar', 
        ([pan_or_aadhar], schema) => {
            if(pan_or_aadhar === "pan"){
               return Yup.string().matches(panRegex,'Invalid format').required("Pan required");
            }
            else{
                return Yup.string();
            }
    }),
    authorised_signatory_aadhaar: Yup.string()
    .when('pan_or_aadhar', 
        ([pan_or_aadhar], schema) => {
            if(pan_or_aadhar === "aadhar"){
               return Yup.string().matches(aadharRegex,'Invalid format').required("Aadhar required");
            }
            else{
                return Yup.string()
            }
    }),
    company_name: Yup.string().required('Required'),
    sector_of_organization_type: Yup.string().required('Required'),
    date_of_incorporation: Yup.string().required('Required') .nullable().typeError('Invalid date format'),
    company_phone_number: Yup.string()
                                        .min(10, 'Contact number must be 10 characters')
                                        .max(10, 'Contact number must be 10 characters')
                                        .required('Contact number is required'),
    company_email_address: Yup.string().email('Invalid email format').required('Email is required'),

    annual_turnover_type: Yup.string().required('Required'),
    nature_of_organization_type: Yup.string().required('Required'),
    company_gstn: Yup.string().required('Required'),
    company_pan: Yup.string().required('Required'),
    company_cin: Yup.string()
    .when('nature_of_organization_type', 
        ([nature_of_organization_type], schema) => {
            if(nature_of_organization_type === "COMP"){
               return Yup.string().required("CIN is required");
            }
            else{
                return Yup.string()
            }
    }),
    company_llpin: Yup.string()
    .when('nature_of_organization_type', 
        ([nature_of_organization_type], schema) => {
            if(nature_of_organization_type === "LLP"){
               return Yup.string().required("LLPIN is required");
            }
            else{
                return Yup.string()
            }
    }),
    building_street_area: Yup.string().required('Required'),
    locality_town: Yup.string().required('Required'),
    city_id: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    pincode: Yup.string().min(6, 'Pincode must be 6 characters')
    .max(6, 'Pincode must be 6 characters')
    .required('Pincode is required')
});

const initialValues = {
    authorised_signatory_name: '',
    authorised_signatory_designation: '',
    authorised_signatory_phone_number: '',
    authorised_signatory_email_address: '',
    pan_or_aadhar: '',
    authorised_signatory_pan: '',
    authorised_signatory_aadhaar: '',
    company_name: '',
    sector_of_organization_type: '',
    date_of_incorporation: '',
    company_phone_number: '',
    company_email_address: '',
    annual_turnover_type: '',
    nature_of_organization_type: '',
    company_gstn: '',
    company_pan: '',
    company_cin: '',
    company_llpin: '',
    building_street_area: '',
    locality_town: '',
    city_id: '',
    state: '',
    country: '',
    pincode: ''
   };
const LegalEntityForm = (props:any) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectedStore = useSelector((store: any) => store.stores.selectedStore);
    const refValues = useSelector((store: any) => store.refValues.referenceList);

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = () => {
        getLegalEntityDetails()
        .then((data: any) => {
            if(data && data.length>0){
                setData(data[0]);
            }
            else{
                resetData()
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
      }

      const resetData = () => {
        initialValues.authorised_signatory_name= '';
        initialValues.authorised_signatory_designation= ''
        initialValues.authorised_signatory_phone_number= ''
        initialValues.authorised_signatory_email_address= ''
        initialValues.pan_or_aadhar= ''
        initialValues.authorised_signatory_pan= ''
        initialValues.authorised_signatory_aadhaar= ''
        initialValues.company_name= ''
        initialValues.sector_of_organization_type= ''
        initialValues.date_of_incorporation= ''
        initialValues.company_phone_number= ''
        initialValues.company_email_address= ''
        initialValues.annual_turnover_type= ''
        initialValues.nature_of_organization_type= ''
        initialValues.company_gstn= ''
        initialValues.company_pan= ''
        initialValues.company_cin= ''
        initialValues.company_llpin= ''
        initialValues.building_street_area= ''
        initialValues.locality_town= ''
        initialValues.city_id= ''
        initialValues.state= ''
        initialValues.country= ''
        initialValues.pincode= ''
      }

      const setData = (data: any) => {
        initialValues.authorised_signatory_name = data.authorised_signatory_name
        initialValues.authorised_signatory_designation = data.authorised_signatory_designation
        initialValues.authorised_signatory_phone_number = data.authorised_signatory_phone_number
        initialValues.authorised_signatory_email_address = data.authorised_signatory_email_address
        initialValues.pan_or_aadhar = data.authorised_signatory_pan === null ? 'aadhar' : 'pan';
        initialValues.authorised_signatory_pan = data.authorised_signatory_pan ? data.authorised_signatory_pan : ''
        initialValues.authorised_signatory_aadhaar = data.authorised_signatory_aadhaar ? data.authorised_signatory_aadhaar : ''
        initialValues.company_name = data.company_name
        initialValues.sector_of_organization_type = data.sector_of_organization_type
        initialValues.date_of_incorporation = new Date(data.date_of_incorporation).toISOString().split('T')[0]
        initialValues.company_phone_number = data.company_phone_number
        initialValues.company_email_address = data.company_email_address
        initialValues.annual_turnover_type = data.annual_turnover_type
        initialValues.nature_of_organization_type = data.nature_of_organization_type
        initialValues.company_gstn = data.company_gstn
        initialValues.company_pan = data.company_pan
        initialValues.company_cin = data.company_cin ? data.company_cin : ''
        initialValues.company_llpin = data.company_llpin ? data.company_llpin : ''
        initialValues.building_street_area = data.addressDetails.building_street_area
        initialValues.locality_town = data.addressDetails.locality_town
        initialValues.city_id = data.addressDetails.city_id
        initialValues.state = refValues.cities.filter((x: any) => x.city_id == data.addressDetails.city_id)[0].state.description
        initialValues.country = refValues.cities.filter((x: any) => x.city_id == data.addressDetails.city_id)[0].state.country.description
        initialValues.pincode = data.addressDetails.pincode
      }

      const updateLegalEntityDetails = (values: FormikValues) => {
        let payload = getFormattedPayload(values)
        saveLegalEntityDetails(payload)
         .then(response => {
            showSuccessMessage(LEGAL_ENTITY_UPDATE_SUCCESS)
            props.reloadStatus();
         })
         .catch(err => {
            // setAllowEnterOtp(false);
         });
      }

      const getFormattedPayload = (values: any) => {
        let payload = values;
        let filteredValuestemp = values;
        const{ state, country, ...filteredValues } = filteredValuestemp;
        filteredValuestemp = filteredValues
        if(payload['pan_or_aadhar'] === 'aadhar'){
            const{ authorised_signatory_pan, pan_or_aadhar, ...filteredValues } = filteredValuestemp;
            filteredValuestemp = filteredValues
        }
        else{
            const{ authorised_signatory_aadhaar, pan_or_aadhar, ...filteredValues } = filteredValuestemp;
            filteredValuestemp = filteredValues
        }
        if(payload['nature_of_organization_type'] === 'COMP'){
            const{ company_llpin, ...filteredValues } = filteredValuestemp;
            filteredValuestemp = filteredValues
        }
        else if(payload['nature_of_organization_type'] === 'LLP'){
            const{ company_cin, ...filteredValues } = filteredValuestemp;
            filteredValuestemp = filteredValues
        }
        else{
            const{ company_llpin, company_cin, ...filteredValues } = filteredValuestemp;
            filteredValuestemp = filteredValues
        }
        filteredValuestemp['city_id'] = Number(filteredValuestemp['city_id'])
        filteredValuestemp['pincode'] = Number(filteredValuestemp['pincode'])
        return filteredValuestemp

      }

    return (
        <>
            <div className="accordion mt-1" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            KYC for ONDC
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>This information is collected for performing KYC with ONDC and requires submitting documents such
                                as the entity's name, type (e.g., LLC, corporation, partnership), registration address, ownership
                                details, and governing structure. </p>
                        </div>
                    </div>
                </div>


            </div>
            {
                !loading ?
                <Formik
                initialValues={initialValues}
                validationSchema={legalEntityValidationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    updateLegalEntityDetails(values);
                }}
            >
                {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                    <form name="signin" className="form mt-3 " >


                        <div className="name-field">
                            <div className="mb-3  form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory Name</label>
                                <Field 
                                    name="authorised_signatory_name" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_name && touched.authorised_signatory_name ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorized Signatory Name" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_name" component="div" />
                            </div>

                            <div className="mb-3  form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory Designation</label>
                                <Field 
                                    name="authorised_signatory_designation" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_designation && touched.authorised_signatory_designation ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorized Signatory Designation" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_designation" component="div" />
                            </div>

                        </div>

                        <div className="name-field">

                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory Phone Number</label>
                                <Field 
                                    name="authorised_signatory_phone_number" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_phone_number && touched.authorised_signatory_phone_number ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    onKeyPress={(e: any) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Authorized Signatory Phone No." 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_phone_number" component="div" />
                            </div>
                            <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory Email Address</label>
                                <Field 
                                    name="authorised_signatory_email_address" type="email" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_email_address && touched.authorised_signatory_email_address ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorized Signatory Email Address" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_email_address" component="div" />
                            </div>


                        </div>

                                <div className="name-field">
                                    <div className="custom-radio-box">
                                        <div className="input-control custom-radio-label">
                                            <label htmlFor="pan_or_aadhar" className="input-label  required">Authorized Signatory PAN/Aadhaar</label>
                                        </div>
                                        <div className="radio-buttons-container-dashboard dashboard-namefield">

                                            <div className="radio-button">
                                                <Field
                                                    name="pan_or_aadhar"
                                                    type="radio"
                                                    id="radio2"
                                                    placeholder="Legal Entity Name"
                                                    value="aadhar"
                                                    
                                                    className={errors.pan_or_aadhar && touched.pan_or_aadhar ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                                />
                                                <label htmlFor="radio2" className="radio-button__label">
                                                    <span className="radio-button__custom"></span>

                                                    Aadhar
                                                </label>
                                            </div>
                                            <div className="radio-button">
                                                <Field
                                                    name="pan_or_aadhar"
                                                    type="radio"
                                                    id="radio1"
                                                    placeholder="Legal Entity Name"
                                                    value="pan"
                                                    className={errors.pan_or_aadhar && touched.pan_or_aadhar ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                                />
                                                <label htmlFor="radio1" className="radio-button__label">
                                                    <span className="radio-button__custom"></span>

                                                    PAN
                                                </label>
                                            </div>
                                        </div>


                                    </div>

                                    {
                                        values.pan_or_aadhar === "aadhar"
                                        ?
                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory Aadhaar</label>
                                                <Field
                                                    name="authorised_signatory_aadhaar" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_aadhaar && touched.authorised_signatory_aadhaar ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Authorized Signatory Aadhar"
                                                />
                                                <ErrorMessage className='error' name="authorised_signatory_aadhaar" component="div" />
                                            </div>

                                        :
                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorized Signatory PAN</label>
                                                <Field
                                                    name="authorised_signatory_pan" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_pan && touched.authorised_signatory_pan ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Authorized Signatory PAN"
                                                />
                                                <ErrorMessage className='error' name="authorised_signatory_pan" component="div" />
                                            </div>

                                    }
                                </div>

                        <div className="name-field">
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company Name</label>
                                <Field 
                                    name="company_name" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.company_name && touched.company_name ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Company Name" 
                                />
                                <ErrorMessage className='error' name="company_name" component="div" />
                            </div>

                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Sector of Organisation</label>
                                <Field 
                                    name="sector_of_organization_type" as="select" 
                                    className={'form-control custom-select dashboard-namefield ' + (errors.sector_of_organization_type && touched.sector_of_organization_type ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Sector of Organization Type" 
                                >
                                <option value={""}>--select--</option>
                                {
                                    refValues.organizationSectorTypes
                                    .map((entity : any, index: any) => {
                                        return  <option key={index} value={entity.sector_of_organization_type}>{entity.description}</option>
                                    })
                                }
                                </Field>
                                <ErrorMessage className='error' name="sector_of_organization_type" component="div" />
                            </div>




                        </div>
                        <div className="name-field">
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Date of Incorporation</label>
                                <Field 
                                    name="date_of_incorporation" type="date" 
                                    className={'form-control dashboard-namefield ' + (errors.date_of_incorporation && touched.date_of_incorporation ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Date of Incorporation" 
                                />
                                <ErrorMessage className='error' name="date_of_incorporation" component="div" />
                            </div>
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company Phone Number</label>
                                <Field 
                                    name="company_phone_number" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.company_phone_number && touched.company_phone_number ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    onKeyPress={(e: any) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Company Phone No." 
                                />
                                <ErrorMessage className='error' name="company_phone_number" component="div" />
                            </div>


                        </div>

                        <div className="name-field">
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company Email Address</label>
                                <Field 
                                    name="company_email_address" type="email" 
                                    className={'form-control dashboard-namefield ' + (errors.company_email_address && touched.company_email_address ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Company Email Address" 
                                />
                                <ErrorMessage className='error' name="company_email_address" component="div" />
                            </div>
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Annual Turnover</label>
                                <Field 
                                    name="annual_turnover_type" as="select" 
                                    className={'form-control custom-select dashboard-namefield ' + (errors.annual_turnover_type && touched.annual_turnover_type ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Annual Turnover" 
                                >
                                    <option value={""}>--select--</option>
                                    {
                                        refValues.annualTurnoverTypes
                                        .map((turnover : any, index: any) => {
                                            return  <option key={index} value={turnover.annual_turnover_type}>{turnover.description}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='error' name="annual_turnover_type" component="div" />
                            </div>


                        </div>
                        <div className="name-field">
                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company PAN</label>
                                <Field 
                                    name="company_pan" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.company_pan && touched.company_pan ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1"
                                    onKeyPress={(e: any) => {
                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }} 
                                    placeholder="Company PAN" 
                                />
                                <ErrorMessage className='error' name="company_pan" component="div" />
                            </div>

                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company GSTN</label>
                                <Field 
                                    name="company_gstn" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.company_gstn && touched.company_gstn ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    onKeyPress={(e: any) => {
                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                    placeholder="Company GSTN" 
                                />
                                <ErrorMessage className='error' name="company_gstn" component="div" />
                            </div>

                        </div>

                        <div className="name-field">

                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Nature of Organization</label>
                                <Field 
                                    name="nature_of_organization_type" as="select" 
                                    className={'form-control custom-select dashboard-namefield ' + (errors.nature_of_organization_type && touched.nature_of_organization_type ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Nature of Organization" 
                                >
                                    <option value={""}>--select--</option>
                                    {
                                        refValues.organizationNatureType
                                        .map((nature : any, index: any) => {
                                            return  <option key={index} value={nature.nature_of_organization_type}>{nature.description}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='error' name="nature_of_organization_type" component="div" />
                            </div>

                            {
                                        values.nature_of_organization_type === "LLP"
                                            ?
                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company LLPIN</label>
                                                <Field
                                                    name="company_llpin" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.company_llpin && touched.company_llpin ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Company LLPIN"
                                                />
                                                <ErrorMessage className='error' name="company_llpin" component="div" />
                                            </div>

                                            :

                                            <></>

                                    }

                                    {
                                        values.nature_of_organization_type === "COMP"
                                            ?

                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company CIN</label>
                                                <Field
                                                    name="company_cin" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.company_cin && touched.company_cin ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Company CIN"
                                                />
                                                <ErrorMessage className='error' name="company_cin" component="div" />
                                            </div>

                                            :

                                            <></>
                                    }


                        </div>
                                <div className='text-left mt-2'>
                                    <label htmlFor="exampleFormControlInput1" className="form-label required">Registered Store Address</label>
                                </div>
                                <div className="name-field">

                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">Building Street/Area</label>
                                        <Field 
                                            name="building_street_area" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.building_street_area && touched.building_street_area ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="Building Street/Area" 
                                        />
                                        <ErrorMessage className='error' name="building_street_area" component="div" />
                                    </div>
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">Locality/Town</label>
                                        <Field 
                                            name="locality_town" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.locality_town && touched.locality_town ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="Locality/Town" 
                                        />
                                        <ErrorMessage className='error' name="locality_town" component="div" />
                                    </div>

                                </div>

                                <div className="name-field">
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">City</label>
                                        <Field 
                                            name="city_id" as="select" 
                                            className={'form-control custom-select dashboard-namefield ' + (errors.city_id && touched.city_id ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="City/District"
                                            onChange={(e: any) => {
                                                const { value } = e.target;
                                                setFieldValue("city_id", value);
                                                setFieldValue("state", refValues.cities.filter((x: any) => x.city_id == value)[0].state.description);
                                                setFieldValue("country", refValues.cities.filter((x: any) => x.city_id == value)[0].state.country.description);
                                            }} 
                                        >
                                            <option value={""}>--select--</option>
                                            {
                                                refValues.cities
                                                .map((city : any, index: any) => {
                                                    return  <option key={index} value={city.city_id}>{city.description}</option>
                                                })
                                            }
                                        </Field>
                                        <ErrorMessage className='error' name="city_id" component="div" />
                                    </div>


                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">State</label>
                                        <Field 
                                            name="state" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.state && touched.state ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="State"
                                            disabled 
                                        />
                                        <ErrorMessage className='error' name="state" component="div" />
                                    </div>


                                </div>
                                <div className="name-field">
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">Country</label>
                                        <Field 
                                            name="country" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.country && touched.country ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="Country" 
                                            disabled
                                        />
                                        <ErrorMessage className='error' name="country" component="div" />
                                    </div>
                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">Pincode</label>
                                        <Field 
                                            name="pincode" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.pincode && touched.pincode ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="Pincode" 
                                            onKeyPress={(e: any) => {
                                                if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                  e.preventDefault();
                                                }
                                              }}
                                        />
                                        <ErrorMessage className='error' name="pincode" component="div" />
                                    </div>
                                </div>
                        
                        <div className="text-center">
                            <a className="btn-link"><button type="button"
                                className="btn-custom  mt-2 btn-right" 
                                disabled={!(isValid) || isSubmitting}
                                onClick={() => {
                                  handleSubmit();
                                }}>
                                    Save
                                </button></a>
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

export default LegalEntityForm;