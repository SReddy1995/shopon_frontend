import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedOrder } from "../../utils/reduxStore/orderSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchStatusBySeller, fetchTrackOrderBySeller, getOrderDetails } from "../../services/OrdersService";
import moment from 'moment';
import ModalWindow from "./ModalWindow";
import ReconciliationDetails from "./ReconciliationDetails";
import ondc_product from '../../assets/images/is_ondc_product.png';
import { showSuccessMessage } from "../../shared/notificationProvider";
import { RECONCILIATION_INITIATED_SUCCESSFULLY, STATUS_INITIATED_SUCCESSFULLY, TRACK_INITIATED_SUCCESSFULLY } from "../../utils/constants/NotificationConstants";

const OrderDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selected_order = useSelector((store: any) => store.order.selectedOrder);
    const [loading,setLoading] = useState(true)
    const [data, setData] = useState<any>([])
    // const [noData, setNoData] = useState(false)
    const moreActionsPopupRef = useRef<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedSellerForMoreActions, setSelectedSellerForMoreActions] = useState<any>(null);
    const [open, setModalOpen] = useState(false);
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const status_list = refValues.order_staus.map((status: any) => ({
        value: status.eazehuborderstatusref,
        label: status.description
    })) || [];
    const payment_status_list = refValues.payment_status.map((status: any) => ({
        value: status.payment_statusref,
        label: status.description
    })) || [];
    const fullfillment_status_list = refValues.fulfillment_status.map((status: any) => ({
        value: status.eazehubfulfillmentstatusref,
        label: status.description
    })) || [];

    const getOrderStatus = (item: any)=> {
        if(item){
            return status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

    const getFulfillmentStatus = (item: any)=> {
        if(item && fullfillment_status_list.filter((x:any)=>x.value === item).length>0){
            return fullfillment_status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

    const getPaymentStatus = (item: any) => {
        if(item){
            return payment_status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

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
        const { store_item_price, store_item_quantity, packing_charge, convenience_fee, delivery_charge, quote_info } = ele;
        let sum = (store_item_price && store_item_quantity ? Number(store_item_price) * Number(store_item_quantity) : 0) +
                  (packing_charge ? Number(packing_charge) : 0) +
                  (convenience_fee ? Number(convenience_fee) : 0) +
                  (delivery_charge ? Number(delivery_charge) : 0);
        if (quote_info?.breakup?.length) {
            const tax = quote_info.breakup.find((item: any) => item.title === 'Tax');
            if (tax) sum += Number(tax.price.value);
        }
        return sum;
    };

    const getPriceOfItem = (ele: any) => ele.store_item_price && ele.store_item_quantity ? Number(ele.store_item_price) * Number(ele.store_item_quantity) : 0;

    const getShippingOfItem = (ele: any) => {
        const { packing_charge, convenience_fee, delivery_charge } = ele;
        return (packing_charge ? Number(packing_charge) : 0) +
               (convenience_fee ? Number(convenience_fee) : 0) +
               (delivery_charge ? Number(delivery_charge) : 0);
    };

    const getTaxOfItem = (ele: any) => {
        if (ele.quote_info?.breakup?.length) {
            const tax = ele.quote_info.breakup.find((item: any) => item.title === 'Tax');
            return tax ? Number(tax.price.value) : 0;
        }
        return 0;
    };

    const getProviderLocation = (ele: any) => ele.bpp_provider_info?.locations?.[0]?.address?.city || 'NA';

    const formatCurrency = (price: any, curr: any = 'INR') => {
        const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr }).format(price);
        return formattedPrice.includes('.00') ? formattedPrice.split('.')[0] : formattedPrice;
    };

    const getTax = (ele: any) => {
        if (ele.quote_info?.breakup?.length) {
            const tax = ele.quote_info.breakup.find((item: any) => item.title === 'Tax');
            return tax?.price.value || 0;
        }
        return 0;
    };

    const getItemsFormatted = (itemsList: any) => itemsList.map((ele: any) => ({
        name: ele.store_item_title || null,
        fulfillment_status: ele.fulfillment_state || null,
        sku: ele.store_item_sku || 'NA',
        alt_id: ele.alternate_id || 'NA',
        tracking_id: ele.tracking_number || 'NA',
        price: ele.store_item_price ? ele.store_item_price : 0,
        qty: ele.store_item_quantity || 0,
        pkg_charge: ele.packing_charge ? ele.packing_charge : 0,
        convenience_fee: ele.convenience_fee ? ele.convenience_fee : 0,
        delivery_charge: ele.delivery_charge ? ele.delivery_charge : 0,
        tax: getTax(ele),
        total: formatCurrency(getRowTotal(ele), 'INR'),
    }));

    const getSubTotalSellerWise = (itemsList: any) => itemsList.reduce((sum: number, ele: any) => sum + getPriceOfItem(ele), 0);

    const getShippingChargesSellerWise = (itemsList: any) => itemsList.reduce((sum: number, ele: any) => sum + getShippingOfItem(ele), 0);

    const getTotalSellerWise = (itemsList: any) => itemsList.reduce((sum: number, ele: any) => sum + getPriceOfItem(ele) + getShippingOfItem(ele), 0);

    const getTaxSellerWise = (itemsList: any) => itemsList.reduce((sum: number, ele: any) => sum + getTaxOfItem(ele), 0);

    const formatResponse = (data: any) => {
        const groupedData = data.reduce((acc: any, item: any) => {
            const key = item.order_seller_seq;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});

        const sortedGroupedData = Object.keys(groupedData)
            .sort((a, b) => a.localeCompare(b))
            .reduce((acc: any, key: any) => {
            acc[key] = groupedData[key];
            return acc;
            }, {});

        let sellers: any = [];
        let order_summary_subTotal = 0;
        let order_summary_shipping_charges = 0;
        let taxes = 0;
        let itemsCount = 0;

        for (const key in sortedGroupedData) {
            const itemsList = sortedGroupedData[key];
            if (itemsList.length) {
                const subTotal = getSubTotalSellerWise(itemsList);
                const shippingCharges = getShippingChargesSellerWise(itemsList);
                const tax = getTaxSellerWise(itemsList);
                const total = getTotalSellerWise(itemsList);

                sellers.push({
                    is_ondc_product: itemsList[0].is_ondc_product || false,
                    order_seller_seq: key,
                    provider_name: itemsList[0].provider_name || '',
                    provider_phone: itemsList[0].provider_phone || 'NA',
                    provider_location: getProviderLocation(itemsList[0]),
                    seller_id: itemsList[0].seller_id || null,
                    seller_name: itemsList[0].seller_name || '',
                    seller_phone: itemsList[0].seller_phone || 'NA',
                    seller_location: itemsList[0].seller_location || 'NA',
                    delivery_method: itemsList[0].delivery_method || 'NA',
                    shipping_profile: itemsList[0].shipping_profile || 'NA',
                    items: getItemsFormatted(itemsList),
                    subTotal: formatCurrency(subTotal, 'INR'),
                    shipping_charges: formatCurrency(shippingCharges, 'INR'),
                    taxes: formatCurrency(tax, 'INR'),
                    total: formatCurrency(total, 'INR')
                });

                itemsCount += itemsList.length;
                order_summary_subTotal += subTotal;
                order_summary_shipping_charges += shippingCharges;
                taxes += tax;
            }
        }

        setData({
            sellers,
            order_summary: {
                subTotal: formatCurrency(order_summary_subTotal, 'INR'),
                itemsCount,
                shipping_charges: formatCurrency(order_summary_shipping_charges, 'INR'),
                taxes: formatCurrency(taxes, 'INR'),
                total: formatCurrency(order_summary_subTotal + order_summary_shipping_charges + taxes, 'INR')
            }
        });
    };

    const fetchOrderDetails = useCallback(() => {
        setLoading(true);
        const payload = { order_id: selected_order.order_id };
        getOrderDetails(payload)
            .then((data: any) => {
                if (data?.length) formatResponse(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {  
        if(selected_order){
            fetchOrderDetails();
        } 
        else{
            navigate("/landing-page/orders/orders-list")
        }
    },[selected_order, fetchOrderDetails, navigate]);

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
                showSuccessMessage(STATUS_INITIATED_SUCCESSFULLY)
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
                showSuccessMessage(TRACK_INITIATED_SUCCESSFULLY)
            })
            .catch(err => {
                
            });
            closeMoreActions();
    }

    const getIGMBySeller = (seller: any) => {
        
    }

    const getReconciliationBySeller = (seller: any) => {
        openReconciliationWindow()
        showSuccessMessage(RECONCILIATION_INITIATED_SUCCESSFULLY)
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
                                            className='fa fa-arrow-left me-2' onClick={navigateToOrderssList}></i>#{selected_order.order_id}</span></h4>
                                    </div>
                                    {
                                        selected_order.order_status && <p
                                        className={
                                            selected_order.order_status === "CREATED" || selected_order.order_status === "INPROGRESS" || selected_order.order_status === "PARTIAL" ? "ml-2 product-draft custom-rounded-border" : 
                                            selected_order.order_status === "COMPLETED" ||  selected_order.order_status === "ACCEPTED" ? "ml-2 product-active  custom-rounded-border" :
                                            selected_order.order_status === "CANCELLED" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                            {getOrderStatus(selected_order.order_status)}
                                        </p>
                                    }
                                    {
                                        selected_order.fulfillment_status &&  <p
                                        className={
                                            selected_order.fulfillment_status === "PENDING" || selected_order.fulfillment_status === "PARTIAL" ? "ml-2 product-draft  custom-rounded-border" : 
                                            selected_order.fulfillment_status === "DELIVERED" ? "ml-2 product-active  custom-rounded-border" :
                                            selected_order.fulfillment_status === "CANCELLED" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                            {getFulfillmentStatus(selected_order.fulfillment_status)}
                                        </p>
                                    }
                                    {
                                        selected_order.payment_status && <p
                                        className={
                                            selected_order.payment_status === "PAID" ? "ml-2 product-active  custom-rounded-border" : 
                                            selected_order.payment_status === "NOT_PAID" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                            {getPaymentStatus(selected_order.payment_status)}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-left">
                            <p className="text-default-grey"><span>Transaction Id: </span>{selected_order.transaction_id} <span>|</span> <span>Shopify Order No: {selected_order.order_number}</span> <span>|</span> <span>{selected_order.created_date ? moment(selected_order.created_date).format('MMMM DD, YYYY [at] h:mm a') : ''} from Eazehub</span></p>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 order-summary-container">
                                    <div className="order-details-left-column">
                                        {/* seller cards starts here for loop */}
                                        {
                                            data.sellers?.length>0 && <>
                                            {
                                                data.sellers.map((seller: any, index: number) => {
                                                    return <div key={seller.order_seller_seq} className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3">
                                                    <div className="seller-wise-order-info" >
                                                        <ul className="paid-grey d-flex pl-0 mb-0">
                                                            <span className="me-2 mt-1">
                                                                {
                                                                    seller.is_ondc_product ? <img src={ondc_product} className="is-ondc-product-image" alt="ondc-product"/> : ''
                                                                }
                                                            </span>
                                                            <h4>#{seller.order_seller_seq}</h4>
                                                            {/* <li className="ms-2 bg-default-warning">$Unfullfilled(1)</li>
                                                            <li className="ms-2 bg-default-grey">$Status</li> */}
                                                        </ul>
                                                        <button type="button" className="btn-custom button-parent" onClick={()=> openMoreActions(seller.order_seller_seq)} 
                                                            ref={moreActionsPopupRef}>
                                                            More Actions
                                                            {
                                                                isPopupOpen && selectedSellerForMoreActions === seller.order_seller_seq ?
                                                                    <i className="fa fa-caret-up ms-2"></i>
                                                                :
                                                                    <i className="fa fa-caret-down ms-2"></i>
                                                            }
                                                            
                                                            {(isPopupOpen && selectedSellerForMoreActions === seller.order_seller_seq) && (
                                                                <div className="more-actions-popup" ref={moreActionsPopupRef}>
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
                                                            <div className="provider-seller-name-container">
                                                                <span className="text-grey">Provider Name: </span>
                                                                <span className="text-default">{seller.provider_name}</span>
                                                            </div>
        
                                                            <div className="provider-seller-phone-container">
                                                                <span className="text-grey">Phone: </span>
                                                                <span className="text-default">{seller.provider_phone}</span>
                                                            </div>
        
                                                            <div className="provider-seller-location-container">
                                                                <span className="text-grey">Website / Location: </span>
                                                                <span className="text-default">{seller.provider_location}</span>
                                                            </div>
                                                        </div>
                                                        <div className="seller-container p-2">
                                                            <div className="provider-seller-name-container">
                                                                <span className="text-grey">Seller Name: </span>
                                                                <span className="text-default">{seller.seller_name}</span>
                                                            </div>
        
                                                            <div className="provider-seller-phone-container">
                                                                <span className="text-grey">Phone: </span>
                                                                <span className="text-default">{seller.seller_phone}</span>
                                                            </div>
        
                                                            <div className="provider-seller-location-container">
                                                                <span className="text-grey">Location: </span>
                                                                <span className="text-default">{seller.seller_location}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="product-shipping-details-container">
                                                        <div className="shipping-details-container p-2">
                                                            <div>
                                                                <span className="text-grey">Delivery method: </span>
                                                                <span className="text-default">{seller.delivery_method}</span>
                                                            </div>
        
                                                            <div>
                                                                <span className="text-grey">Shipping profile: </span>
                                                                <span className="text-default">{seller.shipping_profile}</span>
                                                            </div>
                                                        </div>
                                                        <div className="product-details-container">
                                                            <div className="table-responsive">
                                                                <table id="example" className="table table-hover text-left orders-table-custom" data-paging='false' >
                                                                    <thead className="table-light">
                                                                        <tr>
        
        
                                                                            <th colSpan={3} className="border-bottom-none"></th>
                                                                            <th colSpan={3} className="text-center border-bottom-none">Charges (in Rs)</th>
                                                                            <th colSpan={2} className="border-bottom-none"></th>
        
                                                                        </tr>
        
        
                                                                        <tr>
        
                                                                            <th style={{ width: "85%" }} >Product Details</th>
                                                                            <th >Price</th>
                                                                            <th >Qty</th>
                                                                            <th >Pkg</th>
                                                                            <th >Conv</th>
                                                                            <th >Delivery</th>
                                                                            <th >Tax</th>
                                                                            <th >Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            seller.items
                                                                            .map((item: any, index: number) => {
                                                                                return <tr key={item.name+index}>
                                                                                <td> <span><b>{item.name}</b>
                                                                                {
                                                                                    item.fulfillment_status && <span className="item-status-success ms-2">{getFulfillmentStatus(item.fulfillment_status)}</span>
                                                                                }
                                                                                <br /></span>
                                                                                    <span className="font-small text-grey">SKU: {item.sku}</span><br />
                                                                                    <span className="font-small text-grey">Alt Id: {item.alt_id}</span> <span className="font-small text-grey"> | </span>
                                                                                    <span className="font-small text-grey">Tracking Id: <span className="anchor-text-orders cursor-pointer">{item.tracking_id}</span></span></td>
                                                                                <td>{item.price}</td>
                                                                                <td >{item.qty}</td>
                                                                                <td >{item.pkg_charge}</td>
                                                                                <td >{item.convenience_fee}</td>
                                                                                <td >{item.delivery_charge}</td>
                                                                                <td >{item.tax}</td>
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
                                                                        <span className="text-grey">Sub Total: </span>
                                                                        <span className="text-default">{seller.subTotal}</span>
                                                                    </div> 
                                                                </div>
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Shipping charges: </span>
                                                                        <span className="text-default">{seller.shipping_charges}</span>
                                                                    </div> 
                                                                </div>
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Taxes: </span>
                                                                        <span className="text-default">{seller.taxes}</span>
                                                                    </div> 
                                                                </div>
                                                                <div className="totals-info p-2">
                                                                    <div>
                                                                        <span className="text-grey">Total: </span>
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
                                        </div>
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                            <h6><b>Payment Details</b></h6>

                                            <div>
                                                <span className="text-grey">Transaction Id: </span>
                                                <span className="text-default-black">{selected_order.transaction_id}</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Type: </span>
                                                <span className="text-default-black">{selected_order.payment_type}</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Status: </span>
                                                <span className="text-default-black">{getPaymentStatus(selected_order.payment_status)}</span>
                                            </div>
                                            <div className="mt-4">
                                                <span className="text-default-orders">Billing Address</span><br />
                                                <p className="mb-0">{selected_order.billing_info.name},</p> 
                                                <p className="mb-0">{selected_order.billing_info.address1},</p>
                                                <p className="mb-0">{selected_order.billing_info.address2},</p>
                                                <p className="mb-0">{selected_order.billing_info.city}, {selected_order.billing_info.province}</p>
                                                <p>{selected_order.billing_info.country} - {selected_order.billing_info.zip}</p>
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