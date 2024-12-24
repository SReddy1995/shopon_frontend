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
            isVisible: true
        },
        {
            coltitle: "Confirmation No",
            column: "store_order_confirmation_num",
            visibilityDisplayName: "Confirmation No",
            type: "text",
            serialNo: 1,
            isVisible: true
        },
        {
            coltitle: "Date & Time",
            visibilityDisplayName: "Date & time",
            column: "order_created_date",
            type: "date",
            serialNo: 2,
            isVisible: true,
        },
        {
            coltitle: "Customer Name",
            visibilityDisplayName: "Customer name",
            column: "customer_name",
            type: "text",
            serialNo: 2,
            isVisible: true,
        },
        {
            coltitle: "Order Value",
            visibilityDisplayName: "Order value",
            column: "order_value",
            type: "text",
            serialNo: 2,
            isVisible: true,
        },
        {
            coltitle: "Order Status",
            visibilityDisplayName: "Order status",
            column: "order_status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
        },
        {
            coltitle: "Payment status",
            visibilityDisplayName: "Payment status",
            column: "payment_status",
            type: "text",
            serialNo: 2,
            isVisible: true,
        },
        {
            coltitle: "Fullfillment Status",
            visibilityDisplayName: "Fullfillment status",
            column: "fulfillment_status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
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
        {value: 'customer_name', label: 'Customer name'},
        {value: 'store_order_confirmation_num', label: 'Confirmation No'},
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

    // payment status
    const paymentStatusPopupRef = useRef<any>(null);
    const [isPaymentStatusDropdownOpen, setIsPaymentStatusDropdownOpen] = useState(false);
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState([])

    const payment_status_list = refValues.payment_status.map((status: any) => ({
        value: status.payment_statusref,
        label: status.description
    })) || [];

    const clearPaymentStatusList = () => {
        setSelectedPaymentStatus([])
        setIsPaymentStatusDropdownOpen(false)
        setApplyfilter(true)
    }

    const updateSelectedPaymentStatusList = (list: any) => {
        setSelectedPaymentStatus(list)
    }

    const clearSelectedPaymentStatusList = () => {
        setSelectedPaymentStatus([])
        setApplyfilter(true)
    }

    const applyFilterOfPaymentStatusList  = () => {
        setApplyfilter(true)
        setIsPaymentStatusDropdownOpen(false)
    }

        // fullfillment status
        const fullfillmentStatusPopupRef = useRef<any>(null);
        const [isFullfillmentStatusDropdownOpen, setIsFullfillmentStatusDropdownOpen] = useState(false);
        const [selectedFullfillmentStatus, setSelectedFullfillmentStatus] = useState([])
        const limit = 20;
        const [totalPages, setTotalPages] = useState(0);
        const [currentPage, setCurrentPage] = useState(0);
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
    
        const fullfillment_status_list = refValues.fulfillment_status.map((status: any) => ({
            value: status.eazehubfulfillmentstatusref,
            label: status.description
        })) || [];
    
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

     // Close the popup if clicked outside
     useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (statusPopupRef.current && !statusPopupRef.current.contains(event.target)) {
                setIsStatusDropdownOpen(false); // Close the popup if the click is outside
            }
            if (paymentStatusPopupRef.current && !paymentStatusPopupRef.current.contains(event.target)) {
                setIsPaymentStatusDropdownOpen(false); // Close the popup if the click is outside
            }
            if (fullfillmentStatusPopupRef.current && !fullfillmentStatusPopupRef.current.contains(event.target)) {
                setIsFullfillmentStatusDropdownOpen(false); // Close the popup if the click is outside
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
        if(selectedCategory && selectedCategory.value === 'store_order_confirmation_num'){
            payload['store_order_confirmation_num']=searchString
        }
        if(selectedStatus.length > 0){
            payload['order_status']=selectedStatus.map((status: any) => status.value).join(',')
        }
        if(selectedPaymentStatus.length > 0){
            payload['payment_status']=selectedPaymentStatus.map((status: any) => status.value).join(',')
        }
        if(selectedFullfillmentStatus.length > 0){
            payload['fulfillment_status']=selectedFullfillmentStatus.map((status: any) => status.value).join(',')
        }
        if(from_date){
            payload['from_date']=formatDate(from_date)
        }
        if(to_date){
            payload['to_date']=formatDate(to_date)
        }

        return payload;
    },[from_date, selectedCategory, selectedFullfillmentStatus, selectedPaymentStatus, selectedStatus, to_date, user_details.buyer_id, searchString])

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

    const formatResponse = useCallback((data: any) => {
        return data.map((item: any) => {
            return {
                order_id: item.order_id,
                store_order_confirmation_num: item.store_order_confirmation_num? item.store_order_confirmation_num : null,
                order_created_date: moment(item.order_created_date).format("DD/MM/YYYY"),
                customer_name: item.customer_name,
                order_value: formatCurrency(item.store_order_price, item.store_currency),
                order_status: item.order_status,
                payment_status: item.payment_status,
                fulfillment_status: item.fulfillment_status,
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

    const handlePaymentStatusSelectionClick = (values: any) => {
        if(isPaymentStatusDropdownOpen){
            setIsPaymentStatusDropdownOpen(false)
        }
        else{
            setIsPaymentStatusDropdownOpen(true)
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
        setSelectedPaymentStatus([])
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
        if(item && fullfillment_status_list.filter((x:any)=>x.value === item).length>0){
            return fullfillment_status_list.filter((x:any)=>x.value === item)[0].label
        }
        return ''
    }

    // const getPaymentStatus = (item: any) => {
    //     if(item){
    //         return payment_status_list.filter((x:any)=>x.value === item)[0].label
    //     }
    //     return ''
    // }

    return (
        <>
            <div className="container-fluid h-auto mt-3 px-4">
                <div className="row mt-1">
                    <div className="col-12 text-left">
                        <h3>Orders</h3>
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
                                            <input className="search_input" type="text" name="" value={searchString} placeholder="search here" 
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
                                    <div className="status-selection-container mr-2 px-2 cursor-pointer" onClick={handleStatusSelectionClick}>
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
                                <div className='payment-status-filter-container' ref={paymentStatusPopupRef}>
                                    <div className="payment-status-selection-container mr-2 px-2 cursor-pointer" onClick={handlePaymentStatusSelectionClick}>
                                        <p className='mb-0 pl-2 cursor-pointer order-text' >Payment status
                                            {
                                                selectedPaymentStatus.length > 0 &&
                                                <>
                                                    <span>&nbsp; is </span>
                                                    {

                                                        selectedPaymentStatus
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
                                            selectedPaymentStatus.length > 0 &&
                                            <p className='mb-0'>&nbsp; <i className='fa fa-close cursor-pointer mb-0 mt-1' onClick={clearPaymentStatusList}></i> </p>
                                        }
                                        {
                                            !isPaymentStatusDropdownOpen && selectedPaymentStatus.length === 0 &&
                                            <p className='mb-0 d-flex'>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center' ></i> </p>
                                        }

                                    </div>
                                    {
                                        isPaymentStatusDropdownOpen && (
                                            <div className="payment-status-selection-dropdown">

                                                <SearchableMultiselectList
                                                    list={payment_status_list}
                                                    selectedItems={selectedPaymentStatus}
                                                    selectedItemsChanged={updateSelectedPaymentStatusList}
                                                    clearSelectedItemsList={clearSelectedPaymentStatusList}
                                                    applySelectedList={applyFilterOfPaymentStatusList}
                                                    showApply={true}>

                                                </SearchableMultiselectList>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='fullfillment-status-filter-container' ref={fullfillmentStatusPopupRef}>
                                    <div className="fullfillment-status-selection-container mr-2 px-2 cursor-pointer" onClick={handleFullfillmentStatusSelectionClick}>
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
                                        <table id="example" className="table table-hover collection-example text-left" data-paging='false' >
                                            <thead className="table-light">
                                                <tr>
                                                    {
                                                        columns.map((col: any, index: any) => {
                                                            return col.isVisible && <th key={index} className='cursor-pointer'
                                                                style={{ padding: '0.375rem', minWidth: col.minWidth ? col.minWidth : "auto" }}>{col.coltitle}
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
                                                                                        <td key={col.column} className='order-id-text' onClick={()=>openOrderDetails(item, col)}>#{item[col.column]}</td>
                                                                                        :
                                                                                        col.column === "order_status" ?
                                                                                            (
                                                                                                item[col.column] ? <td key={col.column}>
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
                                                                                            col.column === "fulfillment_statusr" ?
                                                                                            (
                                                                                                item[col.column] ? <td key={col.column}>
                                                                                                    <span
                                                                                                className={
                                                                                                    item[col.column] === "PENDING" || item[col.column] === "PARTIAL" ? "product-draft" : 
                                                                                                    item[col.column] === "DELIVERED" ? " product-active" :
                                                                                                    item[col.column] === "CANCELLED" ? "product-danger" : ""
                                                                                                }>
                                                                                                    {getFulfillmentStatus(item[col.column])}
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