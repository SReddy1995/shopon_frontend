import React, { useEffect, useState } from 'react';
import { fetchTrackDetailsBySeller, fetchTrackOrderBySeller } from '../../services/OrdersService';

const TrackingDetails = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);

    const fetchTrackDetails = () => {   
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
        
    }

     const getTrackBySeller = () => {
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
        }

    useEffect(()=>{
        getTrackBySeller();
    },[props])

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-between px-0">
                    <h4>Track status</h4>
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
                    noData && <div className="col-12 px-0">
                        <div className=" mt-4">
                            <h5>{data}</h5>
                        </div>
                    </div>
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