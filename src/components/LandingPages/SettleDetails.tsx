import React, { useCallback, useEffect, useState } from 'react';
import { fetchSettleDetailsBySeller, fetchSettleOrderBySeller } from '../../services/OrdersService';

const SettleDetails = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);

    const formatCurrency = (price: any, curr: any = 'INR') => {
        const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr }).format(price);
        return formattedPrice.includes('.00') ? formattedPrice.split('.')[0] : formattedPrice;
    };

    const formatResponse = useCallback((data : any) => {

        const order_details = data?.orders?.find((order: any) => order.order_id === props.selected_order.order_id) || null;
        let res = {
            settlement_id : data.settlement_id,
            order_id: props.selected_order.order_id,
            order: {
                reference_no: order_details?.order_settlement_info?.reference_no,
                amount: `${formatCurrency(order_details?.order_settlement_info?.settled_amount.value, order_details?.order_settlement_info?.settled_amount.currency)} of ${formatCurrency(order_details?.order_settlement_info?.amount.value, order_details?.order_settlement_info?.amount.currency)}`,
                status: order_details?.order_settlement_info?.status,
            },
            fee: {
                reference_no: order_details?.self_settlement_info?.reference_no,
                amount: formatCurrency(order_details?.self_settlement_info?.amount.value, order_details?.self_settlement_info?.amount.currency),
                status: order_details?.self_settlement_info?.status
            }
        }
        setData(res)
    },[props.selected_order.order_id])

    const fetchSettleDetails = useCallback(() => {   
        let payload = {
            order_id: props.selected_order.order_id,
            store_url: props.selected_order.store_url,
            seller_id: props.seller.seller_id
        }
        fetchSettleDetailsBySeller(payload)
                .then((data: any) => {
                    console.log("settle details = ", data);
                    formatResponse(data)
                    setLoading(false);
                })
                .catch((err: any) => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        
    },[formatResponse, props.selected_order.order_id, props.selected_order.store_url, props.seller.seller_id])

     const getSettleBySeller = useCallback(() => {
        setLoading(true);
            let payload = {
                order_id: props.selected_order.order_id,
                store_url: props.selected_order.store_url,
                seller_id: props.seller.seller_id
            }
            fetchSettleOrderBySeller(payload)
                .then((data: any) => {
                    setTimeout(() => {
                        fetchSettleDetails()
                    }, 5000);
                })
                .catch((err: any) => {
                    setNoData(true)
                    setData(err?.response?.data?.error?.msg)
                    setLoading(false);
                });
        },[fetchSettleDetails, props.selected_order.order_id, props.selected_order.store_url, props.seller.seller_id])

    useEffect(()=>{
        getSettleBySeller();
    },[getSettleBySeller])

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-between px-0">
                    <h4>Settlement status</h4>
                    <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
                </div>
                <div className="col-12 px-0">
                    <div className="dropdown-divider"></div>
                </div>
                {
                    loading ? <div className="loader-container mt-2">
                            <div className="loader">

                            </div>
                            <div>
                                <p className='mt-2 ml-2'>Please wait! Getting settlement details</p>
                            </div>

                        </div>
                :
                
                    noData ? <div className="col-12 px-0">
                    <div className=" mt-4">
                            <h5>{data}</h5>
                        </div>
                    </div>
                    :
                    data &&
                    <>
                            <div className="col-12 px-0 d-flex justify-content-between mt-4">
                               <h5> Settlement ID : {data.settlement_id}</h5>
                               <h5>Order ID: {data.order_id}</h5>
                            </div>
                            <div className="col-12 px-3 mt-4 text-left">
                                <div className="row">
                                    <div className="col-4 border py-2">

                                    </div>
                                    <div className="col-4 border py-2">
                                        <h5>Order</h5>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <h5>Fee</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 border py-2">
                                        <h6>Reference #</h6>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.order.reference_no}</p>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.fee.reference_no}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 border py-2">
                                        <h6>Amount</h6>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.order.amount}</p>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.fee.amount}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 border py-2">
                                        <h6>Status</h6>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.order.status}</p>
                                    </div>
                                    <div className="col-4 border py-2">
                                        <p className='mb-0'>{data.fee.status}</p>
                                    </div>
                                </div>
                            </div>
                    </>
                }
                
            </div>
        </div>
        </>
    ) 

}

export default SettleDetails;