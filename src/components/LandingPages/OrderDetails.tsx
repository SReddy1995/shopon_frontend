import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSelectedOrder } from "../../utils/reduxStore/orderSlice";
import { useCallback, useEffect, useState } from "react";
import { getOrderDetails } from "../../services/OrdersService";

const OrderDetails = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selected_order = useSelector((store: any) => store.order.selectedOrder);
    const [loading,setLoading] = useState(true)

    const navigateToOrderssList = () => {
        dispatch(updateSelectedOrder(null));
        navigate("/landing-page/orders/orders-list")
    }

    const fetchOrderDetails = useCallback(() => {
        let payload = {
            order_id: selected_order.order_id
        }
        getOrderDetails(payload)
            .then((data: any) => {
                if (data) {
                    console.log("order details = " , data)
                }
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
    },[selected_order.order_id])

    useEffect(() => {   
        fetchOrderDetails();
    },[fetchOrderDetails])

    return (
        <>
            {
                !loading && <div className="container-fluid h-auto mt-3 px-4">
                    <div className="row mt-1">
                        <div className="col-12 text-left d-flex">
                            <div>
                                <div className="d-flex">
                                    <div>
                                        <h4><span className='cursor-pointer d-flex'><i
                                            className='fa fa-arrow-circle-left me-2' onClick={navigateToOrderssList}></i>#{selected_order.order_id}</span></h4>
                                    </div>
                                    <div>
                                        <ul className="paid-grey pl-2">
                                            <li className="ms-0 bg-default-grey">Paid</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="paid-grey pl-2">
                                            <li className="ms-0 bg-default-warning">Unfullfilled</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-left">
                            <p className="text-default-grey"><span>Transaction Id : </span>12345678 <span>|</span> <span>Shopify Order Id : 765486</span> <span>|</span> <span>December 10, 2024 at 8:32 am from Eazehub</span></p>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 order-summary-container">
                                    <div className="order-details-left-column">
                                        <div className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-2">
                                            <div className="seller-wise-order-info">
                                                <ul className="paid-grey d-flex pl-0">
                                                    <span className="me-2 mt-1"><i className="fa fa-dot-circle-o"></i></span><h4>#1102-01</h4>
                                                    <li className="ms-2 bg-default-warning">Unfullfilled(1)</li>
                                                    <li className="ms-2 bg-default-grey">Status</li>
                                                </ul>
                                                <button type="button" className="btn-custom">
                                                    More Actions<i className="fa fa-caret-down ms-2"></i>
                                                </button>
                                            </div>
                                            <div className="provider-seller-info-container">
                                                <div className="provider-container p-2">
                                                    <div>
                                                        <span className="text-grey">Provider Name : </span>
                                                        <span className="text-default">Zippy Now</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-grey">Phone : </span>
                                                        <span className="text-default">+91 9990897979</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-grey">Website / Location : </span>
                                                        <span className="text-default">www.ondc.com</span>
                                                    </div>
                                                </div>
                                                <div className="seller-container p-2">
                                                    <div>
                                                        <span className="text-grey">Seller Name : </span>
                                                        <span className="text-default">Zippy Now</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-grey">Phone : </span>
                                                        <span className="text-default">+91 9990897979</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-grey">Location : </span>
                                                        <span className="text-default">Bengaluru</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-shipping-details-container">
                                                <div className="shipping-details-container p-2">
                                                    <div>
                                                        <span className="text-grey">Delivery method : </span>
                                                        <span className="text-default">Standard shipping</span>
                                                    </div>

                                                    <div>
                                                        <span className="text-grey">Shipping profile : </span>
                                                        <span className="text-default">General profile</span>
                                                    </div>
                                                </div>
                                                <div className="product-details-container">
                                                    <div className="table-responsive">
                                                        <table id="example" className="table table-hover text-left" data-paging='false' >
                                                            <thead className="table-light">
                                                                <tr>


                                                                    <th colSpan={3} className="border-bottom-none"></th>
                                                                    <th colSpan={3} className="text-center border-bottom-none">Charges</th>
                                                                    <th colSpan={2} className="border-bottom-none"></th>

                                                                </tr>


                                                                <tr>

                                                                    <th style={{ width: "85%" }} >Product Details</th>
                                                                    <th className="text-center">Price</th>
                                                                    <th className="text-center">Qty</th>
                                                                    <th className="text-center">Pkg</th>
                                                                    <th className="text-center">Conv</th>
                                                                    <th className="text-center">Delivery</th>
                                                                    <th className="text-center">Tax</th>
                                                                    <th className="text-center">Total</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>


                                                                    <td> <span><b>Wheat</b><span className="item-status-success ms-2">Fullfilled</span><br /></span>
                                                                        <span className="font-small text-grey">SKU: 460615e5-2f0f-4369-8e82-82ef2788924c</span><br />
                                                                        <span className="font-small text-grey">Alt Id: 460615e5-2f0f</span> <span className="font-small text-grey"> | </span>
                                                                        <span className="font-small text-grey">Tracking Id: <span className="anchor-text cursor-pointer">#460615e5-2f0f</span></span></td>
                                                                    <td>₹285.00</td>
                                                                    <td className="text-center">100</td>
                                                                    <td className="text-center">₹15</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-right">₹324.00</td>

                                                                </tr>
                                                                <tr>


                                                                    <td> <span><b>Apple</b><span className="item-status ms-2">Unfullfilled</span><br /></span>
                                                                        <span className="font-small text-grey">SKU: 460615e5-2f0f-4369-8e82-82ef2788924c</span><br />
                                                                        <span className="font-small text-grey">Alt Id: 460615e5-2f0f</span></td>
                                                                    <td>₹299.00</td>
                                                                    <td className="text-center">25</td>
                                                                    <td className="text-center">₹15</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-center">₹10</td>
                                                                    <td className="text-right">₹24.00</td>

                                                                </tr>
                                                                <tr>


                                                                    <td> <span><b>Sweatshirt for women</b><span className="item-status-success ms-2">Fullfilled</span><br /></span>
                                                                        <span className="font-small text-grey">SKU: 460615e5-2f0f-4369-8e82-82ef2788924c</span><br />
                                                                        <span className="font-small text-grey">Alt Id: 460615e5-2f0f</span><span className="font-small text-grey"> | </span>
                                                                        <span className="font-small text-grey">Tracking Id: <span className="anchor-text cursor-pointer">#460615e5-2f0f</span></span></td>
                                                                    <td>₹359.00</td>
                                                                    <td className="text-center">10</td>
                                                                    <td className="text-center">₹1500</td>
                                                                    <td className="text-center">₹10000</td>
                                                                    <td className="text-center">₹1000</td>
                                                                    <td className="text-center">₹1000</td>
                                                                    <td className="text-right">₹1324.00</td>

                                                                </tr>




                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="totals-container">
                                                        <div className="totals-info p-2">
                                                            <div>
                                                                <span className="text-grey">Sub Total : </span>
                                                                <span className="text-default">₹980.00</span>
                                                            </div> 
                                                        </div>
                                                        <div className="totals-info p-2">
                                                            <div>
                                                                <span className="text-grey">Shipping charges : </span>
                                                                <span className="text-default">₹250.00</span>
                                                            </div> 
                                                        </div>
                                                        <div className="totals-info p-2">
                                                            <div>
                                                                <span className="text-grey">Total : </span>
                                                                <span className="text-default"><b>₹1230.00</b></span>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-details-right-column border">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        }

        </>
    ) 

}

export default OrderDetails;