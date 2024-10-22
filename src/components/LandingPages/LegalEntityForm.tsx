import { ErrorMessage, Field, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { getLegalEntityDetails, saveLegalEntityDetails } from '../../services/AccountService';
import { useSelector } from 'react-redux';
import { showSuccessMessage } from '../../shared/notificationProvider';


const legalEntityValidationSchema = Yup.object().shape({
    buyer_id: Yup.string().required('Required'),
    authorised_signatory_name: Yup.string().required('Required'),
    authorised_signatory_designation: Yup.string().required('Required'),
    authorised_signatory_phone_number: Yup.string()
                                        .min(10, 'Contact number must be 10 characters')
                                        .max(10, 'Contact number must be 10 characters')
                                        .required('Contact number is required'),
    authorised_signatory_email_address: Yup.string().email('Invalid email format').required('Required'),
    
    pan_or_aadhar: Yup.string().required("Pan/Aadhar must be selected"),
    authorised_signatory_pan: Yup.string().required('Required'),
    authorised_signatory_adhaar: Yup.string().required('Required'),
    company_name: Yup.string().required('Required'),
    cmp_legal_entity_type: Yup.string().required('Required'),
    date_of_incorporation: Yup.string().required('Required') .nullable().typeError('Invalid date format'),
    company_phone_number: Yup.string()
                                        .min(10, 'Contact number must be 10 characters')
                                        .max(10, 'Contact number must be 10 characters')
                                        .required('Contact number is required'),
    company_email_address: Yup.string().email('Invalid email format').required('Email is required'),

    annual_turnover_type: Yup.string().required('Required'),
    nature_of_business_type: Yup.string().required('Required'),
    company_gstn: Yup.string().required('Required'),
    company_pan: Yup.string().required('Required'),
    company_cin_llpin: Yup.string().required('Required'),
    building_street_area: Yup.string().required('Required'),
    locality_town: Yup.string().required('Required'),
    city_district: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
});

const initialValues = {
    buyer_id: '',
    authorised_signatory_name: '',
    authorised_signatory_designation: '',
    authorised_signatory_phone_number: '',
    authorised_signatory_email_address: '',
    pan_or_aadhar: 'aadhar',
    authorised_signatory_pan: '',
    authorised_signatory_adhaar: '',
    company_name: '',
    cmp_legal_entity_type: '',
    date_of_incorporation: '',
    company_phone_number: '',
    company_email_address: '',
    annual_turnover_type: '',
    nature_of_business_type: '',
    company_gstn: '',
    company_pan: '',
    company_cin_llpin: '',
    building_street_area: '',
    locality_town: '',
    city_district: '',
    state: '',
    country: '',
   };
const LegalEntityForm = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectedStore = useSelector((store: any) => store.stores.selectedStore);
    const refValues = useSelector((store: any) => store.refValues.referenceList);

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = () => {
        console.log("selected store = ", selectedStore)
        let buyer_id = selectedStore.buyer_id;
        getLegalEntityDetails(buyer_id)
        .then((data: any) => {
            setData(data);
            if(data){
                console.log("legal entity details = ", data)
                initialValues.buyer_id = buyer_id;
            }
            else{
                // let default initial values load
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
      }

      const updateLegalEntityDetails = (values: FormikValues) => {
        saveLegalEntityDetails(values)
         .then(response => {
            showSuccessMessage("Legal entity details updated successfully")
         })
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
                    console.log("legal entity form submitted = ", values)
                    actions.setSubmitting(false);
                    // updateLegalEntityDetails(values);
                }}
            >
                {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                    <form name="signin" className="form mt-3 " >


                        <div className="name-field">
                            <div className="mb-3  form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory Name</label>
                                <Field 
                                    name="authorised_signatory_name" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_name && touched.authorised_signatory_name ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorised Signatory Name" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_name" component="div" />
                            </div>

                            <div className="mb-3  form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory Designation</label>
                                <Field 
                                    name="authorised_signatory_designation" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_designation && touched.authorised_signatory_designation ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorised Signatory Designation" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_designation" component="div" />
                            </div>

                        </div>

                        <div className="name-field">

                        <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory Phone Number</label>
                                <Field 
                                    name="authorised_signatory_phone_number" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_phone_number && touched.authorised_signatory_phone_number ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    onKeyPress={(e: any) => {
                                        if (!/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Authorised Signatory Phone No." 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_phone_number" component="div" />
                            </div>
                            <div className="mb-3 form-field-container-full-width">
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory Email Address</label>
                                <Field 
                                    name="authorised_signatory_email_address" type="email" 
                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_email_address && touched.authorised_signatory_email_address ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Authorised Signatory Email Address" 
                                />
                                <ErrorMessage className='error' name="authorised_signatory_email_address" component="div" />
                            </div>


                        </div>

                                <div className="name-field">
                                    <div className="custom-radio-box">
                                        <div className="input-control custom-radio-label">
                                            <label htmlFor="email" className="input-label  required">Authorised Signatory PAN/Aadhaar</label>
                                        </div>
                                        <div className="radio-buttons-container-dashboard dashboard-namefield">

                                            <div className="radio-button">
                                                <Field
                                                    name="pan_or_aadhar"
                                                    type="radio"
                                                    id="radio2"
                                                    placeholder="Legal Entity Name"
                                                    value="aadhar"
                                                    onChange={(e: any) => {
                                                        const value = e.target.value;
                                                        if(value === 'pan'){
                                                            setFieldValue("authorised_signatory_adhaar", '')
                                                        }
                                                        else{
                                                            setFieldValue("authorised_signatory_pan", '')
                                                        }
                                                        console.log(values)
                                                        // You can add more logic to change validators based on value
                                                      }}
                                                    
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
                                                    onChange={(e: any) => {
                                                        const value = e.target.value;
                                                        if(value === 'pan'){
                                                            setFieldValue("authorised_signatory_adhaar", '')
                                                        }
                                                        else{
                                                            setFieldValue("authorised_signatory_pan", '')
                                                        }
                                                        console.log(values)
                                                        // You can add more logic to change validators based on value
                                                      }}
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
                                        values.pan_or_aadhar == "aadhar"
                                        ?
                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory Aadhaar</label>
                                                <Field
                                                    name="authorised_signatory_adhaar" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_adhaar && touched.authorised_signatory_adhaar ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Authorised Signatory Aadhar"
                                                />
                                                <ErrorMessage className='error' name="authorised_signatory_adhaar" component="div" />
                                            </div>

                                        :
                                            <div className="mb-3 form-field-container-full-width">
                                                <label htmlFor="exampleFormControlInput1" className="form-label required">Authorised Signatory PAN</label>
                                                <Field
                                                    name="authorised_signatory_pan" type="text"
                                                    className={'form-control dashboard-namefield ' + (errors.authorised_signatory_pan && touched.authorised_signatory_pan ? 'input-field-error' : '')}
                                                    id="exampleFormControlInput1"
                                                    onKeyPress={(e: any) => {
                                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="Authorised Signatory PAN"
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
                                    name="cmp_legal_entity_type" as="select" 
                                    className={'form-control custom-select dashboard-namefield ' + (errors.cmp_legal_entity_type && touched.cmp_legal_entity_type ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Company Legal Entity Type" 
                                >
                                <option value={""}>--select--</option>
                                {
                                    refValues.cmpLegalEntityData
                                    .map((entity : any, index: any) => {
                                        return  <option key={index} value={entity.company_legal_entity_type}>{entity.company_legal_entity_type}</option>
                                    })
                                }
                                </Field>
                                <ErrorMessage className='error' name="cmp_legal_entity_type" component="div" />
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
                                        refValues.annualTurnoverData
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
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Nature of Organization</label>
                                <Field 
                                    name="nature_of_business_type" as="select" 
                                    className={'form-control custom-select dashboard-namefield ' + (errors.nature_of_business_type && touched.nature_of_business_type ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    placeholder="Nature of Organization" 
                                >
                                    <option value={""}>--select--</option>
                                    {
                                        refValues.businessNatureData
                                        .map((nature : any, index: any) => {
                                            return  <option key={index} value={nature.nature_of_business_type}>{nature.description}</option>
                                        })
                                    }
                                </Field>
                                <ErrorMessage className='error' name="nature_of_business_type" component="div" />
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
                                <label htmlFor="exampleFormControlInput1" className="form-label required">Company CIN/LLPIN</label>
                                <Field 
                                    name="company_cin_llpin" type="text" 
                                    className={'form-control dashboard-namefield ' + (errors.company_cin_llpin && touched.company_cin_llpin ? 'input-field-error' : '')}
                                    id="exampleFormControlInput1" 
                                    onKeyPress={(e: any) => {
                                        if (!/[a-zA-Z0-9]/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                    placeholder="Company CIN/LLPIN" 
                                />
                                <ErrorMessage className='error' name="company_cin_llpin" component="div" />
                            </div>
                        </div>
                                <div className='text-left'>
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
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">City/District</label>
                                        <Field 
                                            name="city_district" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.city_district && touched.city_district ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="City/District" 
                                        />
                                        <ErrorMessage className='error' name="city_district" component="div" />
                                    </div>


                                    <div className="mb-3 form-field-container-full-width">
                                        <label htmlFor="exampleFormControlInput1" className="form-label required">State</label>
                                        <Field 
                                            name="state" type="text" 
                                            className={'form-control dashboard-namefield ' + (errors.state && touched.state ? 'input-field-error' : '')}
                                            id="exampleFormControlInput1" 
                                            placeholder="State" 
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
                                        />
                                        <ErrorMessage className='error' name="country" component="div" />
                                    </div>
                                </div>
                        
                        <div className="text-center">
                            <a className="btn-link"><button type="button"
                                className="btn-custom  mt-2 btn-right" 
                                disabled={!(isValid && dirty) || isSubmitting}
                                onClick={() => {
                                  handleSubmit();
                                }}>
                                    Submit
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