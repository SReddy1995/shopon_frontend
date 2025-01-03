import React, { useCallback, useEffect, useState } from 'react';
import { fetchTrackDetailsBySeller, fetchTrackOrderBySeller } from '../../services/OrdersService';

const TrackingDetails = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchTrackDetails = useCallback(() => {   
        let payload = {
            order_id: props.seller.order_seller_seq,
            seller_id: props.seller.seller_id
        }
        fetchTrackDetailsBySeller(payload)
                .then((data: any) => {
                    console.log("tracking details = ", data);
                    setLoading(false);
                })
                .catch(err => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        
    },[props.seller.order_seller_seq, props.seller.seller_id])

     const getTrackBySeller = useCallback(() => {
        setLoading(true);
            let payload = {
                order_id: props.seller.order_seller_seq,
                store_url: props.selected_order.store_url,
                seller_id: props.seller.seller_id
            }
            fetchTrackOrderBySeller(payload)
                .then((data: any) => {
                    setTimeout(() => {
                        fetchTrackDetails()
                    }, 5000);
                })
                .catch(err => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        },[fetchTrackDetails, props.seller.order_seller_seq, props.selected_order.store_url, props.seller.seller_id])

    useEffect(()=>{
        getTrackBySeller();
    },[getTrackBySeller])

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-between px-0">
                    <h5>Track Status for #{props.selected_order.order_id}</h5>
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
                                <p className='mt-2 ml-2'>Please wait! Getting tracking details</p>
                            </div>

                        </div>
                }
                {
                    noData && 
                    <>
                             <div className="d-flex mt-2">
                                   <div className="px-0 error-msg-block">
                                        <div>
                                            <h6 className='error-msg'><i className='fa fa-exclamation-circle me-1'></i>{data}</h6>
                                        </div>
                                    </div>
                                <div>
                               <h6><span className='color-grey'></span>{props.seller?.provider_info?.name}</h6>
                               </div>
                            </div>
                    </>
                }
                {
                    !loading && <>
                            <div className="col-12 px-0">

                            </div>
                            <div className="col-12 px-0">

                            </div>
                    </>
                }
                
            </div>
        </div>
        </>
    ) 

}

export default TrackingDetails;