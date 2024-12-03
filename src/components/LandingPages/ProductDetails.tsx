import { Options, Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useRef } from 'react'

const ProductDetails = (props: any) => {

    const mainRef = useRef<Splide | null>(null);
    const thumbsRef = useRef<Splide | null>(null);
    const product_details = props.productDetails;

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

    const closeProductDetails = () => {
        props.closeProductDetails();
    }

    useEffect(() => {
        if (mainRef.current && thumbsRef.current) {
            mainRef.current.sync(thumbsRef.current.splide as any);
          }
      },[]);


    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-12 d-flex justify-content-between mt-2">
                <h4>{product_details.product}</h4>
                <i className='fa fa-close fa-lg cursor-pointer mt-1' onClick={closeProductDetails}></i>
            </div>

            <div className="col-12 product-details-listing">
                <div className="row">
                    <div className="col-12 mt-2">
                        <Splide
                            key="main"
                            ref={mainRef}
                            options={mainOptions}>
                            {product_details.gallery.map((slide: any, index: any) => (
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
                            {product_details.gallery.map((slide: any, index: any) => (
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
                           
                            <span className="price-black">
                                {product_details.price}
                            </span>
                            <span className="price-red text-sm">
                            &nbsp;{product_details.measure}

                            </span>
                        </div>
                        <div className='price-container'>
                            <p className="mb-0">Available Quantity : {product_details.availability}</p>
                        </div>
                        <div className='price-container'>
                            <p className="mb-0">Maximum Quantity : {product_details.maximumQuantity}</p>
                        </div>
                        <div className='price-container mt-2'>
                            <p><span className="price-tag">Category : </span><span>{product_details.category}</span></p>
                        </div>
                    </div>
                    <div className="col-md-6 col-12 seller-info-accessibility-container text-right">
                        <span className="vendor-name"><span className="price-tag">Seller : </span>{product_details.seller}</span>
                        <div className="product-accessibility-container mt-1">
                            {
                                product_details.cancellable === 'Yes' &&
                                <div className="border-0 rounded-0 shadow-none text-center mb-0" style={{maxWidth: '160px',cursor: 'pointer'}}>
                                 
                                        <div className="bg-light d-flex align-items-center justify-content-center rounded-circle mx-auto mb-2"
                                            style={{height: '35px', width: '35px'}}><i className="fa fa-ban" style={{paddingLeft: '10px'}}></i></div>
                                        <div className="product-info-box text-muted "><span>Cancellable</span></div>
                                      
                                </div>
                            }
                            {
                                product_details.returnable === 'Yes' &&
                                <div className="border-0 rounded-0 shadow-none text-center mb-0" style={{maxWidth: '160px',cursor: 'pointer'}}>
                                  
                                        <div className="bg-light d-flex align-items-center justify-content-center rounded-circle mx-auto mb-2"
                                            style={{height: '35px', width: '35px'}}><i className="fa fa-truck" style={{paddingLeft: '10px'}}></i></div>
                                        <div className="product-info-box text-muted"><span>Returnable</span></div>
                                      
                                </div>
                            }
                                

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
                                            {/* <li>Consumes :  <b>600 W</b></li>
                                            <li> Capacity : <b>1.2 L</b></li>
                                            <li> Power Indicator : <b>Yes</b></li>
                                            <li> Lockable Lid : <b> No</b></li>
                                            <li> Auto Switch : <b>Off</b></li> */}
                                            <li><p>{product_details.product_short_desc}</p></li>
                                            <li><p>{product_details.product_long_desc}</p></li>
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
                                        <div className="row seller-info-container">
                                            <div className="col-8">
                                                <h6>{product_details.seller_short_desc}</h6>
                                                <p>{product_details.seller_long_desc}</p>
                                            </div>
                                            <div className="col-3 d-flex align-items-center p-2">
                                                <img src={product_details.seller_image} alt="" />
                                            </div>
                                        </div>
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
                                        <p>{product_details.manufacturer}</p>
                                        <p>{product_details.manufacturer_address}</p>
                                        <p>{product_details.commodity_name}</p>
                                        <p>{product_details.month_year_for_package}</p>
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

export default ProductDetails;