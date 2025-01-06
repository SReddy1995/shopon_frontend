import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays } from 'date-fns'; // Optionally, for setting a default range

const ExportOrders = (props: any) => {

    // State to store the selected date range
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

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

    }

    return (
        <>
            <div className="container-fluid export-orders-container" >
                <div className="row" >
                    <div className="col-12 d-flex justify-content-between px-0" >
                        <h5>Export Orders</h5>
                        <i className='fa fa-close fa-lg cursor-pointer mt-2' onClick={closeModal}></i>
                    </div>
                    <div className="col-12 px-0">
                        <div className="dropdown-divider"></div>
                    </div>
                    <div className="col-12 px-0 d-flex flex-column">
                        <div className="date-range-selector">
                            <div className="date-picker-container">
                                {/* Start Date Picker */}
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
                                {/* End Date Picker */}
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}  // Make sure the end date is after the start date
                                    placeholderText="Select end date"
                                    dateFormat="MM/dd/yyyy"
                                    isClearable
                                    open={true}
                                />
                            </div>
                        </div>

                        <div className="export-to-csv-button-container">
                            <button type="button"
                                className="btn-custom mr-2"
                                onClick={() => {
                                    exportToCSV();
                                }}>
                                    <i className='fas fa-file-csv mr-2'></i>
                                Export to csv
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    ) 

}

export default ExportOrders;