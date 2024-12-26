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
    const [data, setData] = useState<any>(null)
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
    const settlement_status_list = refValues.settlement_status.map((status: any) => ({
        value: status.eazehubsettlementstatusref,
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

    const getSettlementStatus = (item: any) => {
        if(item){
            return settlement_status_list.filter((x:any)=>x.value === item)[0].label
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

    const getFormattedAddress = (address: any) => {
        let formattedAddress = '';
        if (address?.street) formattedAddress += address.street + ', ';
        if (address?.locality) formattedAddress += address.locality + ', ';
        if (address?.city) formattedAddress += address.city + ', ';
        if (address?.state) formattedAddress += address.state + ', ';
        if (address?.area_code) formattedAddress += address.area_code;
        return formattedAddress;
    }

    const getProviderInfo = (seller: any) => {
        let obj: any ={}
        if(seller?.bpp_provider_info){
            obj['id'] = seller.bpp_provider_info.id
        }
        if(seller?.bpp_provider_info?.descriptor?.name){
            obj['name'] = seller.bpp_provider_info.descriptor.name
        }
        if(seller?.bpp_provider_info?.locations?.length>0){
            if(seller.bpp_provider_info.locations[0].address){
                obj['address'] = getFormattedAddress(seller.bpp_provider_info.locations[0].address)
            }
        }
        return obj;
    }

    const formatResponse = (data: any) => {

        let sellers: any = [];
        let order_summary_subTotal = 0;
        let order_summary_shipping_charges = 0;
        let taxes = 0;
        let itemsCount = 0;

        if(data?.seller?.length>0){
            data.seller.forEach((element: any, index: any)=> {
                if (element.orderItemDetails.length > 0) {
                    const subTotal = getSubTotalSellerWise(element.orderItemDetails);
                    const shippingCharges = getShippingChargesSellerWise(element.orderItemDetails);
                    const tax = getTaxSellerWise(element.orderItemDetails);
                    const total = getTotalSellerWise(element.orderItemDetails);

                    sellers.push({
                        is_ondc_product: element.is_ondc_product || false,
                        ondc_order_state: element.ondc_order_state || null,
                        fulfillment_status: element.fulfillemnt_status || null,
                        settlement_status: element.settlement_status || null,
                        order_seller_seq: element.order_seller_seq,
                        provider_info: getProviderInfo(element),
                        seller_name: element.bpp_descriptor_info?.name || null,
                        shipping_profile: element.shipping_profile || 'NA',
                        items: getItemsFormatted(element.orderItemDetails),
                        subTotal: formatCurrency(subTotal, 'INR'),
                        shipping_charges: formatCurrency(shippingCharges, 'INR'),
                        taxes: formatCurrency(tax, 'INR'),
                        total: formatCurrency(total, 'INR')
                    });
    
                    itemsCount += element.orderItemDetails.length;
                    order_summary_subTotal += subTotal;
                    order_summary_shipping_charges += shippingCharges;
                    taxes += tax;
                }
            })
        }

        const{ seller, ...filteredValues } = data;

        let res = {
            info: filteredValues,
            sellers: sellers,
            order_summary: {
                subTotal: formatCurrency(order_summary_subTotal, 'INR'),
                itemsCount,
                shipping_charges: formatCurrency(order_summary_shipping_charges, 'INR'),
                taxes: formatCurrency(taxes, 'INR'),
                total: formatCurrency(order_summary_subTotal + order_summary_shipping_charges + taxes, 'INR')
            }
        }
        setData(res);
    };

    const fetchOrderDetails = useCallback(() => {
        setLoading(true);
        const payload = { order_id: selected_order.order_id };
        getOrderDetails(payload)
            .then((data: any) => {
                if (data) formatResponse(data);
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
                                            className='fa fa-arrow-left me-2 fa-left-icon' onClick={navigateToOrderssList}></i>#{selected_order.order_id}</span></h4>
                                    </div>
                                    <div>
                                    <span className="status-label">Order : </span> 
                                    </div>
                                    {
                                        
                                        data.info.order_status && <p
                                        className={
                                            data.info.order_status === "CREATED" || data.info.order_status === "INPROGRESS" || data.info.order_status === "PARTIAL" ? "ml-2 product-draft custom-rounded-border" : 
                                            data.info.order_status === "COMPLETED" ||  data.info.order_status === "ACCEPTED" ? "ml-2 product-active  custom-rounded-border" :
                                            data.info.order_status === "CANCELLED" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                             {getOrderStatus(data.info.order_status)}
                                        </p>
                                    }
                                     <span style={{marginLeft:"10px",marginTop:"5px",color:"grey"}}> | </span>
                                      <div>
                                    <span className="status-label">Fulfillment : </span> 
                                    </div>
                                    {
                                        data.info.fulfillment_status &&  <p
                                        className={
                                            data.info.fulfillment_status === "PENDING" || data.info.fulfillment_status === "PARTIAL" ? "ml-2 product-draft  custom-rounded-border" : 
                                            data.info.fulfillment_status === "DELIVERED" ? "ml-2 product-active  custom-rounded-border" :
                                            data.info.fulfillment_status === "CANCELLED" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                            {getFulfillmentStatus(data.info.fulfillment_status)}
                                        </p>
                                    }
                                    <span style={{marginLeft:"10px",marginTop:"5px",color:"grey"}}> | </span>
                                     <div>
                                    <span className="status-label">Settlement : </span> 
                                  
                                    </div>
                                    {
                                        data.info.settlement_status && <p
                                            className="ml-2 product-active  custom-rounded-border">
                                            {getSettlementStatus(data.info.settlement_status)}
                                        </p>
                                      
                                    }
                                      <span style={{marginLeft:"10px",marginTop:"5px",color:"grey"}}> | </span>
                                     <div>
                                    <span className="status-label">Refund : </span>                                     
                                    </div>
                                    {
                                        data.info.payment_status && <p
                                        className={
                                            data.info.payment_status === "PAID" ? "ml-2 product-active  custom-rounded-border" : 
                                            data.info.payment_status === "NOT_PAID" ? "ml-2 product-danger  custom-rounded-border" : ""
                                        }>
                                            {getPaymentStatus(data.info.payment_status)}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-left order-desc">
                            <p className="text-default-grey"><span>{selected_order.created_date ? moment(selected_order.created_date).format('MMMM DD, YYYY [at] h:mm A') : ''}<span>&nbsp;|</span> <span>Transaction Id: </span>{selected_order.transaction_id}</span> <span>|</span> <span>Shopify Order No: {selected_order.order_number}</span></p>
                            <p className="text-default-grey" style={{marginTop:"-10px"}}><span >Shipped Through :  {data.info.shipping_method}</span></p>

                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 order-summary-container">
                                    <div className="order-details-left-column">
                                        {/* seller cards starts here for loop */}
                                        {
                                            data?.sellers?.length>0 && <>
                                            {
                                                data.sellers.map((seller: any, index: number) => {
                                                    return <div key={seller.order_seller_seq} className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3">
                                                    <div className="seller-wise-order-info" >
                                                        <ul className="paid-grey d-flex pl-0 mb-0">
                                                            <span className="me-2 mt-0">
                                                                {
                                                                    seller.is_ondc_product ? <img src={ondc_product} className="is-ondc-product-image" alt="ondc-product"/> : ''
                                                                }
                                                            </span>
                                                            <h4 className="seller-order-id">#{seller.order_seller_seq}</h4>
                                                            <li className="ms-2 bg-default-warning">{getFulfillmentStatus(seller.fulfillment_status)}</li>
                                                            <li className="ms-2 bg-default-grey">{getOrderStatus(seller.ondc_order_state)}</li>
                                                            <li className="ms-2 bg-default-warning">{getSettlementStatus(seller.settlement_status)}</li>
                                                        </ul>
                                                        {
                                                            seller.is_ondc_product && <button type="button" className="btn-custom button-parent" onClick={()=> openMoreActions(seller.order_seller_seq)} 
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
                                                        }
                                                        

                                                    </div>
                                                    <div className="provider-seller-info-container px-2 py-2">
                                                        <div className="d-flex justify-content-between">
                                                                <span >{seller?.seller_name} </span>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                                <span className=" mb-0">{seller?.provider_info?.name}: <span className="text-grey">{seller?.provider_info?.id}</span></span>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <span>{seller?.provider_info?.address}</span>
                                                        </div>
                                                    </div>
                                                    <div className="product-shipping-details-container">
                                                        <div className="product-details-container">
                                                            <div className="table-responsive">
                                                                <table id="example" className="table table-hover text-left orders-table-custom" data-paging='false' >
                                                                    <thead className="table-light">
                                                                        <tr >
        
        
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
                                                                                    <span className="font-small text-grey">Alt Id: {item.alt_id}</span></td>
                                                                                <td>{item.price}</td>
                                                                                <td className="text-centre">{item.qty}</td>
                                                                                <td  className="text-centre">{item.pkg_charge}</td>
                                                                                <td  className="text-centre">{item.convenience_fee}</td>
                                                                                <td  className="text-centre">{item.delivery_charge}</td>
                                                                                <td  className="text-centre">{item.tax}</td>
                                                                                <td className="text-right">{item.total}</td>
            
                                                                            </tr>
                                                                            })
                                                                        }
                                                                        
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className="seller-wise-totals-container">
                                                                    <div className="totals-labels">
                                                                        <span className="text-grey">Sub Total: </span>
                                                                        <span className="text-grey">Shipping charges: </span>
                                                                        <span className="text-grey">Taxes: </span>
                                                                        <div className="dropdown-divider w-100 my-0"></div>
                                                                        <span className="text-grey">Total: </span>
                                                                    </div>
                                                                    <div className="totals-values">
                                                                        <span className="text-default">{seller.subTotal}</span>
                                                                        <span className="text-default">{seller.shipping_charges}</span>
                                                                        <span className="text-default">{seller.taxes}</span>
                                                                        <div className="dropdown-divider w-100 my-0"></div>
                                                                        <span className="text-default">{seller.total}</span>
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
                                            data?.order_summary && <div className="card-orders order-summary-card-container shadow bg-white mb-3 py-3 px-3">
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
                                    {
                                        data?.info &&  <div className="order-details-right-column">
                                        <div className="card-orders text-left shadow bg-white mb-1 py-3 px-3">
                                            <h6><b>Customer Information</b></h6>

                                            <span className="cust-name">{data.info.customer_info?.first_name} {data.info.customer_info?.last_name}</span><br />
                                            <span className="text-grey"><i className="fa fa-envelope"></i> {data.info.customer_info?.email ? data.info.customer_info?.email : 'No email provided'}</span><br />
                                            <p className="mb-0">{data.info.customer_info?.address1},</p>
                                            <p className="mb-0">{data.info.customer_info?.address2},</p>
                                            <p className="mb-0">{data.info.customer_info?.city}, {data.info.customer_info?.state}</p>
                                            <p>{data.info.customer_info?.areacode}</p>
                                        </div>
                                        <div className="card-orders text-left shadow bg-white mb-1 py-3 px-3">

                                            <h6><b>Shipping Address</b></h6>
                                            <p className="mb-0">{data.info.shipping_info?.name},</p> 
                                            <p className="mb-0">{data.info.shipping_info?.address1},</p>
                                            <p className="mb-0">{data.info.shipping_info?.address2},</p>
                                            <p className="mb-0">{data.info.shipping_info?.city}, {data.info.shipping_info?.province}</p>
                                            <p>{data.info.shipping_info?.country} - {data.info.shipping_info?.zip}</p>
                                        </div>
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                        <h6><b>Payment Details</b></h6>

                                                <div>
                                                    <span className="text-default-black">{data.info.payment_gateway.join(', ')}</span>
                                                </div>

                                                <br/>
                                            <h6><b>Billing Address</b></h6>
                                                <p className="mb-0">{data.info.billing_info?.name},</p> 
                                                <p className="mb-0">{data.info.billing_info?.address1},</p>
                                                <p className="mb-0">{data.info.billing_info?.address2},</p>
                                                <p className="mb-0">{data.info.billing_info?.city}, {data.info.billing_info?.province}</p>
                                                <p>{data.info.billing_info?.country} - {data.info.billing_info?.zip}</p>
                                        </div>
                                    </div>
                                    }

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