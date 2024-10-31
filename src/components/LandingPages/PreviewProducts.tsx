import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProductsColumnsList, updateSelectedProductsList, updateSourcePage } from '../../utils/reduxStore/productsSlice';

const PreviewProducts = () => {


    const products = useSelector((store: any) => store.products.selectedProductsList);
    const cols = useSelector((store: any) => store.products.selectedColumnsList);
    const [selectedProductsList, setSelectedProductsList] = useState(products);
    const [columns, setColumns] = useState(cols);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToProductsList = () => {
        dispatch(updateSelectedProductsList(selectedProductsList));
        dispatch(updateSourcePage('preview'));
        navigate("/landing-page/products/products-list")
    }

    const syncWithShopify = () => {

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
                    <div className="col text-left">
                        <div onClick={navigateToProductsList} className='back-button-container cursor-pointer'>
                            <i className='fa fa-arrow-left'></i>
                            <h6 className='pl-2 mb-0'>Back</h6>
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