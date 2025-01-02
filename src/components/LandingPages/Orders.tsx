import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SearchableMultiselectList from './SearchableMultiselectList';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { getOrdersList } from '../../services/OrdersService';
import Tooltip from './Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedOrder } from '../../utils/reduxStore/orderSlice';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const columns_from_api = useMemo(() => [
        {
            coltitle: "Order ID",
            column: "order_id",
            visibilityDisplayName: "Order ID",
            type: "text",
            serialNo: 1,
            isVisible: true,
            minWidth:'80px'
        },
        {
            coltitle: "Shopify ID",
            column: "order_number",
            visibilityDisplayName: "Shopify ID",
            type: "text",
            serialNo: 1,
            isVisible: true,
            minWidth:'80px'
        },
        {
            coltitle: "Confirmation No",
            column: "store_order_confirmation_number",
            visibilityDisplayName: "Confirmation No",
            type: "text",
            serialNo: 1,
            isVisible: true,
            minWidth:'125px'
        },
        {
            coltitle: "Date & Time",
            visibilityDisplayName: "Date & time",
            column: "order_created_date",
            type: "date",
            serialNo: 2,
            isVisible: true,
            minWidth:'145px'
        },
        {
            coltitle: "Customer Name",
            visibilityDisplayName: "Customer name",
            column: "customer_name",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'115px'
        },
        {
            coltitle: "Customer Contact",
            visibilityDisplayName: "Customer contact",
            column: "customer_contact",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'170px'
        },
        {
            coltitle: "Shipped To",
            visibilityDisplayName: "Shipped To",
            column: "shipped_to",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'115px'
        },
        {
            coltitle: "Delivery Location",
            visibilityDisplayName: "Delivery Location",
            column: "shipment_place",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'180px'
        },
        {
            coltitle: "Order Value",
            visibilityDisplayName: "Order Value",
            column: "order_value",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'105px'
        },
        {
            coltitle: "Order Status",
            visibilityDisplayName: "Order Status",
            column: "order_status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
            minWidth:'100px'
        },
        {
            coltitle: "Settle Status",
            visibilityDisplayName: "Settlement status",
            column: "settlement_status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
            minWidth:'100px'
        },
        {
            coltitle: "Fullfill Status",
            visibilityDisplayName: "Fullfillment status",
            column: "fulfillment_status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
            minWidth:'130px'
        },
       
    ], []);
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const [from_date, setFromDate] = useState<any>(null);
    const [to_date, setToDate] = useState<any>(null);
    const [columns, setColumns] = useState<any[]>([])
    const [loading,setLoading] = useState(true)

    // search by
    const categoryPopupRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null)
    const [searchString, setSearchString] = useState('')
    const categories_list = [
        {value: 'order_id', label: 'Order ID'},
        {value: 'order_number', label: 'Shopify ID'},
        {value: 'customer_name', label: 'Customer Name'},
        {value: 'store_order_confirmation_number', label: 'Confirmation #'},
    ]

    const updateSelectedCategory = (cat: any) => {
        setSelectedCategory(cat)
        setSearchString('')
        setIsOpen(false)
    }

    const handleSearchStringChange = (event: any) => {
        setSearchString(event.target.value);
      };

    const handleEnterPressForSearch = (event: any) => {
        if (event.key === 'Enter') {
            setApplyfilter(true)
        }
      };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const clearSearchBySelection = () => {
        setSelectedCategory(null)
        setSearchString('')
        setApplyfilter(true)
        setIsOpen(false)
    }

    const statusPopupRef = useRef<any>(null);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState([])

    const status_list = refValues.order_staus.map((status: any) => ({
        value: status.eazehuborderstatusref,
        label: status.description
    })) || [];

    const clearStatusList = () => {
        setSelectedStatus([])
        setIsStatusDropdownOpen(false)
        setApplyfilter(true)
    }

    const updateSelectedStatusList = (list: any) => {
        setSelectedStatus(list)
    }

    const clearSelectedStatusList = () => {
        setSelectedStatus([])
        setApplyfilter(true)
    }

    const applyFilterOfStatusList  = () => {
        setApplyfilter(true)
        setIsStatusDropdownOpen(false)
    }

        // fullfillment status
        const fullfillmentStatusPopupRef = useRef<any>(null);
        const [isFullfillmentStatusDropdownOpen, setIsFullfillmentStatusDropdownOpen] = useState(false);
        const [selectedFullfillmentStatus, setSelectedFullfillmentStatus] = useState([])
        const limit = 25;
        const [totalPages, setTotalPages] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
        const [totalRecords, setTotalRecords] = useState(0);
        const [applyFilter, setApplyfilter] = useState(false)
        const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
        const [data, setData] = useState<any>([])
        const [nodata, setNoData] = useState(false)
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handlePrevPage = () => {
            if (currentPage > 1) {
              fetchOrders(currentPage - 1);
            }
        };
        
        const handleNextPage = () => {
            if (currentPage < totalPages) {
              fetchOrders(currentPage + 1);
            }
          };
    
        const fullfillment_status_list = [
            
            {
                value: 'PENDING', label: 'Pending'
            },
            {
                value: 'INPROGRESS', label: 'In-Progress'
            },
            {
                value: 'DELIVERED', label: 'Delivered'
            },
            {
                value: 'COMPLETED', label: 'Completed'
            },
            {
                value: 'CANCELLED', label: 'Cancelled'
            }
        ];
    
        const clearFullfillmentStatusList = () => {
            setSelectedFullfillmentStatus([])
            setIsFullfillmentStatusDropdownOpen(false)
            setApplyfilter(true)
        }
    
        const updateSelectedFullfillmentStatusList = (list: any) => {
            setSelectedFullfillmentStatus(list)
        }
    
        const clearSelectedFullfillmentStatusList = () => {
            setSelectedFullfillmentStatus([])
            setApplyfilter(true)
        }
    
        const applyFilterOfFullfillmentStatusList  = () => {
            setApplyfilter(true)
            setIsFullfillmentStatusDropdownOpen(false)
        }

        // settlement status
        const settlementStatusPopupRef = useRef<any>(null);
        const [isSettlementStatusDropdownOpen, setIsSettlementStatusDropdownOpen] = useState(false);
        const [selectedSettlementStatus, setSelectedSettlementStatus] = useState([])
    
        const settlement_status_list = refValues.settlement_status.map((status: any) => ({
            value: status.eazehubsettlementstatusref,
            label: status.description
        })) || [];
    
        const clearSettlementStatusList = () => {
            setSelectedSettlementStatus([])
            setIsSettlementStatusDropdownOpen(false)
            setApplyfilter(true)
        }
    
        const updateSelectedSettlementStatusList = (list: any) => {
            setSelectedSettlementStatus(list)
        }
    
        const clearSelectedSettlementStatusList = () => {
            setSelectedSettlementStatus([])
            setApplyfilter(true)
        }
    
        const applyFilterOfSettlementStatusList  = () => {
            setApplyfilter(true)
            setIsSettlementStatusDropdownOpen(false)
        }

     // Close the popup if clicked outside
     useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (statusPopupRef.current && !statusPopupRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false); // Close the popup if the click is outside
            }
            if (fullfillmentStatusPopupRef.current && !fullfillmentStatusPopupRef.current.contains(event.target)) {
                setIsFullfillmentStatusDropdownOpen(false); // Close the popup if the click is outside
            }
            if (settlementStatusPopupRef.current && !settlementStatusPopupRef.current.contains(event.target)) {
                setIsSettlementStatusDropdownOpen(false); // Close the popup if the click is outside
            }
            if (categoryPopupRef.current && !categoryPopupRef.current.contains(event.target)) {
                setIsOpen(false); // Close the popup if the click is outside
            }
        };
    
        // Attach the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);
    
        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, []);

    const getPayloadFormed = useCallback((page: any) => {
        let payload: any = {};
        payload['buyer_id']= user_details.buyer_id;
        payload['page'] = page;
        payload['limit'] = limit;
        if(selectedCategory && selectedCategory.value === 'order_id'){
            payload['order_id']=searchString
        }
        if(selectedCategory && selectedCategory.value === 'customer_name'){
            payload['customer_name']=searchString
        }
        if(selectedCategory && selectedCategory.value === 'order_number'){
            payload['order_number']=searchString
        }
        if(selectedCategory && selectedCategory.value === 'store_order_confirmation_number'){
            payload['store_order_confirmation_number']=searchString
        }
        if(selectedStatus.length > 0){
            payload['order_status']=selectedStatus.map((status: any) => status.value).join(',')
        }
        if(selectedFullfillmentStatus.length > 0){
            payload['fulfillment_status']=selectedFullfillmentStatus.map((status: any) => status.value).join(',')
        }
        if(selectedSettlementStatus.length > 0){
            payload['settlement_status']=selectedSettlementStatus.map((status: any) => status.value).join(',')
        }
        if(from_date){
            payload['from_date']=formatDate(from_date)
        }
        if(to_date){
            payload['to_date']=formatDate(to_date)
        }

        return payload;
    },[from_date, selectedCategory, selectedFullfillmentStatus, selectedSettlementStatus, selectedStatus, to_date, user_details.buyer_id, searchString])

    const formatDate = (date: any) =>{
        return moment(date).format("DD-MM-YYYY")
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

    const openOrderDetails = (order: any, col: any) => {
        // open order details page
        dispatch(updateSelectedOrder(order));
        navigate("/landing-page/orders/order-details")
    }

    const getCustomerContact = (item: any) => {
        let str = ''
        let contatenator = ''
        if(item.customer_email){
            str = str + contatenator + item.customer_email
            contatenator = ', '
        }
        if(item.customer_phone){
            str = str + contatenator + item.customer_phone
        }

        return str;
    }

    const getShippedTo = (item: any) => {
        let str = ''
        let contatenator = ''
        if(item.shipping_info){
            if(item.shipping_info.name){
                str = str + contatenator + item.shipping_info.name
                contatenator = ', '
            }
            if(item.shipping_info.phone){
                str = str + contatenator + item.shipping_info.phone
            }
        }

        return str;
    }

    const getShipmentPlace = (item: any) => {
        let str = ''
        let contatenator = ''
        if(item.shipping_info){
            if(item.shipping_info.city){
                str = str + contatenator + item.shipping_info.city
                contatenator = ', '
            }
            if(item.shipping_info.province){
                str = str + contatenator + item.shipping_info.province
                contatenator = ', '
            }
            if(item.shipping_info.zip){
                str = str + contatenator + item.shipping_info.zip
            }
        }

        return str;
    }

    const formatResponse = useCallback((data: any) => {
        return data.map((item: any) => {
            return {
                order_id: item.order_id,
                store_order_confirmation_number: item.store_order_confirmation_number? item.store_order_confirmation_number : null,
                order_created_date: moment(item.order_created_date).format("DD/MM/YYYY h:mm A"),
                customer_name: item.customer_name,
                customer_contact: getCustomerContact(item),
                shipped_to: getShippedTo(item),
                shipment_place: getShipmentPlace(item),
                order_value: formatCurrency(item.store_order_price, item.store_currency),
                order_status: item.order_status,
                fulfillment_status: item.fulfillment_status,
                settlement_status: item.settlement_status,
                transaction_id: item.transaction_id,
                order_number: item.order_number,
                created_date: item.order_created_date,
                customer_phone: item.customer_phone,
                customer_email: item.customer_email,
                shipping_info: item.shipping_info,
                billing_info: item.billing_info,
                store_url: item.store_url,
            }
        })
    },[])

    const fetchOrders = useCallback((page: any) => {
        let payload = getPayloadFormed(page)
        // do api call
        // on success set total pages and current page
        setLoading(true)
        getOrdersList(payload)
        .then((data: any) => {
            if(data && data.orders){
                if(data.orders.length > 0){
                    let res = formatResponse(data.orders)
                    setData(res)
                    setNoData(false)
                }
                else{
                    setData(data.orders)
                    setNoData(true)
                }
                if(data.pagination){
                    setTotalPages(data.pagination.totalPages)
                    setCurrentPage(data.pagination.currentPage)
                    setTotalRecords(data.pagination.totalRecords)
                }
            }
            setLoading(false)
        })
        .catch(err => {
            setLoading(false)
        });

    },[getPayloadFormed, formatResponse])

    const handleStatusSelectionClick = (values: any) => {
        if(isStatusDropdownOpen){
            setIsStatusDropdownOpen(false)
        }
        else{
            setIsStatusDropdownOpen(true)
        }
            
    }

    const handleFullfillmentStatusSelectionClick = (values: any) => {
        if(isFullfillmentStatusDropdownOpen){
            setIsFullfillmentStatusDropdownOpen(false)
        }
        else{
            setIsFullfillmentStatusDropdownOpen(true)
        }
            
    }

    const handleSettlementStatusSelectionClick = (values: any) => {
        if(isSettlementStatusDropdownOpen){
            setIsSettlementStatusDropdownOpen(false)
        }
        else{
            setIsSettlementStatusDropdownOpen(true)
        }
            
    }

    const setColumnsData = (data: any) => {
        setColumns(data);
      }

    useEffect(() => {
        if(applyFilter){
            fetchOrders(1)
            setApplyfilter(false)
        }
    },[applyFilter, fetchOrders])


    useEffect(() => {
            setApplyfilter(true)
    },[from_date, to_date])

    const handleClearFilters = () => {
        setSelectedCategory(null)
        setSearchString('')
        setSelectedStatus([])
        setSelectedFullfillmentStatus([])
        setFromDate(null)
        setToDate(null)
        setApplyfilter(true)
    }

    useEffect(() => {
        setColumnsData(JSON.parse(JSON.stringify(columns_from_api)))
        setApplyfilter(true)
        setLoading(true)
    },[columns_from_api])

    const getOrderStatus = (item: any)=> {
        if(item){
            return status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

    const getFulfillmentStatus = (item: any)=> {
        if(item && refValues.fulfillment_status.filter((x:any)=>x.eazehubfulfillmentstatusref === item).length>0){
            return refValues.fulfillment_status.filter((x:any)=>x.eazehubfulfillmentstatusref === item)[0].description
        }
        return ''
    }

    const getSettlementStatus = (item: any) => {
        if(item){
            return settlement_status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

    return (
        <>
            <div className="container-fluid h-auto mt-3 px-3">
                <div className="row mt-1">
                    <div className="col-12 d-flex align-items-center">
                        <h3>Orders</h3>
                        <span><strong>
                        <i className="fa fa-cart-plus"></i>
                        <span className="px-2 total-orders-text">{totalRecords} orders</span></strong></span>
                      
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12 ">
                        <div className="card shadow bg-white table-padding mb-2 px-1 py-1 d-flex flex-row align-items-center">
                            <div className='orders-filters' style={{ width: '100%' }}>
                                <div className="order-search-dates-container">
                                <div className="search-by-container" ref={categoryPopupRef}>
                                        <div className="search-by-dropdown-toggler cursor-pointer" onClick={toggleDropdown} >
                                            <p className="order-text mb-0 ellipsis">
                                            {
                                                    selectedCategory ? selectedCategory.label
    
                                                        :
    
                                                        <>Search by</>
                                                } </p>
                                                {
                                                    isOpen?
                                                    <i className="fa fa-caret-up " ></i>
                                                    :
                                                    <i className="fa fa-caret-down " ></i>
                                                }
                                        </div>

                                        <div className="search d-flex">
                                            <input className="search_input" type="text" name="" value={searchString} placeholder="" 
                                            onChange={handleSearchStringChange} onKeyDown={handleEnterPressForSearch}/>
                                            <span className="search_icon cursor-pointer" onClick={()=>setApplyfilter(true)}><i className="fa fa-search"></i></span>
                                        </div>
                                        {isOpen && (
                                                <div className="search-by-selection-dropdown">
                                                    {
                                                        categories_list
                                                        .map((category: any, index: any) => {
                                                                return <p key={category.label+index} className='cursor-pointer' onClick={()=>updateSelectedCategory(category)}> {category.label}</p>
                                                        })
                                                    }
                                                    <p className='clear-text mb-0 cursor-pointer' onClick={clearSearchBySelection}>
                                                        Clear
                                                    </p>
                                                </div>
                                        )}

                                    </div>
                                <div className='orders-status-filter-container' ref={statusPopupRef}>
                                    <div className="status-selection-container px-2 cursor-pointer" onClick={handleStatusSelectionClick}>
                                        <p className='mb-0 pl-2 cursor-pointer order-text' >Order status
                                            {
                                                selectedStatus.length > 0 &&
                                                <>
                                                    <span>&nbsp; is </span>
                                                    {

                                                        selectedStatus
                                                            .map((status: any, index: any) => {
                                                                return index > 0 ?
                                                                    <span key={status.value}>,&nbsp;{status.label}
                                                                    </span>
                                                                    :
                                                                    <span key={status.value}>&nbsp;{status.label}
                                                                    </span>
                                                            })
                                                    }


                                                </>
                                            }
                                        </p>
                                        {
                                            selectedStatus.length > 0 &&
                                            <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer mb-0 mt-1' onClick={clearStatusList}></i> </p>
                                        }
                                        {
                                            !isStatusDropdownOpen && selectedStatus.length === 0 &&
                                            <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' ></i> </p>
                                        }

                                    </div>
                                    {
                                        isStatusDropdownOpen && (
                                            <div className="status-selection-dropdown">

                                                <SearchableMultiselectList
                                                    list={status_list}
                                                    selectedItems={selectedStatus}
                                                    selectedItemsChanged={updateSelectedStatusList}
                                                    clearSelectedItemsList={clearSelectedStatusList}
                                                    applySelectedList={applyFilterOfStatusList}
                                                    showApply={true}>

                                                </SearchableMultiselectList>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='fullfillment-status-filter-container' ref={fullfillmentStatusPopupRef}>
                                    <div className="fullfillment-status-selection-container px-2 cursor-pointer" onClick={handleFullfillmentStatusSelectionClick}>
                                        <p className='mb-0 pl-2 cursor-pointer order-text' >Fulfillment status
                                            {
                                                selectedFullfillmentStatus.length > 0 &&
                                                <>
                                                    <span>&nbsp; is </span>
                                                    {

                                                        selectedFullfillmentStatus
                                                            .map((status: any, index: any) => {
                                                                return index > 0 ?
                                                                    <span key={status.value}>,&nbsp;{status.label}
                                                                    </span>
                                                                    :
                                                                    <span key={status.value}>&nbsp;{status.label}
                                                                    </span>
                                                            })
                                                    }


                                                </>
                                            }
                                        </p>
                                        {
                                            selectedFullfillmentStatus.length > 0 &&
                                            <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer mb-0 mt-1' onClick={clearFullfillmentStatusList}></i> </p>
                                        }
                                        {
                                            !isFullfillmentStatusDropdownOpen && selectedFullfillmentStatus.length === 0 &&
                                            <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' ></i> </p>
                                        }

                                    </div>
                                    {
                                        isFullfillmentStatusDropdownOpen && (
                                            <div className="fullfillment-status-selection-dropdown">

                                                <SearchableMultiselectList
                                                    list={fullfillment_status_list}
                                                    selectedItems={selectedFullfillmentStatus}
                                                    selectedItemsChanged={updateSelectedFullfillmentStatusList}
                                                    clearSelectedItemsList={clearSelectedFullfillmentStatusList}
                                                    applySelectedList={applyFilterOfFullfillmentStatusList}
                                                    showApply={true}>

                                                </SearchableMultiselectList>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='fullfillment-status-filter-container' ref={settlementStatusPopupRef}>
                                    <div className="fullfillment-status-selection-container px-2 cursor-pointer" onClick={handleSettlementStatusSelectionClick}>
                                        <p className='mb-0 pl-2 cursor-pointer order-text' >Settlement status
                                            {
                                                selectedSettlementStatus.length > 0 &&
                                                <>
                                                    <span>&nbsp; is </span>
                                                    {

                                                        selectedSettlementStatus
                                                            .map((status: any, index: any) => {
                                                                return index > 0 ?
                                                                    <span key={status.value}>,&nbsp;{status.label}
                                                                    </span>
                                                                    :
                                                                    <span key={status.value}>&nbsp;{status.label}
                                                                    </span>
                                                            })
                                                    }


                                                </>
                                            }
                                        </p>
                                        {
                                            selectedSettlementStatus.length > 0 &&
                                            <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer mb-0 mt-1' onClick={clearSettlementStatusList}></i> </p>
                                        }
                                        {
                                            !isSettlementStatusDropdownOpen && selectedSettlementStatus.length === 0 &&
                                            <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' ></i> </p>
                                        }

                                    </div>
                                    {
                                        isSettlementStatusDropdownOpen && (
                                            <div className="fullfillment-status-selection-dropdown">

                                                <SearchableMultiselectList
                                                    list={settlement_status_list}
                                                    selectedItems={selectedSettlementStatus}
                                                    selectedItemsChanged={updateSelectedSettlementStatusList}
                                                    clearSelectedItemsList={clearSelectedSettlementStatusList}
                                                    applySelectedList={applyFilterOfSettlementStatusList}
                                                    showApply={true}>

                                                </SearchableMultiselectList>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='orders-filter-by-date'>
                                    <p className="align-self-center mb-0 text-nowrap">From:</p>
                                      <DatePicker
                                            showIcon
                                            selected={from_date}
                                            onChange={(date) => {
                                                setFromDate(date)
                                            }}
                                            isClearable
                                            placeholderText="Start date"
                                            className="order-date-filter"
                                            dateFormat="dd/MM/yyyy"
                                            />
                                    <p className="align-self-center mb-0 text-nowrap">To:</p>
                                    <DatePicker
                                            showIcon
                                            selected={to_date}
                                            onChange={(date) => {
                                                setToDate(date)
                                            }}
                                            minDate={from_date}
                                            isClearable
                                            placeholderText="End date"
                                            className="order-date-filter"
                                            dateFormat="dd/MM/yyyy"
                                            />
                                </div>
                                <div className="clear-all-filters">
                                <Tooltip content="Clear all filters">
                                    <i
                                        className="fa-solid fa-filter-circle-xmark"
                                        onClick={handleClearFilters}
                                    />
                                </Tooltip>
                                </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    {
                        !loading && data.length>0 && <div className="col-12">
                        <div className="card shadow bg-white table-padding mb-3">
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive" style={{ borderRadius: '0.75rem' }}>
                                        <table id="example" className="table table-hover collection-example text-left order-table" data-paging='false' >
                                            <thead className="table-light">
                                                <tr>
                                                    {
                                                        columns.map((col: any, index: any) => {
                                                            return col.isVisible && <th key={index} className='cursor-pointer'
                                                                style={{ padding: '0.375rem', paddingLeft:'0.575rem !important',minWidth: col.minWidth ? col.minWidth : "auto" }}>{col.coltitle}
                                                            </th>
                                                        })
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
													data
														.map((item: any) => {
															return <tr key={item.order_id}>
																{
																	columns
																		.map((col: any) => {
																			return col.column === "order_id" ?
                                                                                        <td key={col.column} className='order-id-text' onClick={()=>openOrderDetails(item, col)} style={{paddingLeft:'0.575rem !important'}}>#{item[col.column]}</td>
                                                                                        :
                                                                                        col.column === "order_status" ?
                                                                                            (
                                                                                                item[col.column] ? <td className='text-center' key={col.column}>
                                                                                                <span
                                                                                                className={
                                                                                                    item[col.column] === "CREATED" || item[col.column] === "INPROGRESS" || item[col.column] === "PARTIAL" ? "product-draft" : 
                                                                                                    item[col.column] === "COMPLETED" ||  item[col.column] === "ACCEPTED" ? " product-active" :
                                                                                                    item[col.column] === "CANCELLED" ? "product-danger" : ""
                                                                                                }>
                                                                                                    {getOrderStatus(item[col.column])}
                                                                                                </span>
                                                                                                </td>
                                                                                                :
                                                                                                <td key={col.column}></td>
                                                                                            )
                                                                                            :
                                                                                            col.column === "fulfillment_status" ?
                                                                                            (
                                                                                                item[col.column] ? <td className='text-center' key={col.column}>
                                                                                                    <span
                                                                                                className={
                                                                                                    item[col.column] === "PENDING" || item[col.column] === "PARTIAL" ||
                                                                                                    item[col.column] === "AGENT_ASSIGNED" || item[col.column] === "AT_DESTINATION_HUB" ||
                                                                                                    item[col.column] === "IN_TRANSIT" || item[col.column] === "RTO_INITIATED" ? "product-draft" : 
                                                                                                    item[col.column] === "PACKED" || item[col.column] === "OUT_FOR_DELIVERY" ||
                                                                                                    item[col.column] === "ORDER_DELIVERED" || item[col.column] === "ORDER_PICKED_UP" ||
                                                                                                    item[col.column] === "OUT_FOR_PICKUP" || item[col.column] === "RTO_DELIVERED" ? " product-active" :
                                                                                                    item[col.column] === "CANCELLED" || item[col.column] === "DELIVERY_FAILED" ||
                                                                                                    item[col.column] === "PICKUP_FAILED" || item[col.column] === "RTO_DISPOSED" ? "product-danger" : ""
                                                                                                }>
                                                                                                    {getFulfillmentStatus(item[col.column])}
                                                                                                </span>
                                                                                                </td>
                                                                                                :
                                                                                                <td key={col.column}></td>
                                                                                            )
                                                                                            :
                                                                                            col.column === "settlement_status" ?
                                                                                            (
                                                                                                item[col.column] ? <td className='text-center' key={col.column}>
                                                                                                    <span
                                                                                                className={
                                                                                                    item[col.column] === "INITIATED" || item[col.column] === "PARTIAL" || item[col.column] === "PENDING" ? "product-draft" : 
                                                                                                    item[col.column] === "SETTLED" ? "product-active" :
                                                                                                    item[col.column] === "NOT_SETTLED" ? "product-danger" : ""
                                                                                                }>
                                                                                                    {getSettlementStatus(item[col.column])}
                                                                                                </span>
                                                                                                </td>
                                                                                                :
                                                                                                <td key={col.column}></td>
                                                                                            )
                                                                                            :
                                                                                            <td key={col.column}>{item[col.column]}</td>
																					
																		})
																}
															</tr>
														})
												}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className='pagination-container mt-2'>

                                        <nav>
                                            <ul className="pagination">
                                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                                                        &#8249;
                                                    </button>
                                                </li>
                                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                    <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                                        &#8250;
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    }

                    {
                        nodata && <div className="col-12 text-center mt-4">
                            <h6>
                                No Records Available
                            </h6>
                        </div>
                    }


                </div>
            </div>
        </>
    ) 

}

export default Orders;