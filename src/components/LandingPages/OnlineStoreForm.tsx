import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers, FieldArray } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';
import { getOnlineStore, saveOnlineStore } from '../../services/AccountService';

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
          displayValue="description"
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
        category_id: Yup.string().required('category is required'),
        city: Yup.array().required("required"),
      })
    )
    .min(1, 'At least one category is required'),
});

const initialValues = {
    store_url: 'https://myfashion.com',
    categories: [
        // {
        //     category_id: 1,
        //     city_id: 1,
        // },
        // {
        //     category: '2',
        //     city:[
        //       {
        //         id: '1',
        //         name: 'Bangalore'
        //       },
        //       {
        //         id: '2',
        //         name: 'Mumbai'
        //     },
        //     ],
        //   }
      ],
   };


const OnlineStoreForm = ({ onUpdate }: any) => {
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const [loading, setLoading] = useState(true)

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

    useEffect(() => {
        fetchData();
        // setLoading(false);
      }, []);

      const fetchData = () => {
        getOnlineStore()
        .then((data: any) => {
            
            if(data){

                data[0]['categoryCityMappings'] = [
                    {
                        "category_id": 12,
                        "city_id": 3,
                        "category": {
                            "ondc_categories_type": "Retail",
                            "ondc_categories_code": "ONDC:RET1B",
                            "description": "Hardware and Industrial"
                        },
                        "city": {
                            "city_ref": "Chennai",
                            "description": "Detroit of India",
                            "std_code": "044"
                        }
                    },
                    {
                        "category_id": 12,
                        "city_id": 2,
                        "category": {
                            "ondc_categories_type": "Retail",
                            "ondc_categories_code": "ONDC:RET1B",
                            "description": "Hardware and Industrial"
                        },
                        "city": {
                            "city_ref": "Mumbai",
                            "description": "Financial capital of India",
                            "std_code": "022"
                        }
                    },
                    {
                        "category_id": 13,
                        "city_id": 1,
                        "category": {
                            "ondc_categories_type": "Retail",
                            "ondc_categories_code": "ONDC:RET1C",
                            "description": "Building and construction supplies"
                        },
                        "city": {
                            "city_ref": "Bengaluru",
                            "description": "Silicon Valley of India",
                            "std_code": "080"
                        }
                    }
                ]

                console.log("online store details = ", data)

                setData(data[0])
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

    const setData = (values: any) => {
        // let response = 
        initialValues.store_url = values.store_url;
        const formattedData = values.categoryCityMappings.reduce((acc: any, entry: any) => {
            const { category_id, city_id, city } = entry;
        
            // Find or create the category object in the accumulator
            let categoryEntry = acc.find((item: any) => item.category_id === category_id);
        
            if (!categoryEntry) {
                categoryEntry = {
                    category_id: category_id,
                    city: [],
                };
                acc.push(categoryEntry);
            }
        
            // Add the city_id to the city_ids array
            categoryEntry.city.push({city_id: city_id, description: city.description});
        
            return acc;
        }, []);

        initialValues.categories = formattedData;

        setLoading(false)

    }

    const updateOnlineStoreDetails = (values: FormikValues) => {
        let payload: any = []
        values.categories.forEach((cat: any, index: any) => {
            cat.city.forEach((city: any, index: any) => {
                payload.push(
                    {
                        category_id: cat.category_id,
                        city_id: city.city_id
                    })
            })
        })
        console.log("payload = ", payload)
        delete payload['store_url']
        saveOnlineStore(payload)
         .then(response => {
            showSuccessMessage("Online Store details updated successfully")
         })
         .catch(err => {
            // setAllowEnterOtp(false);
         });
    }

    return (
        <>

        {
            !loading 
            ?
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
                                disabled
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
                                                                            name={`categories.${index}.category_id`}
                                                                            className="form-select custom-select dashboard-three-namefield">
                                                                            <option value={""}>--select--</option>
                                                                            {
                                                                                
                                                                                refValues.categoriesType
                                                                                    .map((cat: any, index: any) => {
                                                                                        return <option key={index} value={cat.ondc_categories_id}>{cat.description}</option>
                                                                                    })
                                                                            }

                                                                        </Field>
                                                                        <ErrorMessage className='error' name={`categories.${index}.category_id`} component="div" />
                                                                    </td>
                                                                    <td data-name="name">
                                                                        <div className="input-group">
                                                                        <Field
                                                                            name={`categories.${index}.city`}
                                                                            component={CustomMultiselect}
                                                                            options={refValues.cities}
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
            :

            <></>
        }

        </>
    ) 

}

export default OnlineStoreForm;