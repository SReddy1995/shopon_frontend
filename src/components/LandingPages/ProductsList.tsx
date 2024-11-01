import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/splide/dist/css/splide.min.css';
import { v4 as uuidv4 } from 'uuid';

import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductsColumnsList, updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import { showWarningMessage } from '../../shared/notificationProvider';
import { NO_PRODUCTS_SELECTED } from '../../utils/constants/NotificationConstants';
import { useNavigate } from 'react-router-dom';
import SearchableMultiselectList from './SearchableMultiselectList';

const ProductsList = () => {


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
        {
            coltitle: "Vendor",
            visibilityDisplayName: "Vendor",
            column: "vendor",
            type: "text",
            serialNo: 10,
            isVisible: true
        }
        
    ])

    const productsList = [
        {
            product_id: 1,
            thumbnail: "https://images.pexels.com/photos/4275890/pexels-photo-4275890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260",
            product: "Fingertips Bluetooth Remote Control Wireless",
            status: "Active",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Electronics",
            type: "retail",
            vendor: "Fingertips"
        },
        {
            product_id: 2,
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340",
            product: "Fingertips Fashion",
            status: "Draft",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Fashion",
            type: "retail",
            vendor: "Fingertips"
        },
        {
            product_id: 3,
            thumbnail: "https://images.pexels.com/photos/276484/pexels-photo-276484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260",
            product: "Max fashion dress set",
            status: "Active",
            inventory: "150,000 in stock",
            sales: "56",
            market: "3",
            b2b_catalogs: "7",
            category: "Fashion",
            type: "retail",
            vendor: "Max Fashion"
        }
    ]

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
        { value: 'cherry11', label: 'Cherry' },
        { value: 'date11', label: 'Date' },
        { value: 'cherry111', label: 'Cherry' },
        { value: 'date111', label: 'Date' },
      ];

      const categories = [
        {id: "All", name: "ALL"},
        {id: "Food and beverages", name: "Food and beverages"},
        {id: "Fashion", name: "Fashion"},
        {id: "Grocery", name: "Grocery"},
        {id: "Agriculture", name: "Agriculture"},
        {id: "Electronics", name: "Electronics"},

    ]

    const mainOptions: Options = {
        type: 'fade',
        height: '300px',
        pagination: false,
        arrows: false,
        cover: true,
        };
  
      const thumbsOptions: Options = {
        fixedWidth: 100,
        fixedHeight: 64,
        isNavigation: true,
        gap: 15,
        focus: 'center',
        pagination: false,
        cover: true,
        breakpoints: {
            600: {
                fixedWidth: 66,
                fixedHeight: 40,
            },
        },
    };

      const slides = [
        { src: 'https://images.pexels.com/photos/4275890/pexels-photo-4275890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260', alt: 'Image 1' },
        { src: 'https://images.pexels.com/photos/3511104/pexels-photo-3511104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260', alt: 'Image 2' },
        { src: 'https://images.pexels.com/photos/276484/pexels-photo-276484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260', alt: 'Image 3' },
        { src: "https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260", alt: "Image4"},
        { src: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=1260", alt: "Image4"},
        // Add more images as needed
      ];

    const [showBackButton,setShowBackButton] = useState('hide')
    const [selectedProducts, setSelectedProducts] = useState([])
    const [columns, setColumns] = useState<any[]>([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productsFromStore = useSelector((store: any) => store.products.selectedProductsList);
    const [isOpen, setIsOpen] = useState(false);
    const [isVendorDropdownOpen, setIsVendorDropdownOpen] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([])
    const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);
    const [selectedSpecialities, setSelectedSpecialities] = useState([])
    const [isSortByOpen, setSortByOpen] = useState(false);
    const [selectedSortBy, setSelectedSortBy] = useState('')
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);
    const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({id:'All', name: "All"});
    const [selectedLocation, setSelectedLocation] = useState('')

    const mainRef = useRef<Splide | null>(null);

    const thumbsRef = useRef<Splide | null>(null);

    const MessageID = "MSG"+uuidv4();
    

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

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

    // sort by

    const handleSortByClick = (values: any) => {
        setSortByOpen(!isSortByOpen)
    }

    const toggleSortByOption = (option: any) => {
        setSelectedSortBy(option);
        setSortByOpen(false);
      };

    // products

    const openProductDetails = () => {
        if(!isProductDetailsOpen){
            setIsProductDetailsOpen(true)
        }
        
    }

    const closeProductDetails = () => {
        setIsProductDetailsOpen(false)
    }

    // column visibility
    const handleColumnVisiblityClick = (values: any) => {
        setIsColumnVisibilityOpen(!isColumnVisibilityOpen)
    }

    const toggleColumnVisibility = (col: any) => {
        setColumns((prevSelected: any) => {
            prevSelected.filter((x: any)=>x.column === col.column)[0].isVisible = !col.isVisible
              return [...prevSelected];
            }
          );
      }

      const resetColumnVisibility = () => {
        let data = JSON.parse(JSON.stringify(columns_from_api));
        setColumns(data)
      }

      const toggleProductSelection = (product: any) => {
        if(!isProductDetailsOpen){
            setSelectedProducts((prevSelected: any) => {
                if (prevSelected.some((obj: any) => obj.product_id === product.product_id)) {
                  return prevSelected.filter((item: any) => item.product_id !== product.product_id);
                } else {
                  return [...prevSelected, product];
                }
              });
        }
      }

      const setSelectedCategoryValue = (cat : any) => {
        setSelectedCategory(cat)
        setIsOpen(false)
      }


      const previewSelected = () => {
        if(selectedProducts.length>0){
            dispatch(updateSelectedProductsList(selectedProducts));
            dispatch(updateProductsColumnsList(columns));
            navigate("/landing-page/products/products-preview")

        }
        else{
            showWarningMessage(NO_PRODUCTS_SELECTED)
        }

      }

    const sourcePage = useSelector((store: any) => store.products.sourcePage);

    const loadSimilarProductsOfACategory = () => {

    }

    const navigateToCollectionsList = () => {
        navigate('landing-page/products/collections')
    }
 
    useEffect(() => {
        console.log("Message ID = ", MessageID)
        if(sourcePage && sourcePage === 'preview'){
            dispatch(updateSourcePage(''));
            setSelectedProducts(productsFromStore)
        }
        else if(sourcePage && sourcePage === 'collections'){
            dispatch(updateSourcePage(''));
            setShowBackButton('show')
            loadSimilarProductsOfACategory()
        }
        setData(JSON.parse(JSON.stringify(columns_from_api)))
      },[]);

      useEffect(() => {
        if (mainRef.current && thumbsRef.current) {
            mainRef.current.sync(thumbsRef.current.splide as any);
          }
      },[isProductDetailsOpen]);

      const setData = (data: any) => {
        setColumns(data);
      }

    return (
        <>
            <div className="container-fluid h-auto mt-4 px-5">
                {
                    showBackButton ==='show' && (
                        <div className="row d-flex">
                        <div className="col text-left">
                            <div onClick={navigateToCollectionsList} className='back-button-container cursor-pointer'>
                                <i className='fa fa-arrow-left'></i>
                                <h6 className='pl-2 mb-0'>Back</h6>
                            </div>
    
                        </div>
    
                    </div>
                    )
                }

                <div className="row mt-2">
                    <div className="col-6 text-left">
                        <h3>Products</h3>
                    </div>
                    {
                        selectedProducts.length>0 && (
                            <div className="col-6 text-right">
                                <a className="btn-link"><button type="button"
                                    className="btn-custom" onClick={previewSelected}>Preview Selected</button></a>
                            </div>
                        )
                    }

                </div>
                <div className="row mt-4">
                    <div className="col-12 ">
                        <div className="card shadow bg-white table-padding mb-3 p-3">
                            <div className="row">
                                <div className="col-3">
                                    <div className="select-location-container text-left">
                                        <div className='d-flex'>
                                        <i className="fa fa-map-marker"> </i>
                                        <p className='mb-0 pl-3'>{selectedLocation !== '' ? selectedLocation : ('Select location')}</p>
                                        </div>

                                        <i className="fa fa-close fa-sm pr-3 cursor-pointer"> </i>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="category-search-container">
                                        <div className="category-dropdown-toggler w-auto" onClick={toggleDropdown} >
                                            <p className="category-text w-auto mb-0">{selectedCategory.name} </p>
                                            <i className="fa fa-caret-down cursor-pointer" ></i>
                                        </div>
                                        {isOpen && (
                                            <div className="category-dropdown-menu w-100 p-0 pt-0 fs-6">
                                                <div className="megamenu_search rounded-3 overflow-hidden p-0 ">
                                                    <div className="row g-0 flex-row h-100">
                                                        <div className="col-12 col-sm-12 d-flex flex-column flex-nowrap">
                                                            <div className="megamenu_search-nav flex-fill overflow-auto px-3 pt-1 pb-3">
                                                                <ul className="list-unstyled m-0">
                                                                    {
                                                                        categories
                                                                        .map((cat: any,index:any)=>{
                                                                            return  <li key={index}><a className="dropdown-item small fw-semibold oneline_ellipsis pl-1"
                                                                            role="button" title="All" onClick={()=>setSelectedCategoryValue(cat)}>{cat.name} </a></li>
                                                                        })
                                                                    }
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
                                                        <span>&nbsp; <i className='fa fa-caret-down pl-2 cursor-pointer' onClick={handleVendorSelectionClick}></i> </span>

                                                        :

                                                        <></>
                                            }
                                        </p>
                                        {
                                            isVendorDropdownOpen && (
                                                <div className="vendor-selection-dropdown">

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


                                    <div className='speciality-selection-container px-2'>
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
                                        {
                                            isSpecialityDropdownOpen && (

                                                <div className="speciality-selection-dropdown">
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
                                </div>
                                <div className="column-visibility-sortby-container">
                                <div className='column-visibility-container mr-2'>
                                    <button
                                        className="btn btn-custom-light float-right column-visibility-selection-container"
                                        type="button"
                                        onClick={handleColumnVisiblityClick}
                                    >
                                        <i className="fa fa-bars" style={{ fontSize: '17px' }}
                                        ></i>

                                    </button>
                                    {
                                        isColumnVisibilityOpen && (
                                            <div className="column-visibility-selection-dropdown">
                                                <ul className="list-unstyled mt-2 ">
                                                    <p className='pl-2 mb-2'>Show/Hide Columns</p>
                                                    {
                                                            columns
                                                                .map((col: any, index: any) => {
                                                                    return <li key={index} className='d-flex flex-row px-2'>
                                                                        <input type="checkbox"
                                                                            checked={col.isVisible}
                                                                            onChange={() => toggleColumnVisibility(col)}
                                                                        />
                                                                        <a className="dropdown-item ml-0 pl-2 small fw-semibold oneline_ellipsis"
                                                                            role="button" title="All">{col.visibilityDisplayName}</a></li>
                                                                })
                                                        }
                                                        <li className='d-flex flex-row px-2'>
                                                            <p className='clear-text mb-0 cursor-pointer' onClick={resetColumnVisibility}>
                                                                reset
                                                            </p>
                                                        </li>
                                                </ul>
                                            </div>
                                        )
                                    }

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
                                                    <span style={{ paddingLeft: '6px' }}>Sort By</span>
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

                            </div>

                                {
                                    selectedProducts.length>0 && (
                                    <div className="mb-2 mt-2 me-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="px-3" style={{ marginTop: 'auto' }}>
                                            <span><strong><i className="fa fa-minus-square"></i><span className="px-3">{selectedProducts.length} products selected </span></strong></span>
                                        </div>
                                    </div>  
                                    )
                                }

                            <div className='table-responsive'>
                            <table className="table table-hover  product-table text-left" style={{ marginBottom: '0px', cursor: 'pointer' }}>

                                <thead className="table-light">
                                    <tr>
                                        <th ></th>
                                        {
                                            columns.map((col: any, index: any) => {
                                                return col.isVisible && <th key={index}>{col.coltitle}</th>
                                            })
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productsList
                                            .map((product: any, index: any) => {
                                                return <tr key={index}>
                                                    <td className='products-list'><input type="checkbox" 
                                                    checked={selectedProducts.some((obj: any) => obj.product_id === product.product_id)}
                                                    onChange={() => toggleProductSelection(product)} /></td>
                                                    {
                                                        columns
                                                            .map((col: any, i: any) => {
                                                                return col.isVisible &&
                                                                    (
                                                                        col.type == "image" ?
                                                                            <td onClick={openProductDetails} key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a href="#" className="pop">
                                                                                <img src={product[col.column]} alt="" />
                                                                            </a></td>
                                                                            :

                                                                            (
                                                                                col.type == "active-draft-button" ?
                                                                                    <td onClick={openProductDetails} key={i}><span className={product[col.column] == 'Active' ? "product-active" : "product-draft"}>{product[col.column]}</span></td>
                                                                                    :
                                                                                    <td onClick={openProductDetails} key={i}>{product[col.column]}</td>
                                                                            )

                                                                    )

                                                            })
                                                    }
                                                </tr>
                                            })
                                    }

                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>

                </div>
                {
                    isProductDetailsOpen && (
                        <div className='card product-details-window'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-between mt-2">
                                        <h4>Wireless bluetooth Airpods</h4>
                                        <i className='fa fa-close fa-lg cursor-pointer mt-1' onClick={closeProductDetails}></i>
                                    </div>

                                    <div className="col-12 product-details-listing">
                                        <div className="row">
                                            <div className="col-12 mt-2">
                                                <Splide
                                                    key="main"
                                                    ref={mainRef}
                                                    options={mainOptions}

                                                >
                                                    {slides.map((slide, index) => (
                                                        <SplideSlide key={index}>
                                                            <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto' }} />
                                                        </SplideSlide>
                                                    ))}
                                                </Splide>
                                            </div>
                                            <div className="col-12 mt-2">
                                                <Splide
                                                    key="thumbs"
                                                    ref={thumbsRef}
                                                    options={thumbsOptions}

                                                >
                                                    {slides.map((slide, index) => (
                                                        <SplideSlide key={index}>
                                                            <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: 'auto' }} />
                                                        </SplideSlide>
                                                    ))}
                                                </Splide>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <hr className="mt-2"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-12 d-flex flex-column">
                                                <div className='price-container'>
                                                    <span className="price-red">
                                                        -33%

                                                    </span>
                                                    <span className="price-black ms-2">
                                                        ₹201
                                                    </span>
                                                </div>
                                                <div className='price-container'>
                                                    <p className="price-tag">M.R.P : <del>₹299</del></p>
                                                </div>
                                                <div className='price-container'>
                                                    <p><span className="price-tag">Category : </span><span>Retail</span></p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12 seller-info-accessibility-container text-right">
                                                <span className="vendor-name"><span className="price-tag">Seller : </span>Opteamix</span>
                                                <div className="product-accessibility-container mt-1">
                                                        <div className="border-0 rounded-0 shadow-none text-center mb-0" style={{maxWidth: '160px',cursor: 'pointer'}}>
                                                         
                                                                <div className="bg-light d-flex align-items-center justify-content-center rounded-circle mx-auto mb-2"
                                                                    style={{height: '35px', width: '35px'}}><i className="fa fa-ban" style={{paddingLeft: '10px'}}></i></div>
                                                                <div className="product-info-box text-muted "><span>Cancellable</span></div>
                                                              
                                                        </div>
                                                        <div className="border-0 rounded-0 shadow-none text-center mb-0" style={{maxWidth: '160px',cursor: 'pointer'}}>
                                                          
                                                                <div className="bg-light d-flex align-items-center justify-content-center rounded-circle mx-auto mb-2"
                                                                    style={{height: '35px', width: '35px'}}><i className="fa fa-truck" style={{paddingLeft: '10px'}}></i></div>
                                                                <div className="product-info-box text-muted"><span>Returnable</span></div>
                                                              
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="accordion product-accordian mt-1" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                                aria-expanded="true" aria-controls="collapseOne">
                                                                Product Description
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p>About this product</p>
                                                                <ul className="mt-0">
                                                                    <li>Consumes :  <b>600 W</b></li>
                                                                    <li> Capacity : <b>1.2 L</b></li>
                                                                    <li> Power Indicator : <b>Yes</b></li>
                                                                    <li> Lockable Lid : <b> No</b></li>
                                                                    <li> Auto Switch : <b>Off</b></li>
                                                                </ul>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="accordion product-accordian mt-2" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1"
                                                                aria-expanded="true" aria-controls="collapseOne1">
                                                                Seller Details
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne1" className="accordion-collapse collapse " aria-labelledby="headingOne"
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p>This is the essential information that is collected to create a personal account in our platform.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>


                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <div className="accordion product-accordian mt-1" id="accordionExample3">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne2"
                                                                aria-expanded="true" aria-controls="collapseOne2">
                                                                Manufacturing Description
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne2" className="accordion-collapse collapse " aria-labelledby="headingOne"
                                                            data-bs-parent="#accordionExample">
                                                            <div className="accordion-body">
                                                                <p>This is the essential information that is collected to create a personal account in our platform.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
               
            </div>
        </>
    ) 

}

export default ProductsList;