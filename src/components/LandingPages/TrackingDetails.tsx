import React, { useCallback, useEffect, useState } from 'react';
import { fetchTrackDetailsBySeller, fetchTrackOrderBySeller } from '../../services/OrdersService';

const TrackingDetails = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchTrackDetails = useCallback(() => {   
        let payload = {
            order_id: props.selected_order.order_id,
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
        
    },[props.selected_order.order_id, props.seller.seller_id])

     const getTrackBySeller = useCallback(() => {
        setLoading(true);
            let payload = {
                order_number: props.selected_order.order_number,
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
        },[fetchTrackDetails, props.selected_order.order_number, props.selected_order.store_url, props.seller.seller_id])

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
                            <div className="col-12 px-0 text-right mt-2">
                               <h6><span className='color-grey'></span><b>{props.seller?.provider_info?.name}</b></h6>
                            </div>
                                    <div className="col-12 px-0">
                                        <div className=" mt-4">
                                            <h6>{data}</h6>
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