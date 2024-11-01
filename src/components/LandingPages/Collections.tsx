import React, { useState } from 'react';
import SearchableMultiselectList from './SearchableMultiselectList';

const Collections = () => {

    const vendors_list = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'cherry1', label: 'Cherry' },
        { value: 'date1', label: 'Date' },
        { value: 'apple2', label: 'Apple' },
        { value: 'banana2', label: 'Banana' },
      ];

    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([])


        // vendor selection

        const handleVendorSelectionClick = (values: any) => {
            setIsVendorDropdownOpen(!isVendorDropdownOpen)
        }
    
        const clearVendorList = () => {
            setSelectedVendors([])
            setIsVendorDropdownOpen(false)
        }
    
        const updateSelectedVendorList = (list: any) => {
            setSelectedVendors(list)
        }
    
        const clearSelectedVendorList = () => {
            setSelectedVendors([])
        }
    
        const applyFilterOfVendorList  = () => {
            console.log("applied filter for = ", selectedVendors)
        }

    return (
        <>
                    <div className="container-fluid h-auto mt-4 px-5">
                        <div className="row mt-2">
                            <div className="col-12 text-left">
                                <h3>Collections</h3>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-12 ">
                                <div className="card shadow bg-white table-padding mb-3 p-3 d-flex flex-row">
                                    <div>
                                        <div className='checkbox-with-label'>
                                            <input type="checkbox"
                                                checked={true}
                                            />
                                            <p className='mb-0 pl-1'>ONDC Products</p>
                                        </div>
                                        <div className='checkbox-with-label mt-3'>
                                            <input type="checkbox"
                                                checked={true}
                                            />
                                            <p className='mb-0 pl-1'>Shopify Products</p>
                                        </div>
                                    </div>
                                    <div className='collections-vendor-filter-container'>
                                            <div className="collections-search-by-vendor-container mr-2 px-2" >
                                                <p className='mb-0 pl-2 cursor-pointer dynamic-text' onClick={handleVendorSelectionClick}>Product vendor
                                                    {
                                                        selectedVendors.length > 0 ?
                                                            <>
                                                                <span>&nbsp; is </span>
                                                                {

                                                                    selectedVendors
                                                                        .map((vendor: any, index: any) => {
                                                                            return index > 0 ?
                                                                                <span key={vendor.value}>,&nbsp;{vendor.label}
                                                                                </span>
                                                                                :
                                                                                <span key={vendor.value}>&nbsp;{vendor.label}
                                                                                </span>
                                                                        })
                                                                }
                                                                <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearVendorList}></i> </span>

                                                            </>

                                                            :

                                                            !isVendorDropdownOpen && selectedVendors.length == 0 ?
                                                                <span>&nbsp; <i className='fa fa-caret-down pl-2 cursor-pointer ' onClick={handleVendorSelectionClick}></i> </span>

                                                                :

                                                                <></>
                                                    }
                                                </p>

                                            </div>
                                            {
                                                    isVendorDropdownOpen && (
                                                        <div className="collections-search-by-vendor-dropdown">

                                                            <SearchableMultiselectList
                                                                list={vendors_list}
                                                                selectedItems={selectedVendors}
                                                                selectedItemsChanged={updateSelectedVendorList}
                                                                clearSelectedItemsList={clearSelectedVendorList}
                                                                applySelectedList={applyFilterOfVendorList}>

                                                            </SearchableMultiselectList>
                                                        </div>
                                                    )
                                                }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    ) 

}

export default Collections;