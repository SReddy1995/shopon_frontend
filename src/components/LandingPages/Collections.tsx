import React, { useEffect, useMemo, useState } from 'react';
import SearchableMultiselectList from './SearchableMultiselectList';
import SimilarProductsImage from "../../assets/images/product-similar-2.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCategoryForProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import ImageWithFallback from './ImageWithFallback';
import { deleteProductFromCollection, getShopifyProducts } from '../../services/CollectionsService';
import { showSuccessMessage, showWarningMessage } from '../../shared/notificationProvider';
import { COLLECTION_PRODUCT_DELETED, NO_ONDC_CATEGORY_PRESENT, UNABLE_TO_MAP_ONDC_CATEGORY } from '../../utils/constants/NotificationConstants';
import ModalWindow from './ModalWindow';
import ConfirmDelete from './ConfirmDelete';

const Collections = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const confirmDeleteMsg = "Are you sure you want to delete this product?"

    // navigate to productsList

    const loadSimilarProducts = (item: any) => {
        let category = item.ondc_category? item.ondc_category : null;
        if(category){
            if(refValues.categoriesType.filter((x: any)=> x.description === category) && refValues.categoriesType.filter((x: any)=> x.description === category).length>0){
                let cat = [];
                cat.push({
                    value: refValues.categoriesType.filter((x: any)=> x.description === category)[0].ondc_categories_id,
                    label: category
                })
                console.log(cat)
                dispatch(updateSelectedCategoryForProductsList(cat));
                dispatch(updateSourcePage('collections'));
                navigate('/landing-page/products/products-list')
            }
            else{
                showWarningMessage(UNABLE_TO_MAP_ONDC_CATEGORY)
            }
        }
        else{
            showWarningMessage(NO_ONDC_CATEGORY_PRESENT)
        }

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
            coltitle: "Title",
            visibilityDisplayName: "Title",
            column: "title",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Vendor",
            visibilityDisplayName: "Vendor",
            column: "vendor",
            type: "text",
            serialNo: 2,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Status",
            visibilityDisplayName: "Status",
            column: "status",
            type: "active-draft-button",
            serialNo: 3,
            isVisible: true,
            minWidth:'120px'
        },
        {
            coltitle: "Description",
            visibilityDisplayName: "Description",
            column: "description",
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'275px'
        },
        {
            coltitle: "SKU",
            visibilityDisplayName: "SKU",
            column: "sku",
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'130px'
        },
        {
            coltitle: "Product Type",
            visibilityDisplayName: "Product Type",
            column: "product_type",
            type: "text",
            serialNo: 4,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Shopify Category",
            visibilityDisplayName: "Shopify Category",
            column: "category",
            type: "text",
            serialNo: 8,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Price",
            visibilityDisplayName: "Price",
            column: "price",
            type: "text",
            serialNo: 5,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Inventory",
            visibilityDisplayName: "Inventory",
            column: "inventory_quantity",
            type: "text",
            serialNo: 6,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Alternate ID",
            visibilityDisplayName: "Alternate ID",
            column: "alternate_id",
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "ONDC Product",
            visibilityDisplayName: "ONDC Product",
            column: "is_ondc_product",
            type: "product_type",
            serialNo: 3,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "ONDC Category",
            visibilityDisplayName: "ONDC Category",
            column: "ondc_category",
            type: "text",
            serialNo: 8,
            isVisible: true,
            minWidth:'160px'
        },
        
    ])

    const api_response = [
        {
            "collection": {
                "shopify_product_id": "gid://shopify/Product/8899319365877",
                "title": "Hello There 1",
                "vendor": "Hey Vendor 1",
                "status": "DRAFT",
                "description": "This is a hello product This product says hello to someone in the room, but cannot be heard by anyone.",
                "product_type": "",
                "price": "1045.67",
                "sku": "12344",
                "inventory_quantity": 15,
                "alternate_id": "12344",
                "is_ondc_product": "true",
                "ondc_category": "Fashion",
                "media": [
                    {
                        "media_content_type": "EXTERNAL_VIDEO",
                        "media_url": "https://cdn.shopify.com/s/files/1/0721/9383/5253/files/preview_images/hqdefault_0ed7e342-d002-49ab-9cc7-a8c1a8fa0138.jpg?v=1731427566"
                    },
                    {
                        "media_content_type": "IMAGE",
                        "media_url": "https://cdn.shopify.com/1234s/files/1/0721/9383/5253/files/images_eeff2d52-fd5c-4b27-9064-34e92ef8bbe8.jpg?v=1731427566"
                    }
                ]
            }
        },
        {
            "collection": {
                "shopify_product_id": "gid://shopify/Product/8899319365878",
                "title": "Hello There 2",
                "vendor": "Hey Vendor 2",
                "status": "DRAFT",
                "description": "This is a hello product This product says hello to someone in the room, but cannot be heard by anyone.",
                "product_type": "",
                "price": "1045.67",
                "sku": "12344",
                "inventory_quantity": 15,
                "alternate_id": "12344",
                "is_ondc_product": "true",
                "ondc_category": "Fashion",
                "media": [
                    {
                        "media_content_type": "EXTERNAL_VIDEO",
                        "media_url": "https://cdn.shopify.com/s/files/1/0721/9383/5253/files/preview_images/hqdefault_0ed7e342-d002-49ab-9cc7-a8c1a8fa0138.jpg?v=1731427566"
                    },
                    {
                        "media_content_type": "IMAGE",
                        "media_url": ""
                    }
                ]
            }
        },
        {
            "collection": {
                "shopify_product_id": "gid://shopify/Product/8899319365879",
                "title": "Hello There 3",
                "vendor": "Hey Vendor 3",
                "status": "DRAFT",
                "description": "This is a hello product This product says hello to someone in the room, but cannot be heard by anyone.",
                "product_type": "",
                "price": "1045.67",
                "sku": "12344",
                "inventory_quantity": 15,
                "alternate_id": "12344",
                "is_ondc_product": "false",
                "ondc_category": "Grocery",
                "media": [
                    {
                        "media_content_type": "EXTERNAL_VIDEO",
                        "media_url": "https://cdn.shopify.com/s/files/1/0721/9383/5253/files/preview_images/hqdefault_0ed7e342-d002-49ab-9cc7-a8c1a8fa0138.jpg?v=1731427566"
                    },
                    {
                        "media_content_type": "IMAGE",
                        "media_url": "https://cdn.shopify.com/s/files/1/0721/9383/5253/files/images_eeff2d52-fd5c-4b27-9064-34e92ef8bbe8.jpg?v=1731427566"
                    }
                ]
            }
        }
    ]

    const [data, setData] = useState<any>([
        // {
        //     id:1,
        //     thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
        //     product: "Fingertips Bluetooth Remote Control Wireless",
        //     status: "Active",
        //     inventory: "150,000 in stock",
        //     sales: "56",
        //     market: "3",
        //     b2b_catalogs: "7",
        //     category: {
        //         value: 1,
        //         label: "Grocery"
        //     },
        //     type: "Retail"
        // },
        // {
        //     id:2,
        //     thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
        //     product: "Fingertips Fashion",
        //     status: "Draft",
        //     inventory: "150,000 in stock",
        //     sales: "56",
        //     market: "3",
        //     b2b_catalogs: "7",            
        //     category: {
        //         value: 3,
        //         label: "Fashion"
        //     },
        //     type: "Retail"
        // },
        // {
        //     id:3,
        //     thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/navyblue4_40x40@3x.jpg?v=1727243854",
        //     product: "Max fashion dress set",
        //     status: "Active",
        //     inventory: "150,000 in stock",
        //     sales: "56",
        //     market: "3",
        //     b2b_catalogs: "7",            
        //     category: {
        //         value: 3,
        //         label: "Fashion"
        //     },
        //     type: "Retail"
        // },
      ]);
      const [sortConfig, setSortConfig] = useState({key: '', direction: ''});
      const [columns, setColumns] = useState<any[]>([])
      const [loading,setLoading] = useState(true)
      const [noData, setNoData] = useState(false)
      const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
      const refValues = useSelector((store: any) => store.refValues.referenceList);
      const [searchTerm, setSearchTerm] = useState(''); // Global search
      
      const [isProductTypeDropdownOpen, setIsProductTypeDropdownOpen] = useState(false);
      const [selectedProducType, setSelectedProductType] = useState('both')
      const [hasNextPage, setHasNextPage] = useState(false)
      const [hasPreviousPage, setHasPreviousPage] = useState(false)
      const [startCursor, setStartCursor] = useState(null)
      const [endCursor, setEndCursor] = useState(null)
      const [openDeleteConfirm, setConfirmDeleteModalOpen] = useState(false);
      const [selectedProductToDelete, setSelectedProductToDelete] = useState<any>(null)
      const  [current_list_next_page_id, setCurrentListNextPageId] = useState<any>(null)
      const  [current_list_prev_page_id, setCurrentListPrevPageId] = useState<any>(null)
    
      const handlePrevPage = () => {
        fetchShopifyProducts(startCursor, null)
      };
    
      const handleNextPage = () => {
        fetchShopifyProducts(null, endCursor)
      };

    // Handle Global Search
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    // Filter data based on global search
    const filteredData = data.filter((item : any) =>{
        // return item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
        if(selectedProducType === 'both'){
            return item.title.toLowerCase().includes(searchTerm.toLowerCase())
        }
        else if(selectedProducType === 'ondc'){
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
            (item.is_ondc_product === true)
        }
        else if(selectedProducType === 'shopify'){
            return item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
            (item.is_ondc_product === false)
        }
    }
    );

      const sortedData = React.useMemo(() => {
        let sortableItems = [...filteredData ];
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
      }, [data, sortConfig,filteredData]);

     const getPaginatedData = () => {
        return filteredData;
      };
    
      const paginatedData = getPaginatedData();

      const requestSort = (key: any) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      useEffect(() => {
        setColumnsData(JSON.parse(JSON.stringify(columns_from_api)))
        setLoading(true)
        fetchShopifyProducts(null,null);
        
      },[]);

      const fetchShopifyProducts = (prev_page_id: any, next_page_id: any) => {
        setSelectedProductToDelete(null)
        let payload = {
            store_url: user_details.store_url,
            title: "",
            next_page_id: next_page_id,
            prev_page_id: prev_page_id
        }
        setCurrentListNextPageId(next_page_id)
        setCurrentListPrevPageId(prev_page_id)
        getShopifyProducts(payload)
        .then((data: any) => {
                if(data.collections && data.collections.length>0){
                    processPagination(data)
                    processAPIResponse(data);
                    setNoData(false)
                }
                else{
                    setNoData(true)
                }
                setLoading(false)
        })
        .catch(err => {
            setNoData(true)
            setLoading(false)
        });
      }

      const performDeleteProductFromCollection = () => {
        let payload = {
            shopify_product_id: selectedProductToDelete,
            store_url: user_details.store_url,
        }
        deleteProductFromCollection(payload)
        .then((data: any) => {
                showSuccessMessage(COLLECTION_PRODUCT_DELETED)
                setConfirmDeleteModalOpen(false);
                fetchShopifyProducts(current_list_prev_page_id,current_list_next_page_id)
        })
        .catch(err => {
            console.log(err)
            setConfirmDeleteModalOpen(false);
        });
      }

      const setColumnsData = (data: any) => {
        setColumns(data);
      }

      const processPagination = (response: any) => {
        let page_info = response.page_info;

        setHasNextPage(page_info.hasNextPage)
        setHasPreviousPage(page_info.hasPreviousPage)
        setStartCursor(page_info.startCursor)
        setEndCursor(page_info.endCursor)
      }

      const processAPIResponse = (response : any) => {        
           let res =  response.collections
           setData((prevData: any) => {
               return  res.map((item: any)=>{
                    return {
                        ...item,
                        thumbnail: getThumbnail(item),
                        is_ondc_product: item.is_ondc_product === "true" ? true : false,
                        price: item.price && item.price !== '' ? formatCurrency(item.price) : ''
                    }
                })
           })
      }

      const getThumbnail = (item: any) =>{
            if (item.media && item.media.filter((x:any)=> x.media_content_type === 'IMAGE').length>0){
                return item.media.filter((x:any)=> x.media_content_type === 'IMAGE')[0].media_url
            }
            else{
                return null
            }
      }

      const formatCurrency =(price: any) => {
        // Format the number with currency style
        const formattedPrice = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(price);
      
        // Check if the price has decimal part .00 and remove it
        if (formattedPrice.includes('.00')) {
          // Remove the decimal part
          return formattedPrice.split('.')[0];
        }
      
        return formattedPrice;
      }

      const productTypes = [
        {
            value: 'both', label: 'Both', displayLabel: 'both ONDC and Shopify'
        },
        {
            value: 'ondc', label: 'ONDC Products', displayLabel: 'ONDC'
        },
        {
            value: 'shopify', label: 'Shopify Products', displayLabel: 'Shopify'
        }
      ]

    // vendor selection
    const handleProductTypeSelectionClick = (values: any) => {
        setIsProductTypeDropdownOpen(!isProductTypeDropdownOpen)
    }

    const handleProductTypeChange = (event: any) => {
        setSelectedProductType(event);
        setIsProductTypeDropdownOpen(false)
    };

    const openConfirmDeleteModal = (key: any) => {
        setSelectedProductToDelete(key)
        setConfirmDeleteModalOpen(true);
    }

    const closeConfirmDeleteModal = () => {
        setSelectedProductToDelete(null)
        setConfirmDeleteModalOpen(false);
      }

    return (
        <>
        {
            !loading&&
                <div className="container-fluid h-auto mt-3 px-5">
                    <div className="row mt-1">
                        <div className="col-12 text-left">
                            <h3>Collections</h3>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="col-12 ">
                            {
                                !noData &&
                                    <div className="card shadow bg-white table-padding mb-2 px-1 py-1 d-flex flex-row align-items-center">
                                        <div className='collections-filters' style={{width:'100%'}}>
                                            <div className='collections-search-by-product-container'>
                                                <input className="search_input category-selector-search-input" type="text" name="" onChange={handleSearch} placeholder="Search by product" />
                                                <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                                    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                                        <path fill="#666666"
                                                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                noData &&
                                <h6>No Data Available</h6>
                            }

                        </div>
                        {
                            !noData &&
                                <div className="col-12">
                                    <div className="card shadow bg-white table-padding mb-0 pb-0 ">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="mb-0 px-3 py-2 d-flex flex-row align-items-center">
                                                    <div className='collections-vendor-filter-container'>
                                                    <div className="collections-search-by-vendor-container px-2" >
                                                        <p className='mb-0 pl-2 cursor-pointer dynamic-text' onClick={handleProductTypeSelectionClick}>Product Type
                                                            {
                                                                selectedProducType &&
                                                                    <>
                                                                        <span>&nbsp; is </span>
                                                                        {
                                                                            <span>{productTypes.filter((x:any)=> x.value === selectedProducType)[0].displayLabel}</span>
                                                                        }
                                                                      
                                                                    </>  

                                                            }
                                                            {
                                                                !isProductTypeDropdownOpen ?
                                                                <span>&nbsp; <i className='fa fa-caret-down pr-2 cursor-pointer float-right align-self-center ml-2 mt-1' onClick={handleProductTypeSelectionClick}></i> </span>
                                                                :
                                                                <span>&nbsp; <i className='fa fa-caret-up pr-2 cursor-pointer float-right align-self-center ml-2 mt-1' onClick={handleProductTypeSelectionClick}></i> </span>
                                                            }
                                                        </p>
                                                    </div>
                                                    {
                                                        isProductTypeDropdownOpen && (
                                                            <div className="collections-search-by-vendor-dropdown">
                                                                <div className='d-flex flex-column align-items-start p-3'>
                                                                    {
                                                                        productTypes
                                                                        .map((type: any, index: any)=>{
                                                                            return <div key={type.value} className='d-flex flex-row align-items-center w-100 cursor-pointer px-2 product-type-selector' onClick={()=>handleProductTypeChange(type.value)}>
                                                                                <label>
                                                                                    <input
                                                                                        type="radio"
                                                                                        value={type.value}
                                                                                        className='mr-2 mt-1'
                                                                                        checked={selectedProducType === type.value}
                                                                                    />
                                                                                    {type.label}
                                                                                </label>
                                                                            </div>
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className='table-responsive'>
                                                    <table id="example" className="table table-hover  product-table collection-example text-left" data-paging='false' >
                                                        <thead className="table-light">
                                                            <tr>
                                                            <th style={{ padding: '0.375rem',minWidth:"95px"}}></th>
                                                                {
                                                                    columns.map((col: any, index: any) => {
                                                                        return col.isVisible && <th key={index} className='cursor-pointer' 
                                                                        style={{ padding: '0.375rem',minWidth:col.minWidth?col.minWidth:"auto"}}>{col.coltitle}
                                                                        </th>
                                                                    })
                                                                }
                                                                

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                paginatedData.map((item: any) => (

                                                                    <tr key={item.shopify_product_id}>
                                                                           <td><a><button type="button"
                                                                            className="btn-danger-icon" onClick={() => openConfirmDeleteModal(item.shopify_product_id)}><i className="fa fa-trash text-danger" style={{ fontSize: '14px' }}></i></button></a>
                                                                            <a > <button type="button" onClick={() => loadSimilarProducts(item)}
                                                                                className="btn"  style={{marginLeft:'-8px'}}><img src={SimilarProductsImage} style={{ width: '26px', height: '24px !important', padding: '0px 0px', display: 'inline' }} />
                                                                            </button>
                                                                            </a>
                                                                        </td>
                                                                        {
                                                                            columns
                                                                                .map((col: any, i: any) => {
                                                                                    return col.isVisible &&
                                                                                        (
                                                                                            col.type === "image" ?
                                                                                                <td key={col.column + i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a href="#" className="pop">
                                                                                                    <ImageWithFallback
                                                                                                        src={item[col.column]}
                                                                                                        alt=""/>
                                                                                                </a></td>
                                                                                                :

                                                                                                (
                                                                                                    col.type === "active-draft-button" ?
                                                                                                        <td key={i}><span className={item[col.column] === 'ARCHIVED' ? "product-archived" : (item[col.column] === 'DRAFT'? "product-draft": "product-active")}>{item[col.column]}</span></td>
                                                                                                        :
                                                                                                        (
                                                                                                            col.type === "product_type" ?
                                                                                                            (
                                                                                                                item[col.column] === true?
                                                                                                                <td key={i}><span>Yes</span></td>
                                                                                                                :
                                                                                                                <td key={i}><span>No</span></td>
                                                                                                            )
                                                                                                            
                                                                                                            :
                                                                                                            <td key={i}>{item[col.column]}</td>
                                                                                                        )
                                                                                                       

                                                                                                )

                                                                                        )

                                                                                })
                                                                        }
                                                                     

                                                                    </tr>
                                                                ))}

                                                        </tbody>
                                                    </table>


                                                </div>
                                            </div>
                                            <div className="col-12">
                                                    {/* <div className="pagination float-right mr-2 mb-3">
                                                        <a onClick={handlePrevPage}>&laquo; Prev</a>

                                                        <a onClick={handleNextPage}>Next &raquo;</a>
                                                    </div> */}

                                                <div className='pagination-container mt-2'>

                                                    <nav>
                                                        <ul className="pagination">
                                                            <li className={`page-item ${!hasPreviousPage ? 'disabled' : ''}`}>
                                                                <button className="page-link" onClick={handlePrevPage} disabled={!hasPreviousPage}>
                                                                &#8249;
                                                                </button>
                                                            </li>
                                                            <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
                                                                <button className="page-link" onClick={handleNextPage} disabled={!hasNextPage}>
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

                    </div>
                </div>
        }
            <ModalWindow show={openDeleteConfirm} modalClosed={closeConfirmDeleteModal}>
                <ConfirmDelete confirmModalClosed={closeConfirmDeleteModal}  deleteRecord={performDeleteProductFromCollection} msg={confirmDeleteMsg}/>
            </ModalWindow>

        </>
    ) 

}

export default Collections;