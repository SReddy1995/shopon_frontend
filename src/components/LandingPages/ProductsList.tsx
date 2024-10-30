import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';

const ProductsList = () => {

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

      const sort_list = [
        { value: 'product_ame', label: 'Product Name'},
        { value: 'seller', label: 'Seller'},
        { value: 'category', label: 'Category'},
      ]

      const speciality_list = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'cherry1', label: 'Cherry' },
        { value: 'date1', label: 'Date' },
        { value: 'apple1', label: 'Apple' },
        { value: 'banana1', label: 'Banana' },
        { value: 'cherry1', label: 'Cherry' },
        { value: 'date1', label: 'Date' },
        { value: 'cherry11', label: 'Cherry' },
        { value: 'date11', label: 'Date' },
      ];

    const [isOpen, setIsOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [selectedVendors, setSlectedVendors] = useState([])
    const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [isSortByOpen, setSortByOpen] = useState(false);
    const [selectedSortBy, setSelectedSortBy] = useState('')

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleVendorSelectionClick = (values: any) => {
        setIsVendorDropdownOpen(!isVendorDropdownOpen)
    }

    const clearVendorList = () => {
        setSlectedVendors([])
        setIsVendorDropdownOpen(false)
    }

    const handleSpecialitySelectionClick = (values: any) => {
        setIsSpecialityDropdownOpen(!isSpecialityDropdownOpen)
    }

    const handleSortByClick = (values: any) => {
        setSortByOpen(!isSortByOpen)
    }

    const clearSpecialityList = () => {
        setSelectedSpecialities([])
        setIsSpecialityDropdownOpen(false)
    }

    const toggleVendorOption = (option: any) => {
        setSlectedVendors((prevSelected: any) => {
          if (prevSelected.some((obj: any) => obj.value === option.value)) {
            return prevSelected.filter((item: any) => item.value !== option.value);
          } else {
            return [...prevSelected, option];
          }
        });
      };

      const toggleSpecialityOption = (option: any) => {
        setSelectedSpecialities((prevSelected: any) => {
          if (prevSelected.some((obj: any) => obj.value === option.value)) {
            return prevSelected.filter((item: any) => item.value !== option.value);
          } else {
            return [...prevSelected, option];
          }
        });
      };

      const toggleSortByOption = (option: any) => {
        setSelectedSortBy(option);
        setSortByOpen(false);
      };

    useEffect(() => {
      },[]);

    return (
        <>
            <div className="container-fluid h-auto mt-4 px-5">
                <div className="row">
                    <div className="col-6 text-left">
                        <h3>Products</h3>
                    </div>
                    <div className="col-6 text-right">
                        <a className="btn-link"><button type="button"
                            className="btn-custom" >Preview Selected</button></a>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 ">
                        <div className="card shadow bg-white table-padding mb-3 p-3">
                            <div className="row">
                                <div className="col-3">
                                        <div className="select-location-container">
                                            <i className="fa fa-map-marker"> </i>
                                            <input className="search_input" type="text" name="" placeholder="Select by location"/>
                                        </div>
                                </div>
                                <div className="col-9">
                                    <div className="category-search-container">
                                        <div className="category-dropdown-toggler" onClick={toggleDropdown} >
                                            <span className="d-block lh-sm fw-semibold ms-fs-14 text-capitalize text-dark">All </span>
                                            <i className="fa fa-caret-down" ></i>
                                        </div>
                                        {isOpen && (
                                            <div className="category-dropdown-menu w-100 p-0 pt-2 fs-6">
                                                <div className="megamenu_search rounded-3 overflow-hidden p-0 ">
                                                    <div className="row g-0 flex-row flex-nowrap h-100">
                                                        <div className="col-12 col-sm-12 d-flex flex-column flex-nowrap">
                                                            <div className="megamenu_search-nav flex-fill overflow-auto p-3 pt-1">
                                                                <ul className="list-unstyled m-0">
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        role="button" title="All">All Categories</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Food &amp; Beverages" role="button">Food &amp; Beverages</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Fashion" role="button">Fashion</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Grocery" role="button">Grocery</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Beauty &amp; Personal Care" role="button">Beauty &amp; Personal Care</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Agriculture" role="button">Agriculture</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Home &amp; Kitchen" role="button">Home &amp; Kitchen</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Electronics" role="button">Electronics</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Automotive" role="button">Automotive</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis"
                                                                        title="Health &amp; Wellness" role="button">Health &amp; Wellness</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                            <input className="search_input category-selector-search-input" type="text" name="" placeholder="Wireless bluetooth" />
                                            <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                    <path fill="#666666"
                                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                                </svg>
                                            </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                    <div className="card shadow bg-white table-padding mb-3 py-3 ">
                            {/* <div className="row">
                                <div className="col"> */}
                                <div className='filter-sort-container pb-2 px-3'>
                                <div className='filters-container'>
                                        <div className="vendor-selection-container mr-2 px-2" >
                                            <p className='mb-0 pl-2 cursor-pointer' onClick={handleVendorSelectionClick}>Product vendor 
                                            {
                                                selectedVendors.length>0 ? 
                                                <>
                                                <span>&nbsp; is </span>
                                                {
                                                    
                                                    selectedVendors
                                                    .map((vendor: any, index: any)=>{
                                                        return index>0 ?
                                                            <span>,&nbsp;{vendor.label}
                                                            </span>
                                                            :
                                                            <span>&nbsp;{vendor.label}
                                                            </span>  
                                                    })
                                                }
                                                <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearVendorList}></i> </span>

                                                </>

                                                :

                                                !isVendorDropdownOpen && selectedVendors.length==0?
                                                <span>&nbsp; <i className='fa fa-caret-down pl-2 cursor-pointer' onClick={handleVendorSelectionClick}></i> </span>

                                                :

                                                <></>
                                            }
                                            </p>
                                            {
                                            isVendorDropdownOpen && ( 
                                            <div className="vendor-selection-dropdown">
                                            <ul className="list-unstyled mt-2">
                                                
                                                {
                                                    vendors_list
                                                        .map((vendor: any,index:any)=> {
                                                            return   <li key={index} className='d-flex flex-row px-2'>
                                                            <input type="checkbox" 
                                                            checked={selectedVendors.some((obj: any) => obj.value === vendor.value)} 
                                                            onChange={() => toggleVendorOption(vendor)}
                                                            />
                                                            <a className="dropdown-item ml-0 pl-2 small fw-semibold oneline_ellipsis"
                                                            role="button" title="All">{vendor.label}</a></li>
                                                        })
                                                }
                                                <li className='d-flex flex-row px-2'>
                                                    <p className='clear-text mb-0 cursor-pointer' onClick={clearVendorList}>
                                                        Clear
                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                            )
                                        }
                                        </div>


                                        <div className='speciality-selection-container px-2'>
                                            <p className='mb-0 pl-2 cursor-pointer' onClick={handleSpecialitySelectionClick}>Speciality
                                            {
                                                selectedSpecialities.length>0 ? 
                                                <>
                                                <span>&nbsp; is </span>
                                                {
                                                    
                                                    selectedSpecialities
                                                    .map((vendor: any, index: any)=>{
                                                        return index>0 ?
                                                            <span>,&nbsp;{vendor.label}
                                                            </span>
                                                            :
                                                            <span>&nbsp;{vendor.label}
                                                            </span>  
                                                    })
                                                }
                                                <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearSpecialityList}></i> </span>

                                                </>

                                                :

                                                !isSpecialityDropdownOpen && selectedSpecialities.length==0?
                                                <span>&nbsp; <i className='fa fa-caret-down pl-2 cursor-pointer' onClick={handleSpecialitySelectionClick}></i> </span>

                                                :

                                                <></>
                                            }
                                            </p>
                                            {
                                            isSpecialityDropdownOpen && ( 
                                            <div className="speciality-selection-dropdown">
                                            <ul className="list-unstyled mt-2">
                                                
                                                {
                                                    speciality_list
                                                        .map((vendor: any,index:any)=> {
                                                            return   <li key={index} className='d-flex flex-row px-2'>
                                                            <input type="checkbox" 
                                                            checked={selectedSpecialities.some((obj: any) => obj.value === vendor.value)} 
                                                            onChange={() => toggleSpecialityOption(vendor)}
                                                            />
                                                            <a className="dropdown-item ml-0 pl-2 small fw-semibold oneline_ellipsis"
                                                            role="button" title="All">{vendor.label}</a></li>
                                                        })
                                                }
                                                <li className='d-flex flex-row px-2'>
                                                    <p className='clear-text mb-0 cursor-pointer' onClick={clearSpecialityList}>
                                                        Clear
                                                    </p>
                                                </li>

                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='sort-container'>
                                <button
                                    className="btn btn-custom-light float-right sortby-selection-container"
                                    type="button"
                                    onClick={handleSortByClick}
                                >
                                    <i className="fa fa-sort" style={{ fontSize: '17px' }}
                                        ></i>

                                </button>
                                {
                                        isSortByOpen && (
                                            <div className="sortby-selection-dropdown">
                                                <ul className="list-unstyled mt-2 ">
                                                <span style={{paddingLeft: '6px'}}>Sort By</span>
                                                    {
                                                        sort_list
                                                            .map((vendor: any, index: any) => {
                                                                return <li key={index}>
                                                                    <a className="dropdown-item d-flex flex-row justify-content-between" onClick={() => toggleSortByOption(vendor.value)}>
                                                                        {vendor.label}
                                                                        {
                                                                            selectedSortBy == vendor.value ?
                                                                                <span className="acc-icons" style={{ color: 'green' }}>
                                                                                    <i className="fa fa-check-circle"></i>
                                                                                </span>

                                                                                :

                                                                                <span className="acc-icons">
                                                                                    <i className="fa fa-circle-thin"></i>
                                                                                </span>
                                                                        }

                                                                    </a>
                                                                </li>
                                                            })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }

                            </div>
                            </div>
                            <div className="mb-2 mt-2 me-2" style={{display: 'flex',justifyContent: 'space-between'}}>
        <div className="px-3" style={{marginTop: 'auto'}}>
              <span><strong><i className="fa fa-minus-square"></i><span className="px-3">2 selected </span></strong></span>
          </div>
          </div>
                            <table className="table table-hover  product-table mt-2 text-left" style={{marginBottom: '0px',cursor: 'pointer'}}>

              <thead  className="table-light">
                  <tr>
                    <th ></th>
                    <th></th>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Inventory</th>
                      <th>Sales</th>
                      <th>Market</th>
                      <th>B2B catalogs</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Vendor</th>

                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td ><input type="checkbox" checked /></td>
                    <td className="product-small-image px-0" style={{paddingLeft: '0px !important'}}><a href="#" className="pop">
                      <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340"/>
                  </a></td>
                      <td style={{paddingLeft: '0px !important',width:'20%'}}>Fingertips Bluetooth Remote Control Wireless</td>
                      <td><span className="product-active">Active</span></td>
                      <td>150,000 in stock</td>
                      <td>56</td>
                      <td>3</td>
                      <td>7</td>
                      <td>Electronics</td>
                      <td>Retail</td>
                      <td>Fingertips</td>
                  </tr> 
                  <tr>
                    <td ><input type="checkbox" checked />
                    </td>
                    <td className="product-small-image px-0" style={{paddingLeft: '0px !important'}}><a href="#" className="pop">
                      <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340"/>
                  </a></td>
                      <td style={{paddingLeft: '0px !important',width:'20%'}}>Fingertips Fashion</td>
                      <td><span className="product-draft">Draft</span></td>
                      <td>150,000 in stock</td>
                      <td>56</td>
                      <td>3</td>
                      <td>7</td>
                      <td>Fashion</td>
                      <td>Retail</td>
                      <td>Fingertips</td>
                  </tr> 
                  <tr>
                    <td ><input type="checkbox" checked /></td>
                    <td className="product-small-image px-0" style={{paddingLeft: '0px !important'}}><a href="#" className="pop">
                      <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340"/>
                  </a></td>
                      <td style={{paddingLeft: '0px !important',width:'20%'}}>Max fashion dress set</td>
                      <td><span className="product-active">Active</span></td>
                      <td>150,000 in stock</td>
                      <td>56</td>
                      <td>3</td>
                      <td>7</td>
                      <td>Fashion</td>
                      <td>Retail</td>
                      <td>Max Fashion</td>
                  </tr> 
                 
                  </tbody>
              </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    ) 

}

export default ProductsList;