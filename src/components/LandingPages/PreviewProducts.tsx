import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProductsColumnsList, updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import { syncProductsWithShopify } from '../../services/ProductsService';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { SYNC_PRODUCTS_WITH_SUCCESS } from '../../utils/constants/NotificationConstants';

const PreviewProducts = () => {


    const products = useSelector((store: any) => store.products.selectedProductsList);
    const cols = useSelector((store: any) => store.products.selectedColumnsList);
    const [selectedProductsList, setSelectedProductsList] = useState(products);
    const [columns, setColumns] = useState(cols);
    const [messageID, setMessageID] = useState(useSelector((store: any) => store.products.productListFilters).messageID)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;

    const navigateToProductsList = () => {
        dispatch(updateSelectedProductsList(selectedProductsList));
        dispatch(updateSourcePage('preview'));
        navigate("/landing-page/products/products-list")
    }

    const getPayloadForSyncingProductsWithShopify = () => {
        let result = 
        {
            message_id: messageID,
            subscriber_id: "ondc.opteamix.com",
            buyer_id: user_details.buyer_id,
            stream_details: selectedProductsList.map((product:any) => {
                return {
                    stream_id: product.stream_id,
                    item_id: product.product_id,
                    bpp_provider_id: product.bpp_provider_id
                }
            })
        }

        return result;
    }

    const syncWithShopify = () => {
        let payload = getPayloadForSyncingProductsWithShopify();
        console.log("payload for sync with shopify = ", payload)
        syncProductsWithShopify(payload)
        .then((response: any) => {
           showSuccessMessage(SYNC_PRODUCTS_WITH_SUCCESS)
        })
        .catch(err => {
            console.log(err)
        });
    }

    const deleteProduct = (product: any) => {
        setSelectedProductsList((prevSelected: any) => {
            return prevSelected.filter((item: any) => item.product_id !== product.product_id);
          });
    }


    useEffect(()=>{
        if(products.length==0){
            navigate("/landing-page/products/products-list")
        }
    },[])

    return (
        <>

            <div className="container-fluid h-auto mt-4 px-5">
                <div className="row d-flex">
                    <div className="col-6 col-md-4 text-left">
                        <div className='back-button-container '>
                            <i className='fa fa-arrow-left cursor-pointer' onClick={navigateToProductsList}></i>
                            <h6 className='pl-2 mb-0 cursor-pointer' onClick={navigateToProductsList}>Back</h6>
                        </div>

                    </div>
                   
                </div>
                <div className="row d-flex mt-4">
                <div className="col text-left">
                        <div>

                            <h3>Products Selected</h3>
                        </div>
                    </div>

                    <div className="col text-right">
                        <a className="btn-link"><button type="button"
                            className="btn-custom" onClick={syncWithShopify}>Sync with shopify</button></a>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                    <div className="card shadow bg-white table-padding mb-3 pb-3 ">
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
                                            selectedProductsList
                                                .map((product: any, index: any) => {
                                                    return <tr key={index}>
                                                        <td className='products-list'><button type="button"
                                                            className="btn-custom-light" ><i className="fa fa-trash text-danger" 
                                                            onClick={()=> deleteProduct(product)}
                                                            style={{ fontSize: '14px' }}></i></button></td>
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

export default PreviewProducts;