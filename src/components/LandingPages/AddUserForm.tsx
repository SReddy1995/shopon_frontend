import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';


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


const userValidationSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  email_address: Yup.string().email('Invalid email format').required('Email is required'),
  role: Yup.string().required("Required"),
  enabled: Yup.string().required("Required"),
});

const initialValues = {
  firstname: '',
  lastname: '',
  email_address: '',
  role: '',
  enabled: '',
};


const AddUserForm = (props: any) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [initialValuesForForm, setFormInitialValues] = useState(initialValues);

  const roles = [
    {id: "Admin", name: "Admin"},
    {id: "Operator", name: "Operator"},
    {id: "Finance", name: "Finance"},
    {id: "Inventory", name: "Inventory"}
  ]

  useEffect(() => {
    if(props.mode == 'Edit'){
      setData();
    }
    else{
      setFormInitialValues({firstname: '', lastname: '', email_address: '', role: '', enabled: ''})
      setLoading(false);
    }

  }, []);

  const setData = () => {

    setLoading(false);
    setFormInitialValues({firstname: props.selectedUser.firstname, lastname: props.selectedUser.lastname, email_address: props.selectedUser.email_address, role: props.selectedUser.role, enabled: props.selectedUser.enabled})
  }

  const submitForm = (values: FormikValues) => {
    if(props.mode == 'Add'){
      addUser(values)
    }
    else{
      editUser(values)
    }
  }

  const addUser = (values: FormikValues) => {
    // addUser(values)
    //  .then(response => {
    //     showSuccessMessage("User Added successfully")
    //  })
  }

  const editUser = (values: FormikValues) => {
    // editUser(values)
    //  .then(response => {
    //     showSuccessMessage("User Added successfully")
    //  })
  }

  const closeModal = () =>{
    props.modalClosed();
  }


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submitted value:', inputValue);
    setInputValue('');
  };

  return (

    <>
      {
        !loading ?
          <section className="wrapper">
            <div className="container">
              <div className="row">
                <div className="col-6 text-left">
                <h3>{props.mode} User</h3>
                </div>
                <div className="col-6 text-right">
                <i className="fa fa-close cursor-pointer" onClick={closeModal}></i>
                </div>
              </div>
            </div>
            
            <Formik
              initialValues={initialValuesForForm}
              validationSchema={userValidationSchema}
              onSubmit={(values, actions) => {
                console.log("add user form submitted = ", values)
                actions.setSubmitting(false);
                submitForm(values);
              }}
            >
              {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (
                <div className="container">

                      <form name="signin" className="form ">
                      <div className="row">
                      <div className="col-md-6 col-12">
                          <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">First Name</label>
                            <Field
                              name="firstname" type="text"
                              className={'form-control' + (errors.firstname && touched.firstname ? 'input-field-error' : '')}
                              id="exampleFormControlInput1"
                              placeholder="First Name"
                            />
                            <ErrorMessage className='error' name="firstname" component="div" />
                          </div>
                          </div>
                          <div className="col-md-6 col-12">
                          <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Last Name</label>
                            <Field
                              name="lastname" type="text"
                              className={'form-control' + (errors.lastname && touched.lastname ? 'input-field-error' : '')}
                              id="exampleFormControlInput1"
                              placeholder="Last Name"
                            />
                            <ErrorMessage className='error' name="lastname" component="div" />
                          </div>
                        </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
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
                        </div>
                        <div className="row">
                          <div className="col-12">
                          <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Role</label>
                            <Field
                              name="role" as="select"
                              className={'form-control custom-select dashboard-namefield ' + (errors.role && touched.role ? 'input-field-error' : '')}
                              id="exampleFormControlInput1"
                              placeholder="Role"
                            >
                              <option value={""}>--select--</option>
                              {
                                roles
                                  .map((entity: any, index: any) => {
                                    return <option key={index} value={entity.id}>{entity.name}</option>
                                  })
                              }
                            </Field>
                            <ErrorMessage className='error' name="role" component="div" />
                          </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                          <div className="custom-radio-box">
                            <div className="input-control custom-radio-label">
                              <label htmlFor="email" className="input-label required">Enabled</label>
                            </div>
                            <div className="radio-buttons-container-dashboard dashboard-namefield">

                              <div className="radio-button">
                                <Field
                                  name="enabled"
                                  type="radio"
                                  id="radio2"
                                  placeholder="Legal Entity Name"
                                  value="Y"
                                  className={errors.enabled && touched.enabled ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                />
                                <label htmlFor="radio2" className="radio-button__label">
                                  <span className="radio-button__custom"></span>

                                  Yes
                                </label>
                              </div>
                              <div className="radio-button">
                                <Field
                                  name="enabled"
                                  type="radio"
                                  id="radio1"
                                  placeholder="Legal Entity Name"
                                  value="N"
                                  className={errors.enabled && touched.enabled ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                />
                                <label htmlFor="radio1" className="radio-button__label">
                                  <span className="radio-button__custom"></span>

                                  No
                                </label>
                              </div>
                            </div>

                          </div>
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
                </div>

              )}
            </Formik>

          </section>
          :
          <></>
      }


    </>

    // <button onClick={props.modalClosed}>close Modal</button>

  );
};

export default AddUserForm;