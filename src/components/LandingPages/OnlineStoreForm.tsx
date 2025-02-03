import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, FormikValues, FieldArray } from 'formik';
import { showSuccessMessage } from '../../shared/notificationProvider';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';
import { getOnlineStore, saveOnlineStore } from '../../services/AccountService';
import { ONLINE_UPDATE_SUCCESS } from '../../utils/constants/NotificationConstants';


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
    subscriber_id: Yup.string()
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
    store_url: '',
    subscriber_id: '',
    categories: [],
   };


const OnlineStoreForm = (props: any) => {
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const cities = [...refValues.cities]
      .sort((a: any, b: any) => {
        if (a.city_ref === "All" && b.city_ref !== "All") return -1;
        if (b.city_ref === "All" && a.city_ref !== "All") return 1;
        return a.description.localeCompare(b.description);
      });
    const [loading, setLoading] = useState(true)
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;

  

    // const filteredOptions = cities.filter(option =>
    //     option.toLowerCase().includes(searchTerm.toLowerCase())
    //   );

    const setData = useCallback((values: any) => {
        if(values.categoryCityMappings.length> 0){
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
        }



        setLoading(false)

    },[])

      const fetchData = useCallback(() => {
        getOnlineStore()
        .then((data: any) => {
            initialValues.store_url = user_details.store_url;
            initialValues.subscriber_id = user_details.subscriber_id;
            if(data && data.length>0){
                setData(data[0])
            }
            else{
                initialValues.categories = [];
            }
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        });
      },[setData, user_details.store_url, user_details.subscriber_id])

      useEffect(() => {
        fetchData();
        // setLoading(false);
      }, [fetchData]);

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
        let res = {
            categories : null
        }
        res.categories = payload
        saveOnlineStore(res)
         .then(response => {
            showSuccessMessage(ONLINE_UPDATE_SUCCESS)
            props.reloadStatus();
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
                            <p>This section collects the details relating to your online Shopify store</p>
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
                        <div className="name-field">

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

                        <div className="mb-3 form-field-container-full-width">
                            <label htmlFor="exampleFormControlInput1" className="form-label required">Subscriber ID</label>
                            <Field
                                name="subscriber_id"
                                type="text"
                                className={'form-control dashboard-namefield ' + (errors.subscriber_id && touched.subscriber_id ? 'input-field-error' : '')}
                                disabled
                            />
                            <ErrorMessage className='error' name="subscriber_id" component="div" />
                        </div>

                        </div>
                        <FieldArray name="categories">
                            {({ insert, remove, push }) => (
                                <>
                                    <div className="row clearfix">
                                        <div className="col-md-12">
                                            <table className="table table-bordered rounded-3" id="tab_logic">
                                                <thead className="border-white">
                                                    <tr >
                                                        <th className="form-field store-category-column">
                                                            ONDC categories you wish to signup for
                                                        </th>
                                                        <th className="form-field ">
                                                            Select city
                                                        </th>

                                                        <th className="text-center store-action-column" >
                                                        </th>

                                                      
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {values.categories.length > 0 &&
                                                        values.categories.map((category, index) => (
                                                                <tr key={index} id='addr0' data-id="0" className="hidden">
                                                                    <td data-name="name" className="input-table-column">
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
                                                                    <td data-name="name" className="input-table-column">
                                                                        <div className="input-group online-store-form">
                                                                        <Field
                                                                            name={`categories.${index}.city`}
                                                                            component={CustomMultiselect}
                                                                            options={cities}
                                                                        />
                                                                        <ErrorMessage className='error' name={`categories.${index}.city`} component="div" />
                                                                        </div>
                                                                    </td>

                                                                

                                                                    <td data-name="del" className="text-center input-table-column">
                                                                        <button onClick={() => remove(index)} type="button"
                                                                            className="btn-danger-icon" ><i className="fa fa-trash"></i></button>
                                                                    </td>
                                                                </tr>
                                                        ))}


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <button type="button"
                                            onClick={() => push({ name: '', id: '', city: '' })}
                                            className="btn-custom btn-success float-right" ><i className="fa fa-plus"></i></button>
                                    </div>
                                </>
                            )}

                        </FieldArray>


                        <div className="text-center mt-4">
                            <button type="button"
                            disabled={!(isValid) || isSubmitting}
                            onClick={() => {
                                handleSubmit();
                            }}
                            className="btn-custom mt-2 btn-right" >Save</button>
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