import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';
import { syncProductsWithShopify } from '../../services/ProductsService';
import { showSuccessMessage } from '../../shared/notificationProvider';
import { SYNC_PRODUCTS_WITH_SUCCESS } from '../../utils/constants/NotificationConstants';

const PreviewProducts = () => {


    const products = useSelector((store: any) => store.products.selectedProductsList);
    const selectedDomains = useSelector((store: any) => store.products.productListFilters).category;
    const cols = useSelector((store: any) => store.products.selectedColumnsList);
    const [selectedProductsList, setSelectedProductsList] = useState(products);
    const columns = cols;
    const messageID = useSelector((store: any) => store.products.productListFilters).messageID;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user_details = localStorage.getItem('user_details') ? JSON.parse(localStorage.getItem('user_details') || '{}') : null;
    const refValues = useSelector((store: any) => store.refValues.referenceList);
    const [syncing, setSyncing] = useState(false);

    const navigateToProductsList = (products: any) => {
        dispatch(updateSelectedProductsList(products));
        dispatch(updateSourcePage('preview'));
        navigate("/landing-page/products/products-list")
    }

    const getPayloadForSyncingProductsWithShopify = () => {
        let result = 
        {
            message_id: messageID,
            subscriber_id: "ondc.opteamix.com",
            buyer_id: user_details.buyer_id,
            domains: getDomains(),
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

    const getDomains = () => {
        const idsToFilter = selectedDomains.map((item: any) => item.value); // Extracts the 'id' from each object in array2

        const filteredDomains = refValues.categoriesType.filter((cat: any) => idsToFilter.includes(cat.ondc_categories_id));

        return filteredDomains

    }

    const syncWithShopify = () => {
        setSyncing(true)
        let payload = getPayloadForSyncingProductsWithShopify();
        console.log("payload for sync with shopify = ", payload)
        syncProductsWithShopify(payload)
        .then((response: any) => {
           showSuccessMessage(SYNC_PRODUCTS_WITH_SUCCESS)
           setSyncing(false)
           navigateToProductsList([])
        })
        .catch(err => {
            console.log(err)
            setSyncing(false)
        });
    }

    const deleteProduct = (product: any) => {
        setSelectedProductsList((prevSelected: any) => {
            return prevSelected.filter((item: any) => item.selector_reference_id !== product.selector_reference_id);
          });
    }


    useEffect(()=>{
        if(products.length===0){
            navigate("/landing-page/products/products-list")
        }
    },[navigate,products.length])

    return (
        <>

            <div className="container-fluid h-auto mt-3 px-5">
                
                <div className="row d-flex mt-1">
                <div className="col text-left">
                       

                        <span><h3><i className='fa fa-arrow-circle-left me-2 cursor-pointer' onClick={()=>navigateToProductsList(selectedProductsList)}></i> Shortlisted Products</h3></span>
                        
                    </div>

                    <div className="col text-right">
                        <button type="button" disabled={syncing}
                            className="btn-custom" onClick={syncWithShopify}>Sync with Shopify</button>
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-12">
                    <div className="card shadow bg-white table-padding mb-3 pb-3 ">
                            <div className='table-responsive' style={{borderRadius:'0.75rem'}}>
                                <table className="table table-hover  product-table text-left" style={{ marginBottom: '0px', cursor: 'pointer' }}>

                                    <thead className="table-light">
                                        <tr>
                                            <th ></th>
                                            {
                                                columns.map((col: any, index: any) => {
                                                    return col.isVisible && <th key={index} style={{ padding: '0.375rem',minWidth:col.minWidth?col.minWidth:"auto"}}>{col.coltitle}</th>
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
                                                            className="btn-danger-icon" ><i className="fa fa-trash text-danger" 
                                                            onClick={()=> deleteProduct(product)}
                                                            style={{ fontSize: '14px' }}></i></button></td>
                                                        {
                                                            columns
                                                                .map((col: any, i: any) => {
                                                                    return col.isVisible &&
                                                                        (
                                                                            col.type === "image" ?
                                                                                <td key={i} className="product-small-image px-0" style={{ paddingLeft: '0px !important' }}>
                                                                                    <img src={product[col.column]} alt="" /></td>
                                                                                :

                                                                                (
                                                                                    col.type === "active-draft-button" ?
                                                                                        <td key={i}><span className={product[col.column] === 'Active' ? "product-active" : "product-draft"}>{product[col.column]}</span></td>
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