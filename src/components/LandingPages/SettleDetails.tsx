import React, { useCallback, useEffect, useState } from 'react';
import { fetchSettleDetailsBySeller, fetchSettleOrderBySeller } from '../../services/OrdersService';
import { useSelector } from 'react-redux';

const SettleDetails = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [data, setData] = useState<any>(null);
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const settlement_status_list = refValues.settlement_status.map((status: any) => ({
        value: status.eazehubsettlementstatusref,
        label: status.description
    })) || [];

    const formatCurrency = (price: any, curr: any = 'INR') => {
        const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr }).format(price);
        return formattedPrice.includes('.00') ? formattedPrice.split('.')[0] : formattedPrice;
    };

    const getSettlementStatus = (item: any) => {
        if(item){
            return settlement_status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }
 
    const formatResponse = useCallback((data : any) => {
        const order_details = data[0]?.orders?.find((order: any) => order.order_id === props.selected_order.order_id) || null;
        let res = {
            settlement_id : data[0].settlement_id,
            order_id: props.selected_order.order_id,
            order: {
                reference_no: order_details?.order_settlement_info?.reference_no,
                amount: `${formatCurrency(order_details?.order_settlement_info?.settled_amount.value, order_details?.order_settlement_info?.settled_amount.currency)} of ${formatCurrency(order_details?.order_settlement_info?.amount.value, order_details?.order_settlement_info?.amount.currency)}`,
                status: order_details?.order_settlement_info?.status ? order_details?.order_settlement_info?.status : '',
            },
            fee: {
                reference_no: order_details?.self_settlement_info?.reference_no,
                amount: formatCurrency(order_details?.self_settlement_info?.amount.value, order_details?.self_settlement_info?.amount.currency),
                status: order_details?.self_settlement_info?.status ? order_details?.self_settlement_info?.status : '',
            }
        }
        setData(res)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.selected_order.order_id])

    const fetchSettleDetails = useCallback(() => {   
        let payload = {
            order_id: props.seller.order_seller_seq,
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
        
    },[formatResponse, props.seller.order_seller_seq, props.selected_order.store_url, props.seller.seller_id])

     const getSettleBySeller = useCallback(() => {
        setLoading(true);
            let payload = {
                order_id: props.seller.order_seller_seq,
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
        },[fetchSettleDetails, props.seller.order_seller_seq, props.selected_order.store_url, props.seller.seller_id])

    useEffect(()=>{
        getSettleBySeller();
    },[getSettleBySeller])

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid" >
            <div className="row" >
                <div className="col-12 d-flex justify-content-between px-0" >
                    <h5>Settlement Status for #{props.seller.order_seller_seq}</h5>
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
               
                    noData ? 
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
                                    {/* <div className="col-12 px-0">
                                        <div className=" mt-4">
                                            <h6>{data}</h6>
                                        </div>
                                    </div> */}
                    </>
                    
                    :
                    data &&
                    <>
                            <div className="col-12 px-0 d-flex justify-content-between mt-2">
                               <h6> <span className='color-grey'>Settlement ID :</span><b>{data.settlement_id}</b></h6>
                               <h6><span className='color-grey'></span><b>{props.seller?.provider_info?.name}</b></h6>
                            </div>
                            <div className="col-12 px-3 mt-2 text-left card">
                                <div className="row" style={{backgroundColor:'aliceblue',borderRadius:'0.475rem',marginTop:'1px'}}>
                                    <div className="col-4  py-1">
 
                                    </div>
                                    <div className="col-4  py-1">
                                        <h6><b>Order</b></h6>
                                    </div>
                                    <div className="col-4  py-1">
                                        <h6><b>Fee</b></h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4  py-1" >
                                        <h6><b>Reference #</b></h6>
                                    </div>
                                    <div className="col-4  py-1">
                                        <p className='mb-0'>{data.order.reference_no}</p>
                                    </div>
                                    <div className="col-4  py-1">
                                        <p className='mb-0'>{data.fee.reference_no}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4  py-1">
                                        <h6><b>Amount</b></h6>
                                    </div>
                                    <div className="col-4  py-1">
                                        <p className='mb-0'>{data.order.amount}</p>
                                    </div>
                                    <div className="col-4  py-1">
                                        <p className='mb-0'>{data.fee.amount}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4  py-1">
                                        <h6><b>Status</b></h6>
                                    </div>
                                    <div className="col-4  py-1 ">
                                        <p className='mb-0'><i
                                            className={data.order.status === 'SETTLED' ? 'fa fa-check-circle me-1' : 'fa fa-times-circle me-1'} style={data.order.status === 'SETTLED' ? {color: 'green'} : {color:'red'}}></i>{getSettlementStatus(data.order.status)}</p>
                                    </div>
                                    <div className="col-4  py-1 ">
                                        <p className='mb-0'><i className={data.fee.status === 'SETTLED' ? 'fa fa-check-circle me-1' : 'fa fa-times-circle me-1'} style={data.fee.status === 'SETTLED' ? {color: 'green'} : {color:'red'}}></i>{getSettlementStatus(data.fee.status)}</p>
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