import React from 'react';

const ProductThumbnail = (props:  any) => {

    const closeProductThumbnail = () => {
        props.closeModal();
    }

    return (
        <>
        <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-12 text-right mt-2">
                <i className='fa fa-close fa-lg cursor-pointer mt-1' onClick={closeProductThumbnail}></i>
            </div>
            <div className="col-12 thumnail-image-container">
                <img src={props.productDetails.thumbnail} alt="product-image" className='thumbnail-image' />
            </div>
        </div>
        </div>
        </>
    ) 

}

export default ProductThumbnail;