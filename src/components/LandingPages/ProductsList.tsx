import React, { useEffect } from 'react';

const ProductsList = () => {

    useEffect(() => {
      },[]);

    return (
        <>
            <div className="d-flex container-fluid mt-3 px-4">
                <div>
                    <h3>Products</h3>
                </div>
                <div>
                    <div className="text-right button-right-group">
                        <a  className="btn-link"><button type="button" className="btn-custom  mt-2 "><i className="fa fa-sync"></i>Sync with shopify</button></a>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-2 px-4">
                <div className="card shadow bg-white table-padding mb-3 p-3" >
                    <div className="d-flex">
                        <div className="search-container">
                            <div className="search text-center">
                                <i className="	fa fa-map-marker" style={{ paddingLeft: '26px', fontSize: '18px' }}> </i><input className="search_input" type="text" name="" placeholder="Select By Location" />

                            </div>
                        </div>
                        <div className="searchBar">
                            <div className="dropdown category_dropdown" style={{ borderRight: '2px solid #d4d4d4 !important' }}><button
                                className="btn btn-secondary bg-transparent dropdown-toggle d-flex flex-row flex-nowrap align-items-center justify-content-between h-100 rounded-0 border-0 px-3 show"
                                type="button" data-bs-toggle="dropdown" style={{ minWidth: '80px', maxWidth: '180px', overflow: 'hidden' }}
                                aria-expanded="true"><span className="d-block lh-sm fw-semibold ms-fs-14 text-capitalize text-dark"
                                    style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '15px' }}>All </span><i className="fa fa-caret-down" aria-hidden="true" style={{ color: 'black' }}></i></button>
                                <div className="dropdown-menu w-100 p-0 pt-2 fs-6 show"
                                    style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px' }}
                                    data-popper-placement="bottom-start">
                                    <div className="megamenu_search rounded-3 overflow-hidden p-0 ">
                                        <div className="row g-0 flex-row flex-nowrap h-100">
                                            <div className="col-12 col-sm-12 d-flex flex-column flex-nowrap">
                                                <div className="megamenu_search-nav flex-fill overflow-auto p-3 pt-1" style={{ maxHeight: '320px' }}>
                                                    <ul className="list-unstyled m-0">
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            role="button" title="All">All Categories</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Food &amp; Beverages" role="button">Food &amp; Beverages</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Fashion" role="button">Fashion</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Grocery" role="button">Grocery</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Beauty &amp; Personal Care" role="button">Beauty &amp; Personal Care</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Agriculture" role="button">Agriculture</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Home &amp; Kitchen" role="button">Home &amp; Kitchen</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Electronics" role="button">Electronics</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Automotive" role="button">Automotive</a></li>
                                                        <li><a className="dropdown-item small category_selection_list_item fw-semibold oneline_ellipsis"
                                                            title="Health &amp; Wellness" role="button">Health &amp; Wellness</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Wireless Bluetooth" value="" />
                            <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24">
                                    <path fill="#666666"
                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
                <div className=" card p-0 table-responsive mb-3">
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d4d4d4' }}>
                        <div className="d-flex mb-0" style={{
                            marginTop: '10px',
                            marginBottom: '-4px !important'
                        }} >
                            <div className="flex-grow-1" style={{ width: 'fit-content !important', marginLeft: '0px' }}>

                                <ul className="selected-pname" style={{ display: 'flex', paddingLeft: '18px' }}>

                                    <li className="ms-0">Vendor is Fingertips Bluetooth,Max fashion<span className="close">&times;</span></li>
                                </ul>
                            </div>
                            <div className="flex-grow-1" style={{ width: 'fit-content !important', marginLeft: '12px' }}>
                                <select className="form-select custom-select " style={{ paddingRight: '30px', height: '1.75rem', border: '1px dotted #aba0a0 !important', paddingTop: '3px' }}
                                >
                                    <option value="" selected disabled hidden>Speciality</option>
                                    <option>Remote</option>
                                    <option>Audio</option>
                                    <option>Wireless</option>

                                </select>
                            </div>

                        </div>
                        <div className="float-right mb-2 mt-2 me-2">
                            <span className="dropdown custom-drpdown">
                                <button className="btn btn-custom-light float-right dropdown-toggle"
                                    type="button"
                                    id="dropdownMicroProcessorTrigger"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"><i className="fa fa-sort" style={{ fontSize: '17px' }}></i></button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMicroProcessorTrigger" style={{ marginRight: '-62px !important', marginTop: '-8px !important', width: 'auto !important', padding: '5px 0px !important' }}>
                                    <span style={{ paddingLeft: '6px' }}>Sort By</span>
                                    <li>
                                        <a className="dropdown-item">
                                            Product name<span className="acc-icons" style={{ color: 'green' }}><i className="fa fa-check-circle"></i></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item">
                                            Seller<span className="acc-icons"><i className="fa fa-circle-thin"></i></span>
                                        </a>
                                    </li>

                                    <li>
                                        <a className="dropdown-item">
                                            Category<span className="acc-icons"><i className="fa fa-circle-thin"></i></span>
                                        </a>
                                    </li>
                                </ul>
                            </span>
                        </div>
                    </div>

                    <div className="mb-2 mt-2 me-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="px-3" style={{ marginTop: 'auto' }}>
                            <span><strong><i className="fa fa-minus-square"></i><span className="px-3">2 selected </span></strong></span>
                        </div>
                        <div className="float-right ">
                            <button type="button" className="btn btn-custom-light float-right" style={{ float: 'right' }}>Add for sync</button>
                        </div>
                    </div>

                    <table className="table table-hover  product-table" style={{ marginBottom: '0px', cursor: 'pointer' }}>

                        <thead className="table-light">
                            <tr>
                                <th><input type="checkbox" /></th>
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
                                <td className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a className="pop">
                                    <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340" />
                                </a></td>
                                <td style={{ paddingLeft: '0px !important', width: '20%' }}>Fingertips Bluetooth Remote Control Wireless</td>
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
                                <td><input type="checkbox" checked />
                                </td>
                                <td className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a className="pop">
                                    <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340" />
                                </a></td>
                                <td style={{ paddingLeft: '0px !important', width: '20%' }}>Fingertips Fashion</td>
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
                                <td><input type="checkbox" checked /></td>
                                <td className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}><a className="pop">
                                    <img src="https://cdn.shopify.com/s/files/1/0567/3084/5242/files/logo41_b107e4e7-e866-401e-a025-d3ab4bcd7efd_40x40@3x.png?v=1728297340" />
                                </a></td>
                                <td style={{ paddingLeft: '0px !important', width: '20%' }}>Max fashion dress set</td>
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


        </>
    ) 

}

export default ProductsList;