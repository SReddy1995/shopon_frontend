import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers, FieldArray } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';

// Custom Multiselect component for Formik
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

  
const onlineStoreDetailsValidationSchema = Yup.object().shape({
    store_url: Yup.string()
    .required('Required'),
    categories: Yup.array()
    .of(
      Yup.object().shape({
        category: Yup.string().required('category is required'),
        city: Yup.array().required("required"),
      })
    )
    .min(1, 'At least one category is required'),
});

const initialValues = {
    store_url: 'https://myfashion.com',
    categories: [
        {
          category: '1',
          city:[
            {
              id: '1',
              name: 'Bangalore'
            },
          ],
        },
        {
            category: '2',
            city:[
              {
                id: '1',
                name: 'Bangalore'
              },
              {
                id: '2',
                name: 'Mumbai'
            },
            ],
          }
      ],
   };


const OnlineStoreForm = ({ onUpdate }: any) => {
    const refValues = useSelector((store: any) => store.refValues.referenceList);

    const cities =[
        {
          id: '1',
          name: 'Bangalore'
        },
        {
          id: '2',
          name: 'Mumbai'
        },
        {
          id: '3',
          name: 'Mangalore'
        },
        {
          id: '4',
          name: 'Delhi'
        },
      ]

    // const filteredOptions = cities.filter(option =>
    //     option.toLowerCase().includes(searchTerm.toLowerCase())
    //   );

    const updateOnlineStoreDetails = (values: FormikValues) => {
        showSuccessMessage("Online Store details updated successfully")
        onUpdate();
    }

    return (
        <>
            <div className="accordion mt-1" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            Shopify Store
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p>This section collects the details relating to your online shopify store</p>
                        </div>
                    </div>
                </div>


            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={onlineStoreDetailsValidationSchema}
                onSubmit={(values, actions) => {
                    console.log("online store details form submitted = ", values)
                    actions.setSubmitting(false);
                    updateOnlineStoreDetails(values);
                }}
                >
                {({ isSubmitting, errors, touched, values, setFieldValue, handleSubmit, isValid, dirty, resetForm, initialValues }) => (

                    <form name="signin" className="form" style={{ marginLeft: 'auto' }}>


                        <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Store URL</label>
                            <Field
                                name="store_url"
                                type="text"
                                className={'form-control dashboard-namefield ' + (errors.store_url && touched.store_url ? 'input-field-error' : '')}
                            />
                            <ErrorMessage className='error' name="store_url" component="div" />
                        </div>
                        <FieldArray name="categories">
                            {({ insert, remove, push }) => (
                                <>
                                    <div className="row clearfix">
                                        <div className="col-md-12 table-responsive">
                                            <table className="table table-bordered rounded-3" id="tab_logic">
                                                <thead className="border-white">
                                                    <tr >
                                                        <th className="form-field ">
                                                            ONDC Categories You Wish To Signup For
                                                        </th>
                                                        <th className="form-field">
                                                            Select the city
                                                        </th>

                                                        <th className="text-center" >
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {values.categories.length > 0 &&
                                                        values.categories.map((category, index) => (
                                                                <tr key={index} id='addr0' data-id="0" className="hidden">
                                                                    <td data-name="name">
                                                                        <Field as="select"
                                                                            name={`categories.${index}.category`}
                                                                            className="form-select custom-select dashboard-three-namefield">
                                                                            <option value={""}>--select--</option>
                                                                            {
                                                                                
                                                                                refValues.categoriesData
                                                                                    .map((entity: any, index: any) => {
                                                                                        return <option key={index} value={entity.ondc_categories_code}>{entity.description}</option>
                                                                                    })
                                                                            }

                                                                        </Field>
                                                                        <ErrorMessage className='error' name={`categories.${index}.category`} component="div" />
                                                                    </td>
                                                                    <td data-name="name">
                                                                        <div className="input-group">
                                                                        <Field
                                                                            name={`categories.${index}.city`}
                                                                            component={CustomMultiselect}
                                                                            options={cities}
                                                                        />
                                                                        <ErrorMessage className='error' name={`categories.${index}.city`} component="div" />
                                                                        </div>
                                                                    </td>

                                                                    <td data-name="del" className="text-center">
                                                                        <a className="btn-link"><button onClick={() => remove(index)} type="button"
                                                                            className="btn-custom btn-danger" ><i className="fa fa-trash"></i></button></a>
                                                                    </td>
                                                                </tr>
                                                        ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <a className="btn-link"><button type="button"
                                            onClick={() => push({ name: '', id: '', city: '' })}
                                            className="btn-custom btn-success float-right" ><i className="fa fa-plus"></i></button></a>
                                    </div>
                                </>
                            )}

                        </FieldArray>


                        <div className="text-center mt-4">
                            <a  className="btn-link"><button type="button"
                            disabled={!(isValid) || isSubmitting}
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="btn-custom mt-2 btn-right" >Submit</button></a>
                        </div>
                    </form>
                    )}
                </Formik>
        </>
    ) 

}

export default OnlineStoreForm;