import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedOrder } from "../../utils/reduxStore/orderSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStatusBySeller, fetchTrackOrderBySeller, getOrderDetails } from "../../services/OrdersService";
import moment from 'moment';
import ModalWindow from "./ModalWindow";
import ReconciliationDetails from "./ReconciliationDetails";

const OrderDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selected_order = useSelector((store: any) => store.order.selectedOrder);
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    const [noData, setNoData] = useState(false)
    const moreActionsPopupRef = useRef<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSellerForMoreActions, setSelectedSellerForMoreActions] = useState<any>(null);
    const [open, setModalOpen] = useState(false);

    const openReconciliationWindow = () => {
        setModalOpen(true);
      }

    const closeReconciliationWindow = () => {
        setModalOpen(false);
      };

    const navigateToOrderssList = () => {
        dispatch(updateSelectedOrder(null));
        navigate("/landing-page/orders/orders-list")
    }

    const getRowTotal = (ele: any) => {
        let sum = 0;
        if(ele.store_item_price && ele.store_item_quantity){
            sum+= (Number(ele.store_item_price)*Number(ele.store_item_quantity))
        }
        if(ele.packing_charge){
            sum+=  Number(ele.packing_charge)
        }
        if(ele.convenience_fee){
            sum+=  Number(ele.convenience_fee)
        }
        if(ele.delivery_charge){
            sum+=  Number(ele.delivery_charge)
        }
        if(ele.quote_info && ele.quote_info.breakup && ele.quote_info.breakup.length>0 && ele.quote_info.breakup.filter((ele: any) => ele.title === 'Tax').length>0){
            let res = ele.quote_info.breakup.filter((ele: any) => ele.title === 'Tax')[0];
            sum+= Number(res.price.value)
        }
        return sum
    }

    const getProviderLocation = (ele: any) => {
        if(ele.bpp_provider_info && ele.bpp_provider_info.locations && ele.bpp_provider_info.locations.length>0 && ele.bpp_provider_info.locations[0].address && ele.bpp_provider_info.locations[0].address.city){
            return ele.bpp_provider_info.locations[0].address.city
        }
            return 'NA'
    }

    const formatCurrency =(price: any, curr: any) => {
        // Format the number with currency style
        let currency = curr ? curr : 'INR';
        const formattedPrice = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: currency,
        }).format(price);
      
        // Check if the price has decimal part .00 and remove it
        if (formattedPrice.includes('.00')) {
          // Remove the decimal part
          return formattedPrice.split('.')[0];
        }
      
        return formattedPrice;
      }

    const getTax = (ele: any) => {
        if(ele.quote_info && ele.quote_info.breakup && ele.quote_info.breakup.length>0 && ele.quote_info.breakup.filter((ele: any) => ele.title === 'Tax').length>0){
            let res = ele.quote_info.breakup.filter((ele: any) => ele.title === 'Tax')[0];
            return formatCurrency(res.price.value, res.currency) 
        }
        return formatCurrency(0, 'INR') 
    }

    const getItemsFormatted = (itemsList: any) => {
        let arr: any = [];
        itemsList.forEach((ele: any) => {
            let item = {
                name: ele.store_item_title ? ele.store_item_title : null,
                fulfillment_status: ele.fulfillment_state ? ele.fulfillment_state : null,
                sku: ele.store_item_sku ? ele.store_item_sku : 'NA',
                alt_id: ele.alternate_id ? ele.alternate_id : 'NA',
                tracking_id: ele.tracking_number ? ele.tracking_number : 'NA',
                price: ele.store_item_price ? formatCurrency(ele.store_item_price, 'INR') : null,
                qty: ele.store_item_quantity ? ele.store_item_quantity : null,
                pkg_charge: ele.packing_charge ? formatCurrency(ele.packing_charge, 'INR') : null,
                convenience_fee: ele.convenience_fee ? formatCurrency(ele.convenience_fee, 'INR') : null,
                delivery_charge: ele.delivery_charge ? formatCurrency(ele.delivery_charge, 'INR') : null,
                tax: getTax(ele),
                total: formatCurrency(getRowTotal(ele), 'INR'),
            }
            arr.push(item)
        })

        return arr;
    }

    const getSubTotalSellerWise = (itemsList: any) => {
        let sum = 0;
        itemsList.forEach((ele: any) => {
            sum+= getRowTotal(ele)
        })
        return sum
    }

    const getTotalSellerWise = (itemsList: any) => {
        let sum = 0;
        itemsList.forEach((ele: any) => {
            sum+= getRowTotal(ele)
        })
        return sum
    }

    const formatResponse = (data: any) => {
        const groupedData = data.reduce((acc: any, item: any) => {
            const key = item.order_seller_seq;
            if (!acc[key]) {
            acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        let sellers: any = []
        let order_summary_subTotal = 0;
        let order_summary_shipping_charges = 0;
        let taxes = 0;
        let itemsCount = 0;
        for (const key in groupedData) {
            let itemsList = groupedData[key];
            if(itemsList && itemsList.length>0){
                sellers.push({
                    is_ondc_product: itemsList[0].is_ondc_product ? itemsList[0].is_ondc_product : false,
                    order_seller_seq: key,
                    provider_name: itemsList[0].provider_name ? itemsList[0].provider_name : '',
                    provider_phone: itemsList[0].provider_phone ? itemsList[0].provider_phone : 'NA',
                    provider_location: getProviderLocation(itemsList[0]),
                    seller_id: itemsList[0].seller_id ? itemsList[0].seller_id : null,
                    seller_name: itemsList[0].seller_name ? itemsList[0].seller_name : '',
                    seller_phone: itemsList[0].seller_phone ? itemsList[0].seller_phone : 'NA',
                    seller_location: itemsList[0].seller_location ? itemsList[0].seller_location : 'NA',
                    delivery_method: itemsList[0].delivery_method ? itemsList[0].delivery_method : 'NA',
                    shipping_profile: itemsList[0].shipping_profile ? itemsList[0].shipping_profile : 'NA',
                    items: getItemsFormatted(itemsList),
                    subTotal: formatCurrency(getSubTotalSellerWise(itemsList), 'INR'),
                    shipping_charges: formatCurrency(0, 'INR'),
                    total: formatCurrency(getTotalSellerWise(itemsList), 'INR')
                })
                itemsCount+=itemsList.length
                order_summary_subTotal+= getSubTotalSellerWise(itemsList)
                order_summary_shipping_charges+= 0
                taxes+= 0
            }
        }
        console.log("formatted response = ", sellers)
        setData({
            sellers: sellers,
            order_summary: {
                subTotal: formatCurrency(order_summary_subTotal, 'INR'),
                itemsCount: itemsCount,
                shipping_charges: formatCurrency(order_summary_shipping_charges, 'INR'),
                taxes: formatCurrency(taxes, 'INR'),
                total: formatCurrency(order_summary_subTotal, 'INR')
            }
        })
    }

    const fetchOrderDetails = useCallback(() => {
        setLoading(true)
        let payload = {
            order_id: selected_order.order_id
        }
        getOrderDetails(payload)
            .then((data: any) => {
                if (data && data.length>0) {
                    formatResponse(data)
                    setNoData(false)
                }
                else{
                    setNoData(true)
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
    },[selected_order.order_id])

    useEffect(() => {   
        fetchOrderDetails();
    },[fetchOrderDetails])

        // Close the popup if clicked outside
        useEffect(() => {
        const handleClickOutside = (event: any) => {
            
            if (moreActionsPopupRef.current && !moreActionsPopupRef.current.contains(event.target)) {
                setIsPopupOpen(false)
                setSelectedSellerForMoreActions(null); // Close the popup if the click is outside
            }
        };
    
        // Attach the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);
    
        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, []);

    const openMoreActions = (seller_seq: any) => {
        if(isPopupOpen && selectedSellerForMoreActions === seller_seq){
            closeMoreActions();
        }
        else if(isPopupOpen && selectedSellerForMoreActions !== seller_seq){
            setSelectedSellerForMoreActions(seller_seq);
        }
        else{
            setIsPopupOpen(true)
            setSelectedSellerForMoreActions(seller_seq);
        }
    }

    const closeMoreActions = () => {
        setIsPopupOpen(false)
        setSelectedSellerForMoreActions(null);
    }

    const getStatusBySeller = (seller: any) => {
        let payload = {
            order_number: selected_order.order_number,
            store_url: selected_order.store_url,
            seller_id: seller.seller_id
        }
        fetchStatusBySeller(payload)
            .then((data: any) => {
                console.log("status response = ", data)
            })
            .catch(err => {
                
            });
            closeMoreActions();
    }

    const getTrackBySeller = (seller: any) => {
        let payload = {
            order_number: selected_order.order_number,
            store_url: selected_order.store_url,
            seller_id: seller.seller_id
        }
        fetchTrackOrderBySeller(payload)
            .then((data: any) => {
                console.log("track response = ", data)
            })
            .catch(err => {
                
            });
            closeMoreActions();
    }

    const getIGMBySeller = (seller: any) => {
        
    }

    const getReconciliationBySeller = (seller: any) => {
        openReconciliationWindow()
    }

    return (
        <>
            {
                !loading && <div className="container-fluid h-auto mt-3 px-4">
                    <div className="row mt-1">
                        <div className="col-12 text-left d-flex">
                            <div>
                                <div className="d-flex">
                                    <div>
                                        <h4><span className='cursor-pointer d-flex'><i
                                            className='fa fa-arrow-circle-left me-2' onClick={navigateToOrderssList}></i>#{selected_order.order_id}</span></h4>
                                    </div>
                                    <div>
                                        <ul className="paid-grey pl-2">
                                            <li className="ms-0 bg-default-grey">{selected_order.order_status}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="paid-grey pl-2">
                                            <li className="ms-0 bg-default-warning">{selected_order.fulfillment_status}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="paid-grey pl-2">
                                            <li className="ms-0 bg-default-grey">{selected_order.payment_status}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-left">
                            <p className="text-default-grey"><span>Transaction Id : </span>{selected_order.transaction_id} <span>|</span> <span>Shopify Order No : {selected_order.order_number}</span> <span>|</span> <span>{selected_order.created_date ? moment(selected_order.created_date).format('MMMM DD, YYYY [at] h:mm a') : ''} from Eazehub</span></p>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 order-summary-container">
                                    <div className="order-details-left-column">
                                        {/* seller cards starts here for loop */}
                                        {
                                            data.sellers.length>0 && <>
                                            {
                                                data.sellers.map((seller: any, index: number) => {
                                                    return <div key={seller.order_seller_seq} className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3">
                                                    <div className="seller-wise-order-info" >
                                                        <ul className="paid-grey d-flex pl-0 mb-0">
                                                            <span className="me-2 mt-1">
                                                                {
                                                                    seller.is_ondc_product ? <i className="fa fa-dot-circle-o"></i> : ''
                                                                }
                                                            </span>
                                                            <h4>#{seller.order_seller_seq}</h4>
                                                            {/* <li className="ms-2 bg-default-warning">$Unfullfilled(1)</li>
                                                            <li className="ms-2 bg-default-grey">$Status</li> */}
                                                        </ul>
                                                        <button type="button" className="btn-custom button-parent" onClick={()=> openMoreActions(seller.order_seller_seq)} >
                                                            More Actions
                                                            {
                                                                isPopupOpen && selectedSellerForMoreActions === seller.order_seller_seq ?
                                                                    <i className="fa fa-caret-up ms-2"></i>
                                                                :
                                                                    <i className="fa fa-caret-down ms-2"></i>
                                                            }
                                                            
                                                            {(isPopupOpen && selectedSellerForMoreActions === seller.order_seller_seq) && (
                                                                <div className="more-actions-popup" >
                                                                    <div className='d-flex flex-column align-items-start'>
                                                                        <div onClick={()=>getStatusBySeller(seller)} className="more-actions-popup-elements px-3 py-2">
                                                                            <i className="fa fa-question-circle me-2"></i>
                                                                            <p className="mb-0">Status</p>
                                                                        </div>
                                                                        <div onClick={()=>getTrackBySeller(seller)} className="more-actions-popup-elements px-3 py-2">
                                                                            <i className="fa fa-truck me-2"></i>
                                                                            <p className="mb-0">Track</p>
                                                                        </div>
                                                                        <div onClick={()=>getIGMBySeller(seller)} className="more-actions-popup-elements px-3 py-2">
                                                                            <i className="fa fa-support me-2"></i>
                                                                            <p className="mb-0">IGM</p>
                                                                        </div>
                                                                        <div onClick={()=>getReconciliationBySeller(seller)} className="more-actions-popup-elements px-3 py-2">
                                                                            <i className="fa fa-barcode me-2"></i>
                                                                            <p className="mb-0">Reconciliation</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </button>

                                                    </div>
                                                    <div className="provider-seller-info-container">
                                                        <div className="provider-container p-2">
                                                            <div>
                                                                <span className="text-grey">Provider Name : </span>
                                                                <span className="text-default">{seller.provider_name}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Phone : </span>
                                                                <span className="text-default">{seller.provider_phone}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Website / Location : </span>
                                                                <span className="text-default">{seller.provider_location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="seller-container p-2">
                                                            <div>
                                                                <span className="text-grey">Seller Name : </span>
                                                                <span className="text-default">{seller.seller_name}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Phone : </span>
                                                                <span className="text-default">{seller.seller_phone}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Location : </span>
                                                                <span className="text-default">{seller.seller_location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-shipping-details-container">
                                                        <div className="shipping-details-container p-2">
                                                            <div>
                                                                <span className="text-grey">Delivery method : </span>
                                                                <span className="text-default">{seller.delivery_method}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Shipping profile : </span>
                                                                <span className="text-default">{seller.shipping_profile}</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-details-container">
                                                            <div className="table-responsive">
                                                                <table id="example" className="table table-hover text-left orders-table-custom" data-paging='false' >
                                                                    <thead className="table-light">
                                                                        <tr>
        
        
                                                                            <th colSpan={3} className="border-bottom-none"></th>
                                                                            <th colSpan={3} className="text-center border-bottom-none">Charges</th>
                                                                            <th colSpan={2} className="border-bottom-none"></th>
        
                                                                        </tr>
        
        
                                                                        <tr>
        
                                                                            <th style={{ width: "85%" }} >Product Details</th>
                                                                            <th className="text-center">Price</th>
                                                                            <th className="text-center">Qty</th>
                                                                            <th className="text-center">Pkg</th>
                                                                            <th className="text-center">Conv</th>
                                                                            <th className="text-center">Delivery</th>
                                                                            <th className="text-center">Tax</th>
                                                                            <th className="text-center">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            seller.items
                                                                            .map((item: any, index: number) => {
                                                                                return <tr key={item.name+index}>
                                                                                <td> <span><b>{item.name}</b><span className="item-status-success ms-2">{item.fulfillment_status}</span><br /></span>
                                                                                    <span className="font-small text-grey">SKU: {item.sku}</span><br />
                                                                                    <span className="font-small text-grey">Alt Id: {item.alt_id}</span> <span className="font-small text-grey"> | </span>
                                                                                    <span className="font-small text-grey">Tracking Id: <span className="anchor-text-orders cursor-pointer">{item.tracking_id}</span></span></td>
                                                                                <td>{item.price}</td>
                                                                                <td className="text-center">{item.qty}</td>
                                                                                <td className="text-center">{item.pkg_charge}</td>
                                                                                <td className="text-center">{item.convenience_fee}</td>
                                                                                <td className="text-center">{item.delivery_charge}</td>
                                                                                <td className="text-center">{item.tax}</td>
                                                                                <td className="text-right">{item.total}</td>
            
                                                                            </tr>
                                                                            })
                                                                        }
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="totals-container">
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Sub Total : </span>
                                                                        <span className="text-default">{seller.subTotal}</span>
                                                                    </div> 
                                                                </div>
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Shipping charges : </span>
                                                                        <span className="text-default">{seller.shipping_charges}</span>
                                                                    </div> 
                                                                </div>
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Total : </span>
                                                                        <span className="text-default">{seller.total}</span>
                                                                    </div> 
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                })
                                            }
                                            </>
                                        }
                                        
                                         {/* seller cards ends here */}
                                        {
                                            data.order_summary && <div className="card-orders order-summary-card-container shadow bg-white mb-3 py-3 px-3">
                                            <div className="seller-wise-order-info">
                                                <h4 className="mb-0">Order summary</h4>
                                            </div>
                                            <div className="product-shipping-details-container">
                                                <div className="product-details-container">
                                                    <div className="totals-container">
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Subtotal </span>
                                                                <span className="text-left description-column">{data.order_summary.itemsCount} items</span>
                                                                <span className="text-default value-column">{data.order_summary.subTotal}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Shipping </span>
                                                                <span className="text-left description-column">Standard Shipping (0.0 kg: Items 0.0 kg, Package 0.0 kg)</span>
                                                                <span className="text-default value-column">{data.order_summary.shipping_charges}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Taxes </span>
                                                                <span className="text-align-left description-column">Tax details</span>
                                                                <span className="text-default value-column">{data.order_summary.taxes}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column"><b>Total</b> </span>
                                                                <span className="text-default value-column"><b>{data.order_summary.total}</b></span>
                                                        </div>
                                                        <div className="order-summary-totals-info p-2">
                                                                <span className="text-grey title-column">Paid </span>
                                                                <span className="text-default value-column"><b>₹0.00</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <div className="order-details-right-column">
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                            <h6><b>Customer</b></h6>

                                            <span className="cust-name">{selected_order.customer_name}</span><br /><br />
                                            <span className="text-default-orders">Contact Information</span><br />
                                            <span className="text-grey">{selected_order.customer_email ? selected_order.customer_email : 'No email provided'}</span><br />
                                            <span className="cust-name">{selected_order.customer_phone ? selected_order.customer_phone : 'No phone provided'}</span><br /><br />
                                            <span className="text-default-orders">Shipping Address</span><br />
                                            <p className="mb-0">{selected_order.shipping_info.name},</p> 
                                            <p className="mb-0">{selected_order.shipping_info.address1},</p>
                                            <p className="mb-0">{selected_order.shipping_info.address2},</p>
                                            <p className="mb-0">{selected_order.shipping_info.city}, {selected_order.shipping_info.province}</p>
                                            <p>{selected_order.shipping_info.country} - {selected_order.shipping_info.zip}</p>
                                            <span className="text-default-orders">Billing Address</span><br />
                                            <p className="mb-0">{selected_order.billing_info.name},</p> 
                                            <p className="mb-0">{selected_order.billing_info.address1},</p>
                                            <p className="mb-0">{selected_order.billing_info.address2},</p>
                                            <p className="mb-0">{selected_order.billing_info.city}, {selected_order.billing_info.province}</p>
                                            <p>{selected_order.billing_info.country} - {selected_order.billing_info.zip}</p>
                                        </div>
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                            <h6><b>Payment Details</b></h6>

                                            <div>
                                                <span className="text-grey">Transaction Id : </span>
                                                <span className="text-default-black">{selected_order.transaction_id}</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Type : </span>
                                                <span className="text-default-black">{selected_order.payment_type}</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Status : </span>
                                                <span className="text-default-black">{selected_order.payment_status}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                
        }
                <ModalWindow show={open} detailsOf={'reconciliation'} modalClosed={closeReconciliationWindow}>
                    <ReconciliationDetails  closeModal={closeReconciliationWindow}/>
                </ModalWindow>

        </>
    ) 

}

export default OrderDetails;