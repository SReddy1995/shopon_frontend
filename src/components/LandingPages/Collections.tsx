import React, { useEffect, useState } from 'react';
import SearchableMultiselectList from './SearchableMultiselectList';
import SimilarProductsImage from "../../assets/images/product-similar-2.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedCategoryForProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import ImageWithFallback from './ImageWithFallback';

const Collections = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch();

    // navigate to productsList

    const loadSimilarProducts = (category: any) => {
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
            minWidth:'160px'
        },
        {
            coltitle: "Description",
            visibilityDisplayName: "Description",
            column: "description",
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "SKU",
            visibilityDisplayName: "SKU",
            column: "sku",
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'160px'
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
            type: "text",
            serialNo: 3,
            isVisible: true,
            minWidth:'160px'
        },
        {
            coltitle: "Category",
            visibilityDisplayName: "Category",
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
                "is_ondc_product": "true",
                "ondc_category": "Fashion",
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

      const [entriesPerPage, setEntriesPerPage] = useState(2);
      const [totalPages, setTotalPages] = useState(Math.ceil(data.length / entriesPerPage));
      const [currentPage, setCurrentPage] = useState(1);
      const refValues = useSelector((store: any) => store.refValues.referenceList);
      const [searchTerm, setSearchTerm] = useState({key: '', value: ''}); // Global search
    
      const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };

    // Handle Global Search
    const handleSearch = (event: any) => {
        setSearchTerm((prevData: any) => {
           return {
            key: 'product',
            value:  event.target.value
           }
        });
    };

    const handleProductTypeFilter = (event: any) => {
        setSearchTerm((prevData: any) => {
           return {
            key: 'is_ondc_product',
            value:  "true"
           }
        });
    };

    // Filter data based on global search
    const filteredData = data.filter((item : any) =>
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );

    // Sort filtered data
    const sortedData = filteredData.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    
    // const filteredData = React.useMemo(() => {
    //     console.log("here")
    //     console.log("api response = ",data)

    //     let filteredItems = [...data ];
    //     filteredItems.filter((item : any) =>
    //         item.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     return filteredItems;
    //   }, [data]);

    //   const sortedData = React.useMemo(() => {
    //     console.log("here")
    //     console.log("api response = ",data)

    //     let sortableItems = [...filteredData ];
    //     if (sortConfig !== null) {
    //       sortableItems.sort((a: any, b: any) => {
    //         if (a[sortConfig.key] < b[sortConfig.key]) {
    //           return sortConfig.direction === 'ascending' ? -1 : 1;
    //         }
    //         if (a[sortConfig.key] > b[sortConfig.key]) {
    //           return sortConfig.direction === 'ascending' ? 1 : -1;
    //         }
    //         return 0;
    //       });
    //     }
    //     return sortableItems;
    //   }, [data, sortConfig]);
    
      const getPaginatedData = () => {
        const start = (currentPage - 1) * entriesPerPage;
        const end = start + entriesPerPage;
        return sortedData.slice(start, end);
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
        setTimeout(()=>{
            if(api_response.length>0){
                processAPIResponse(api_response);
                setNoData(false)
            }
            else{
                setNoData(true)
            }
            setLoading(false)
          }, 0)

      },[]);

      const setColumnsData = (data: any) => {
        setColumns(data);
      }

      const processAPIResponse = (response : any) => {
        setTotalPages(Math.ceil(response.length / entriesPerPage))
           let res =  response.map((x: any)=> x.collection)
           setData((prevData: any) => {
               return  res.map((item: any)=>{
                    return {
                        ...item,
                        thumbnail: getThumbnail(item),
                        is_ondc_product: item.is_ondc_product === "true" ? 'Yes' : 'No',
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

    return (
        <>
        {
            !loading&&
                <div className="container-fluid h-auto mt-4 px-5">
                    <div className="row mt-2">
                        <div className="col-12 text-left">
                            <h3>Collections</h3>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 ">
                            {
                                !noData &&
                                    <div className="card shadow bg-white table-padding mb-3 p-3 d-flex flex-row align-items-center">
                                        <div>
                                            <div className='checkbox-with-label'>
                                                <input type="checkbox"
                                                    checked={true}
                                                    onChange={()=>handleProductTypeFilter('is_ondc_product')}
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
                                    <div className="card shadow bg-white table-padding mb-3 pb-3 ">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className='table-responsive'>
                                                    <table id="example" className="table table-hover  product-table collection-example text-left" data-paging='false' >
                                                        <thead className="table-light">
                                                            <tr>
                                                                {
                                                                    columns.map((col: any, index: any) => {
                                                                        return col.isVisible && <th key={index} className='cursor-pointer' 
                                                                        style={{ padding: '0.375rem',minWidth:col.minWidth?col.minWidth:"auto"}}
                                                                        onClick={() => requestSort(col.column)}>{col.coltitle}
                                                                            {
                                                                                col.column !== "thumbnail" &&
                                                                                <i className={`float-right mt-1 fa ${sortConfig?.key === col.column ? (sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down') : 'fa-sort'}`}></i>
                                                                            }

                                                                        </th>
                                                                    })
                                                                }
                                                                <th style={{ padding: '0.375rem',minWidth:"150px"}}>Actions</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                paginatedData.map((item: any) => (

                                                                    <tr key={item.shopify_product_id}>
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
                                                                                                        <td key={i}><span className={item[col.column] === 'Active' ? "product-active" : "product-draft"}>{item[col.column]}</span></td>
                                                                                                        :
                                                                                                        <td key={i}>{item[col.column]}</td>

                                                                                                )

                                                                                        )

                                                                                })
                                                                        }
                                                                        <td><a><button type="button"
                                                                            className="btn-custom-light" ><i className="fa fa-trash text-danger" style={{ fontSize: '14px' }}></i></button></a>
                                                                            <a > <button type="button" onClick={() => loadSimilarProducts(item.ondc_category)}
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
                                                    {/* <div className="pagination float-right mr-2 mb-3">
                                                        <a onClick={handlePrevPage}>&laquo; Prev</a>

                                                        <a onClick={handleNextPage}>Next &raquo;</a>
                                                    </div> */}

                                                <div className='pagination-container mt-2'>

                                                    <nav>
                                                        <ul className="pagination">
                                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                                <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
                                                                    Previous
                                                                </button>
                                                            </li>
                                                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                                <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                                                                    Next
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

        </>
    ) 

}

export default Collections;