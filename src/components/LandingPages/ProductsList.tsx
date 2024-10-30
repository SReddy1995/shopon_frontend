import Multiselect from 'multiselect-react-dropdown';
import React, { useEffect, useState } from 'react';

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

    const [selectedProducts, setSelectedProducts] = useState([])
    const [columns, setColumns] = useState<any[]>([])

    const productsList = [
        {
            product_id: 1,
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340",
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
            thumbnail: "https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340",
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
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);

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

    const handleColumnVisiblityClick = (values: any) => {
        setIsColumnVisibilityOpen(!isColumnVisibilityOpen)
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

      const toggleProductSelection = (product: any) => {
        setSelectedProducts((prevSelected: any) => {
            if (prevSelected.some((obj: any) => obj.product_id === product.product_id)) {
              return prevSelected.filter((item: any) => item.product_id !== product.product_id);
            } else {
              return [...prevSelected, product];
            }
          });
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

      const toggleSortByOption = (option: any) => {
        setSelectedSortBy(option);
        setSortByOpen(false);
      };

    useEffect(() => {
        setData(JSON.parse(JSON.stringify(columns_from_api)))
      },[]);

      const setData = (data: any) => {
        setColumns(data);
      }

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
                                        <input className="search_input" type="text" name="" placeholder="Select by location" />
                                        <i className="fa fa-close  fa-sm pl-0 cursor-pointer"> </i>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="category-search-container">
                                        <div className="category-dropdown-toggler" onClick={toggleDropdown} >
                                            <span className="d-block lh-sm fw-semibold ms-fs-14 text-capitalize text-dark">All </span>
                                            <i className="fa fa-caret-down cursor-pointer" ></i>
                                        </div>
                                        {isOpen && (
                                            <div className="category-dropdown-menu w-100 p-0 pt-0 fs-6">
                                                <div className="megamenu_search rounded-3 overflow-hidden p-0 ">
                                                    <div className="row g-0 flex-row flex-nowrap h-100">
                                                        <div className="col-12 col-sm-12 d-flex flex-column flex-nowrap">
                                                            <div className="megamenu_search-nav flex-fill overflow-auto px-3 pt-1 pb-3">
                                                                <ul className="list-unstyled m-0">
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        role="button" title="All">-- select category -- </a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Food &amp; Beverages" role="button">Food &amp; Beverages</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Fashion" role="button">Fashion</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Grocery" role="button">Grocery</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Beauty &amp; Personal Care" role="button">Beauty &amp; Personal Care</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Agriculture" role="button">Agriculture</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Home &amp; Kitchen" role="button">Home &amp; Kitchen</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Electronics" role="button">Electronics</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
                                                                        title="Automotive" role="button">Automotive</a></li>
                                                                    <li><a className="dropdown-item small  fw-semibold oneline_ellipsis pl-1"
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
                                                selectedVendors.length > 0 ?
                                                    <>
                                                        <span>&nbsp; is </span>
                                                        {

                                                            selectedVendors
                                                                .map((vendor: any, index: any) => {
                                                                    return index > 0 ?
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

                                                    !isVendorDropdownOpen && selectedVendors.length == 0 ?
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
                                                                .map((vendor: any, index: any) => {
                                                                    return <li key={index} className='d-flex flex-row px-2'>
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
                                                selectedSpecialities.length > 0 ?
                                                    <>
                                                        <span>&nbsp; is </span>
                                                        {

                                                            selectedSpecialities
                                                                .map((vendor: any, index: any) => {
                                                                    return index > 0 ?
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

                                                    !isSpecialityDropdownOpen && selectedSpecialities.length == 0 ?
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
                                                                .map((vendor: any, index: any) => {
                                                                    return <li key={index} className='d-flex flex-row px-2'>
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
                            <div className="mb-2 mt-2 me-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="px-3" style={{ marginTop: 'auto' }}>
                                    <span><strong><i className="fa fa-minus-square"></i><span className="px-3">{selectedProducts.length} products selected </span></strong></span>
                                </div>
                            </div>
                            <div className='table-responsive'>
                            <table className="table table-hover  product-table mt-2 text-left" style={{ marginBottom: '0px', cursor: 'pointer' }}>

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
                                                    <td><input type="checkbox" 
                                                    checked={selectedProducts.some((obj: any) => obj.product_id === product.product_id)}
                                                    onChange={() => toggleProductSelection(product)} /></td>
                                                    {
                                                        columns
                                                            .map((col: any, i: any) => {
                                                                return col.isVisible &&
                                                                    (
                                                                        col.type == "image" ?
                                                                            <td key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a href="#" className="pop">
                                                                                <img src={product[col.column]} alt="" />
                                                                            </a></td>
                                                                            :

                                                                            (
                                                                                col.type == "active-draft-button" ?
                                                                                    <td key={i}><span className={product[col.column] == 'Active' ? "product-active" : "product-draft"}>{product[col.column]}</span></td>
                                                                                    :
                                                                                    <td key={i}>{product[col.column]}</td>
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
            </div>
        </>
    ) 

}

export default ProductsList;