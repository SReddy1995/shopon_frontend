import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns'; // Optionally, for setting a default range
import moment from 'moment';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { ORDERS_CSV_DOWNLOADED } from '../../utils/constants/NotificationConstants';
import { getExportedOrdersInCSV } from '../../services/OrdersService';

const ExportOrders = (props: any) => {

    // State to store the selected date range
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;

    // Handle start date change
    const handleStartDateChange = (date: any) => {
        setStartDate(date);
        // Automatically set the end date to at least 1 day after the start date
        if (!endDate || date > endDate) {
            setEndDate(addDays(date, 1));
        }
    };

    // Handle end date change
    const handleEndDateChange = (date: any) => {
        setEndDate(date);
    };

    const closeModal = () => {
        props.closeModal();
    }

    const exportToCSV = () => {
        let payload = {
            buyer_id: user_details.buyer_id,
            start_date: startDate ? formatDate(startDate) : null,
            end_date: endDate ? formatDate(endDate) : null
        }
        getExportedOrdersInCSV(payload)
            .then((res: any) => {
                
                    const url = window.URL.createObjectURL(res); // Create a URL for the Blob
                    const a = document.createElement('a'); // Create an anchor element
                    a.href = url;
                    a.download = 'orders.csv'; // Set the file name for download
                    document.body.appendChild(a);
                    a.click(); // Programmatically click the anchor to trigger the download
                    a.remove(); // Clean up
                    showSuccessMessage(ORDERS_CSV_DOWNLOADED)
            })
            .catch((err: any) => {
                
            });
    }

    const formatDate = (date: any) =>{
        return moment(date).format("DD-MM-YYYY")
    }

    return (
        <>
            <div className="container-fluid export-orders-container">
                <div className="row" >
                    <div className="col-12 d-flex justify-content-between px-0" >
                        <h5>Export Orders By Date</h5>
                        <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
                    </div>
                    <div className="col-12 px-0">
                        <div className="dropdown-divider"></div>
                    </div>
                    </div>

                    <div className='d-flex date-range-selector'>
                    <div className="date-picker-container">
                               
                               <span>Start Date : </span>
                               <DatePicker
                                   selected={startDate}
                                   onChange={handleStartDateChange}
                                   selectsStart
                                   startDate={startDate}
                                   endDate={endDate}
                                   placeholderText="Select start date"
                                   dateFormat="MM/dd/yyyy"
                                   isClearable
                                   open={true}
                               />
                           </div>

                           <div className="date-picker-container">
                           <span>End Date : </span>
                               <DatePicker
                                   selected={endDate}
                                   onChange={handleEndDateChange}
                                   selectsEnd
                                   startDate={startDate}
                                   endDate={endDate}
                                   minDate={startDate}  
                                   placeholderText="Select end date"
                                   dateFormat="MM/dd/yyyy"
                                   isClearable
                                   open={true}
                               />
                           </div>

                    </div>
                    <div className="row" >
                    <div className="col-12 px-0 bottom-divider">
                        <div className="dropdown-divider"></div>
                    </div>
                    </div>
                    <div className="export-to-csv-button-container">
                  
                            <button type="button"
                                className="btn-custom"
                                onClick={() => {
                                    exportToCSV();
                                }}>
                                    <i className='fas fa-file-csv me-1'></i>
                                Export to csv
                            </button>
                        </div>
                   
            </div>
        </>
    ) 

}

export default ExportOrders;