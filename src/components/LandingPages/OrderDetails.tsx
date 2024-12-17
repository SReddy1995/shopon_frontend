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
                                        <div className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3">
                                            <div className="seller-wise-order-info">
                                                <ul className="paid-grey d-flex pl-0 mb-0">
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
                                                        <table id="example" className="table table-hover text-left orders-table-custom" data-paging='false' >
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
                                                                        <span className="font-small text-grey">Tracking Id: <span className="anchor-text-orders cursor-pointer">#460615e5-2f0f</span></span></td>
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
                                                                        <span className="font-small text-grey">Tracking Id: <span className="anchor-text-orders cursor-pointer">#460615e5-2f0f</span></span></td>
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
                                                                <span className="text-default">₹1230.00</span>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-orders order-summary-card-container shadow bg-white mb-3 py-3 px-3">
                                            <div className="seller-wise-order-info">
                                                <h4 className="mb-0">Order summary</h4>
                                            </div>
                                            <div className="product-shipping-details-container">
                                                <div className="product-details-container">
                                                    <div className="totals-container">
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Subtotal </span>
                                                                <span className="text-left description-column">2 items </span>
                                                                <span className="text-default value-column">₹980.00</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Shipping </span>
                                                                <span className="text-left description-column">Standard Shipping (0.0 kg: Items 0.0 kg, Package 0.0 kg)</span>
                                                                <span className="text-default value-column">₹250.00</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column">Taxes </span>
                                                                <span className="text-align-left description-column">Tax details</span>
                                                                <span className="text-default value-column"><b>₹1230.00</b></span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 p-2">
                                                                <span className="text-grey title-column"><b>Total</b> </span>
                                                                <span className="text-default value-column"><b>₹1230.00</b></span>
                                                        </div>
                                                        <div className="order-summary-totals-info p-2">
                                                                <span className="text-grey title-column">Paid </span>
                                                                <span className="text-default value-column"><b>₹1230.00</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-details-right-column">
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                            <h6><b>Customer</b></h6>

                                            <span className="cust-name">John Doe</span><br /><br />
                                            <span className="text-default-orders">Contact Information</span><br />
                                            <span className="text-grey">No email provided</span><br />
                                            <span className="cust-name">+91 9898979798</span><br /><br />
                                            <span className="text-default-orders">Shipping Address</span><br />
                                            <p>Sai Ranjan,<br /> Opteamix Technology Solutions LLP 42 27th Cross Road Banashankari Stage II Banashankari,<br /> A Block Ground Floor, <br />560070 Bengaluru Karnataka, India</p>

                                            <span className="text-default-orders">Billing Address</span><br />
                                            <span className="text-grey">Same as shipping address</span><br />
                                        </div>
                                        <div className="card-orders text-left shadow bg-white mb-3 py-3 px-3">
                                            <h6><b>Payment Details</b></h6>

                                            <div>
                                                <span className="text-grey">Transaction Id : </span>
                                                <span className="text-default-black">#1234fhtr5</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Type : </span>
                                                <span className="text-default-black">cash</span>
                                            </div>

                                            <div>
                                                <span className="text-grey">Payment Status : </span>
                                                <span className="text-default-black">Paid</span>
                                            </div>
                                        </div>
                                        <h6 className="text-left ml-2"><b>Timeline</b></h6>
                                        <div className="card-orders shadow bg-white mb-3 py-3 px-3">
                                            <div className="card-body p-3">

                                                <ul className="timeline">
                                                    <li className="timeline-item">
                                                        <div className="timeline-body">
                                                            <div className="timeline-meta">
                                                                <span>32 minutes</span>
                                                            </div>
                                                            <div className="timeline-content timeline-indicator">
                                                                <h6 className="mb-1">Amount received in the PayPal gateway.</h6>
                                                                <span className="text-secondary fs-7">User: William Lucas</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="timeline-item">
                                                        <div className="timeline-body">
                                                            <div className="timeline-meta">
                                                                <span>49 minutes</span>
                                                            </div>
                                                            <div className="timeline-content timeline-indicator">
                                                                <h6 className="mb-1">New sale recorded in the Eazehub.</h6>
                                                                <span className="text-secondary fs-7">Product: Console</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="timeline-item">
                                                        <div className="timeline-body">
                                                            <div className="timeline-meta">
                                                                <span>2 hours</span>
                                                            </div>
                                                            <div className="timeline-content timeline-indicator">
                                                                <h6 className="mb-1">User registered in the discount campaign.</h6>
                                                                <span className="text-secondary fs-7">Country: United States</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="timeline-item">
                                                        <div className="timeline-body">
                                                            <div className="timeline-meta">
                                                                <span>19 hours</span>
                                                            </div>
                                                            <div className="timeline-content timeline-indicator">
                                                                <h6 className="mb-1">Ticket created about the SSL certificate of the domain.</h6>
                                                                <span className="text-secondary fs-7">Issue: Technical</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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