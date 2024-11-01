import React, { useState } from 'react';
import SearchableMultiselectList from './SearchableMultiselectList';
import SimilarProductsImage from "../../assets/images/product-similar-2.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSelectedCategoryForProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';

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

      const speciality_list = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'date', label: 'Date' },
        { value: 'cherry1', label: 'Cherry' },
        { value: 'date1', label: 'Date' },
        { value: 'apple1', label: 'Apple' },
        { value: 'banana1', label: 'Banana' },
        { value: 'cherry11', label: 'Cherry' },
        { value: 'date11', label: 'Date' },
        { value: 'cherry111', label: 'Cherry' },
        { value: 'date111', label: 'Date' },
      ];

    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([])
    const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch();


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

        
    // speciality selection

    const handleSpecialitySelectionClick = (values: any) => {
        setIsSpecialityDropdownOpen(!isSpecialityDropdownOpen)
    }

    const updateSelectedSpecialityList = (list: any) => {
        setSelectedSpecialities(list)
    }

    const clearSpecialityList = () => {
        setSelectedSpecialities([])
        setIsSpecialityDropdownOpen(false)
    }

    const clearSelectedSpecialityList = () => {
        setSelectedSpecialities([])
    }

    const applyFilterOfSpecialityList = () => {
       
    }

    // navigate to productsList

    const loadSimilarProducts = (category: any) => {
        dispatch(updateSelectedCategoryForProductsList(category));
        dispatch(updateSourcePage('collections'));
        navigate('/landing-page/products/products-list')
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
                                <div className="card shadow bg-white table-padding mb-3 p-3 d-flex flex-row align-items-center">
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
                                    <div className='collections-filters'>
                                    <div className='collections-vendor-filter-container'>
                                            <div className="collections-search-by-vendor-container px-2" >
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
                                    <div className='collections-speciality-filter-container'>
                                    <div className='collections-speciality-selection-container px-2'>
                                        <p className='mb-0 pl-2 cursor-pointer' onClick={handleSpecialitySelectionClick}>Speciality
                                            {
                                                selectedSpecialities.length > 0 ?
                                                    <>
                                                        <span>&nbsp; is </span>
                                                        {

                                                            selectedSpecialities
                                                                .map((speciality: any, index: any) => {
                                                                    return index > 0 ?
                                                                        <span key={speciality.value}>,&nbsp;{speciality.label}
                                                                        </span>
                                                                        :
                                                                        <span key={speciality.value}>&nbsp;{speciality.label}
                                                                        </span>
                                                                })
                                                        }
                                                        <span>&nbsp; <i className='fa fa-close pl-2 cursor-pointer' onClick={clearSpecialityList}></i> </span>

                                                    </>

                                                    :

                                                    !isSpecialityDropdownOpen && selectedSpecialities.length == 0 ?
                                                        <span>&nbsp; <i className='fa fa-caret-down pl-2 cursor-pointer' onClick={handleSpecialitySelectionClick}></i> </span>

                                                        :

                                                        <></>
                                            }
                                        </p>
                                        </div>
                                        {
                                            isSpecialityDropdownOpen && (

                                                <div className="collections-speciality-selection-dropdown">
                                                    <SearchableMultiselectList
                                                        list={speciality_list}
                                                        selectedItems={selectedSpecialities}
                                                        selectedItemsChanged={updateSelectedSpecialityList}
                                                        clearSelectedItemsList={clearSelectedSpecialityList}
                                                        applySelectedList={applyFilterOfSpecialityList}>

                                                    </SearchableMultiselectList>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className='collections-search-by-product-container'>
                                    <input className="search_input category-selector-search-input" type="text" name="" placeholder="Search by product" />
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
                            <div className="col-12">
                                <div className="card shadow bg-white table-padding mb-3 pb-3 ">
                                    <div className='table-responsive'>
                                        <table id="example" className="table table-hover  product-table collection-example text-left" data-paging='false' >
                                            <thead className="table-light">
                                                <tr>

                                                    <th></th>
                                                    <th>Product</th>
                                                    <th>Status</th>
                                                    <th>Inventory</th>
                                                    <th>Sales</th>
                                                    <th>Market</th>
                                                    <th>B2B catalogs</th>
                                                    <th>Category</th>
                                                    <th>Type</th>
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                        <td className="product-small-image" ><a className="pop">
                                                        <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854"/>
                                                        </a></td>
                                                        <td style={{paddingLeft: '0px !important',width:'20%'}}> <a data-bs-toggle="modal" data-bs-target="#myModal" id="myBtn2">Fingertips Bluetooth Remote Control Wireless</a></td>
                                                        <td><span className="product-active">Active</span></td>
                                                        <td>150,000 in stock</td>
                                                        <td>56</td>
                                                        <td>3</td>
                                                        <td>7</td>
                                                        <td>Electronics</td>
                                                        <td>Retail</td>
                                                        <td><a><button type="button"
                                                            className="btn-custom-light" ><i className="fa fa-trash text-danger" style={{ fontSize: '14px' }}></i></button></a>
                                                            <a > <button type="button" onClick={()=>loadSimilarProducts("Electronics")}
                                                                className="btn-custom-light" ><img src={SimilarProductsImage} style={{ width: '18px', height: '24px !important', padding: '0px 0px', display: 'inline' }} />
                                                            </button>
                                                            </a>
                                                        </td>
                                                </tr>
                                                <tr>
                                                        <td className="product-small-image" ><a  className="pop">
                                                            <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854"/>
                                                        </a></td>
                                                        <td style={{paddingLeft: '0px !important',width:'20%'}}>Fingertips Fashion</td>
                                                        <td><span className="product-draft">Draft</span></td>
                                                        <td>150,000 in stock</td>
                                                        <td>56</td>
                                                        <td>3</td>
                                                        <td>7</td>
                                                        <td>Fashion</td>
                                                        <td>Retail</td>
                                                        <td><a><button type="button"
                                                            className="btn-custom-light" ><i className="fa fa-trash text-danger" style={{fontSize:'14px'}}></i></button></a>
                                                            <a > <button type="button" onClick={()=>loadSimilarProducts("Fashion")}
                                                                className="btn-custom-light" ><img src={SimilarProductsImage} style={{width: '18px',height: '24px !important',padding: '0px 0px',display: 'inline'}}/></button></a></td>
                                                    </tr>
                                                <tr>

                                                        <td className="product-small-image" ><a className="pop" style={{background: '#dddd !important'}}>
                                                            <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854"/>
                                                        </a></td>
                                                        <td style={{paddingLeft: '0px !important',width: '20%'}}>Max fashion dress set</td>
                                                        <td><span className="product-active">Active</span></td>
                                                        <td>150,000 in stock</td>
                                                        <td>56</td>
                                                        <td>3</td>
                                                        <td>7</td>
                                                        <td>Fashion</td>
                                                        <td>Retail</td>
                                                        <td><a><button type="button"
                                                            className="btn-custom-light" ><i className="fa fa-trash text-danger" style={{fontSize:'14px'}}></i></button></a>
                                                            <a > <button type="button" onClick={()=>loadSimilarProducts("Fashion")}
                                                                className="btn-custom-light" ><img src={SimilarProductsImage} style={{width: '18px',height: '24px !important',padding: '0px 0px',display: 'inline'}}/></button></a></td>
                                                </tr>

                                    </tbody>
                                </table>

                                <div className="pagination float-right" style={{marginRight:'45px',marginBottom:'10px'}}>
                                    <a >&laquo;</a>

                                    <a >&raquo;</a>
                                </div>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    ) 

}

export default Collections;