import React, { useCallback, useEffect, useState } from 'react';
import { fetchBuyerInfo, fetchBuyerInfoDetails } from '../../services/AccountService';

const DisplayEntityDetails = (props:any) => {
    const { message } = props.data;
    const entity = message.info.entity;
  
    // Helper function to handle nested objects
    const renderEntityDetails = (entity:any,parentKey:any) => {
      return Object.entries(entity).map(([key, value]) => {
        // If value is an array, render its items
        if (Array.isArray(value)) {
          return (
            <div key={key}>
             
             <p key={key} style={{textAlign:'left'}}>
             <span className='text-grey'>{key}:</span>
                {value.map((item, index) => (
                    
                    <span className='text-default'><b>{item}</b></span>

                ))}
                </p>
                
              

            
            </div>
          );
        }
        
        // If the value is an object, render its properties recursively
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={key}>
            <h5 style={{textAlign:'left',marginBottom:'20px'}}>{key}</h5><hr />
              {renderEntityDetails(value,key)} {/* Recursively call for nested objects */}
            </div>
          );
        }
  
        // For other types (string, number, etc.), render as a simple <p> tag
        if (typeof value === 'string' && value !== null) {
        return (
          <p key={key} style={{textAlign:'left'}}>
            <span className='text-grey'>{key}:</span><span className='text-default'><b>{value}</b></span>
          </p>
        );
    }
      });
    };
  
    return (
      <div>
    
        {renderEntityDetails(entity,null)}
      </div>
    );
  };
const BuyerInfo = (props:any) => {
  const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;


    const getBuyerInfoDetails = useCallback(() => {   
        let payload = {
            category_id: props.category.ondc_categories_code,
                buyer_id: user_details.buyer_id
        }
        fetchBuyerInfoDetails(payload)
                .then((data: any) => {
                    console.log("buyer info details = ", data);
                    setLoading(false);
                    setData(data.buyerInfoResponse)
                })
                .catch(err => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        
    },[props.category.ondc_categories_code, user_details.buyer_id])

     const getBuyerInfo = useCallback(() => {
        setLoading(true);
            let payload = {
                category_id: props.category.ondc_categories_code,
                buyer_id: user_details.buyer_id
            }
            fetchBuyerInfo(payload)
                .then((data: any) => {
                    setTimeout(() => {
                        getBuyerInfoDetails()
                    }, 5000);
                })
                .catch(err => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        },[fetchBuyerInfoDetails,props.category.ondc_categories_code, user_details.buyer_id])

    useEffect(()=>{
        getBuyerInfo();
    },[getBuyerInfo])

    const closeModal = () => {
        props.closeModal();
    }

    const getCamelCaseText = (str: any) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-between px-0">
                    <h5>Buyer Info details for {props.category.description}</h5>
                    <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
                </div>
                <div className="col-12 px-0">
                    <div className="dropdown-divider"></div>
                </div>
                {
                    loading && <div className="loader-container mt-2">
                            <div className="loader">

                            </div>
                            <div>
                                <p className='mt-2 ml-2'>Please wait! Getting buyer info details</p>
                            </div>

                        </div>
                }
                {
                    !loading && noData && 
                    <>
                             <div className="d-flex mt-2">
                                   <div className="px-0 error-msg-block">
                                        <div>
                                            <h6 className='error-msg'><i className='fa fa-exclamation-circle me-1'></i>{data}</h6>
                                        </div>
                                    </div>
                                <div>
                              
                               </div>
                            </div>
                    </>
                }
                {
                    !loading && !noData && <>
                            <div className="col-12 px-0">
                                <div>
                                  <DisplayEntityDetails data={data} />
                                </div>
                            </div>
                    </>
                }
                
            </div>
        </div>
        </>
    ) 

}

export default BuyerInfo;