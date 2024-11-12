import React, { useEffect, useState } from 'react';
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

    const [columns_from_api, setColumnsFromApi] = useState<any[]>([
        {
            coltitle: "",
            column: "thumbnail",
            visibilityDisplayName: "Image",
            type: "image",
            serialNo: 1,
            isVisible: true
        },
        {
            coltitle: "Product",
            visibilityDisplayName: "Product",
            column: "product",
            type: "text",
            serialNo: 2,
            isVisible: true
        },
        {
            coltitle: "Status",
            visibilityDisplayName: "Status",
            column: "status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true
        },
        {
            coltitle: "Inventory",
            visibilityDisplayName: "Inventory",
            column: "inventory",
            type: "text",
            serialNo: 4,
            isVisible: true
        },
        {
            coltitle: "Sales",
            visibilityDisplayName: "Sales",
            column: "sales",
            type: "text",
            serialNo: 5,
            isVisible: true
        },
        {
            coltitle: "Market",
            visibilityDisplayName: "Market",
            column: "market",
            type: "text",
            serialNo: 6,
            isVisible: true
        },
        {
            coltitle: "B2B catalogs",
            visibilityDisplayName: "B2B catalogs",
            column: "b2b_catalogs",
            type: "text",
            serialNo: 7,
            isVisible: true
        },
        {
            coltitle: "Category",
            visibilityDisplayName: "Category",
            column: "category",
            type: "text",
            serialNo: 8,
            isVisible: true
        },
        {
            coltitle: "Type",
            visibilityDisplayName: "Type",
            column: "type",
            type: "text",
            serialNo: 9,
            isVisible: true
        },
        
    ])

    const [data, setData] = useState([
        {
            id:1,
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
            product: "Fingertips Bluetooth Remote Control Wireless",
            status: "Active",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Electronics",
            type: "Retail"
        },
        {
            id:2,
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
            product: "Fingertips Fashion",
            status: "Draft",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Fashion",
            type: "Retail"
        },
        {
            id:3,
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
            product: "Max fashion dress set",
            status: "Active",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Fashion",
            type: "Retail"
        },
      ]);
      const [sortConfig, setSortConfig] = useState({key: '', direction: ''});
      const [columns, setColumns] = useState<any[]>([])

      const sortedData = React.useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
          sortableItems.sort((a: any, b: any) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      }, [data, sortConfig]);

      const requestSort = (key: any) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      useEffect(() => {
        setColumnsData(JSON.parse(JSON.stringify(columns_from_api)))
      },[]);

      const setColumnsData = (data: any) => {
        setColumns(data);
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

                                                    !isVendorDropdownOpen && selectedVendors.length === 0 ?
                                                        <span>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right' onClick={handleVendorSelectionClick}></i> </span>

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

                                                    !isSpecialityDropdownOpen && selectedSpecialities.length === 0 ?
                                                        <span>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right' onClick={handleSpecialitySelectionClick}></i> </span>

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
                            <div className="row">
                                <div className="col-12">
                                    <div className='table-responsive'>
                                        <table id="example" className="table table-hover  product-table collection-example text-left" data-paging='false' >
                                            <thead className="table-light">
                                                <tr>
                                                    {
                                                        columns.map((col: any, index: any) => {
                                                            return col.isVisible && <th key={index} className='cursor-pointer' onClick={() => requestSort(col.column)}>{col.coltitle}
                                                            {
                                                                col.column !== "thumbnail" && 
                                                                    <i className={`float-right mt-1 fa ${sortConfig?.key === col.column ? (sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'}`}></i>
                                                            }
                                                                
                                                            </th>
                                                        })
                                                    }
                                                    <th>Actions</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                            {sortedData.map((item: any) => (

                                                    <tr key={item.id}>
                                                    {
                                                        columns
                                                            .map((col: any, i: any) => {
                                                                return col.isVisible &&
                                                                    (
                                                                        col.type === "image" ?
                                                                            <td key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a href="#" className="pop">
                                                                                <img src={item[col.column]} alt="" />
                                                                            </a></td>
                                                                            :

                                                                            (
                                                                                col.type === "active-draft-button" ?
                                                                                    <td  key={i}><span className={item[col.column] === 'Active' ? "product-active" : "product-draft"}>{item[col.column]}</span></td>
                                                                                    :
                                                                                    <td  key={i}>{item[col.column]}</td>
                                                                            )

                                                                    )

                                                            })
                                                    }
                                                     <td><a><button type="button"
                                                        className="btn-custom-light" ><i className="fa fa-trash text-danger" style={{ fontSize: '14px' }}></i></button></a>
                                                        <a > <button type="button" onClick={() => loadSimilarProducts(item.category)}
                                                            className="btn-custom-light" ><img src={SimilarProductsImage} style={{ width: '18px', height: '24px !important', padding: '0px 0px', display: 'inline' }} />
                                                        </button>
                                                        </a>
                                                    </td>
                                                   
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>


                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="pagination float-right mr-2 mb-3">
                                        <a >&laquo; Prev</a>

                                        <a >Next &raquo;</a>
                                    </div>
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