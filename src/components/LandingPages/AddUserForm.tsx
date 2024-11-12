import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import { createUser, updateUser } from '../../services/UsersService';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { USER_ADDED_SUCCESS, USER_UPDATE_SUCCESS } from '../../utils/constants/NotificationConstants';


const CustomMultiselect = ({ field, form, options } : any) => {
  const handleSelect = (selectedList: any) => {
    form.setFieldValue(field.name, selectedList);
  };

  const handleRemove = (selectedList :any) => {
    form.setFieldValue(field.name, selectedList);
  };

  return (
    <div>
      <Multiselect
        options={options} // Options for the dropdown
        onSelect={handleSelect} // Handle selection
        onRemove={handleRemove} // Handle removal
        isObject={true}
        displayValue="name"
        showCheckbox
        selectedValues={field.value}

      />
    </div>
  );
};

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

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
  email_address: Yup.string().email('Invalid email format').matches(emailRegex,'Invalid format').required('Email is required'),
  contact_number: Yup.string()
  .min(10, 'Contact number must be 10 characters')
  .max(10, 'Contact number must be 10 characters')
  .required('Contact number is required'),
  roles: Yup.array()
  .of(
    Yup.object().shape({
      id: Yup.string().required('id is required'),
      name: Yup.string().required("name is required"),
    })
  )
  .min(1, 'At least one role is required'),
  status: Yup.string().required("Required"),
});

const initialValues = {
  firstname: '',
  lastname: '',
  email_address: '',
  contact_number: '',
  roles: '',
  status: '',
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
      setFormInitialValues({firstname: '', lastname: '', email_address: '', contact_number: '', roles: '', status: ''})
      setLoading(false);
    }

  }, []);

  const setData = () => {
    setLoading(false);
    console.log(props.selectedUser)
    setFormInitialValues({firstname: props.selectedUser.firstname, lastname: props.selectedUser.lastname, email_address: props.selectedUser.email_address,
      contact_number: props.selectedUser.contact_number, roles: props.selectedUser.roles, status: props.selectedUser.enabled})
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
    let payload = formatPayloadForRole(values);

    createUser(payload)
     .then(response => {
        showSuccessMessage(USER_ADDED_SUCCESS)
        props.closeAndUpdate();
     })
     .catch((err: any) => {
      console.log(err)
  });
  }

  const formatPayloadForRole = (values: any) => {
    let role = values.roles.map((role: any) => role.id);;
    values['roles'] = role;
    return values;
  }

  const editUser = (values: FormikValues) => {
    let payload = formatPayloadForRole(values);
    updateUser(payload, props.selectedUser.user_id)
     .then(response => {
        showSuccessMessage(USER_UPDATE_SUCCESS)
        props.closeAndUpdate();
     })
     .catch((err: any) => {
      console.log(err)
  });
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
                <div className="col-8 text-left">
                <h3>{props.mode} User</h3>
                </div>
                <div className="col-4 text-right">
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
                          <div className="col-md-6 col-12">
                          <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Email Addess</label>
                            <Field name="email_address"
                              type="email"
                              id="exampleFormControlInput1"
                              placeholder="Email Address"
                              className={'form-control' + (errors.email_address && touched.email_address ? 'input-field-error' : '')}
                            />
                            <ErrorMessage className='error' name="email_address" component="div" />
                          </div>
                          </div>
                          <div className="col-md-6 col-12">
                          <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Contact Number</label>
                            <Field name="contact_number"
                              type="email"
                              id="exampleFormControlInput1"
                              placeholder="Contact Number"
                              onKeyPress={(e: any) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                              className={'form-control' + (errors.contact_number && touched.contact_number ? 'input-field-error' : '')}
                            />
                            <ErrorMessage className='error' name="contact_number" component="div" />
                          </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                        <div className="mb-3 form-field-container-full-width">
                          <label htmlFor="exampleFormControlInput1" className="form-label required">Role</label>
                          <Field
                            name="roles"
                            className={'form-control' + (errors.roles && touched.roles ? 'input-field-error' : '')}
                            component={CustomMultiselect}
                            options={roles}
                          />
                          <ErrorMessage className='error' name="roles" component="div" />
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
                                  name="status"
                                  type="radio"
                                  id="radio2"
                                  placeholder="Legal Entity Name"
                                  value="Y"
                                  className={errors.status && touched.status ? 'radio-button__input input-field-error' : 'radio-button__input'}
                                />
                                <label htmlFor="radio2" className="radio-button__label">
                                  <span className="radio-button__custom"></span>

                                  Yes
                                </label>
                              </div>
                              <div className="radio-button">
                                <Field
                                  name="status"
                                  type="radio"
                                  id="radio1"
                                  placeholder="Legal Entity Name"
                                  value="N"
                                  className={errors.status && touched.status ? 'radio-button__input input-field-error' : 'radio-button__input'}
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
                            disabled={!(isValid) || isSubmitting}
                              onClick={() => {
                                handleSubmit();
                              }}>
                              Save
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