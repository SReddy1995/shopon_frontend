import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  getReturnDetails
} from "../../services/OrdersService";
import ondc_product from "../../assets/images/ondc-icon.png";
import {
  ondcReturnStatus,
  renderFulfillmentButtons
} from "../../utils/functions/StatusButtonsMapping";
import moment from 'moment';

const RefundDetails = () => {
  const navigate = useNavigate();
  const orderInfoFromRedux = useSelector((store: any) => store.seller.selectedOrderInfo);
  const selected_order_info = orderInfoFromRedux
    ? orderInfoFromRedux
    : localStorage.getItem("selected_order_info")
    ? JSON.parse(localStorage.getItem("selected_order_info")!)
    : null;
  const sellerFromRedux = useSelector(
    (store: any) => store.seller.selectedSeller
  );
  const selected_seller = sellerFromRedux
    ? sellerFromRedux
    : localStorage.getItem("selected_seller")
    ? JSON.parse(localStorage.getItem("selected_seller")!)
    : null;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const refValues = useSelector((store: any) => store.refValues.referenceList);
  const [itemDetailsOpen, setItemDetailsOpen] = useState<any>(null);
  const [returnHistoryDetailsOpen, setReturnHistoryDetailsOpen] = useState<any>(null);
const fullfillment_status_list = refValues.fulfillment_status && refValues.fulfillment_status.length>0? refValues.fulfillment_status.map((status: any) => ({
    value: status.eazehubfulfillmentstatusref,
    label: status.description
})) : [];
const ondc_fullfillment_status_list = refValues.ondc_fulfillment_status && refValues.ondc_fulfillment_status.length>0 ? refValues.ondc_fulfillment_status.map((status: any) => ({
    value: status.ondcfulfillmentstateref,
    label: status.description
})) : [];

  const getFulfillmentStatus = (item: any) => {
    if (
      item &&
      fullfillment_status_list.filter((x: any) => x.value === item).length > 0
    ) {
      return fullfillment_status_list.filter((x: any) => x.value === item)[0]
        .label;
    }
    return "";
  };

const getOndcFulfillmentStatus = (item: any)=> {
    if(item && ondc_fullfillment_status_list.filter((x:any)=>x.value === item).length>0){
        return ondc_fullfillment_status_list.filter((x:any)=>x.value === item)[0].label
    }
    return ''
}

  const navigateToOrderDetails = () => {
    navigate("/landing-page/orders/order-details");
  };

  const formatCurrency = (price: any, curr: any = 'INR') => {
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr }).format(price);
    return formattedPrice.includes('.00') ? formattedPrice.split('.')[0] : formattedPrice;
};

  const formatResponse = (data: any) => {
    if(data.length>0){
        data = data.map((item: any) => {
            return {
                ...item,
                status: ondcReturnStatus.filter((x: any)=> x.key === item.status)[0].short_desc,
                price: item.quote && item.quote.length>0 ? formatCurrency(Math.abs(item.quote.filter((x: any) => x.code === "value")[0].value), 'INR') : '-',
                createdAt: moment(item.createdAt).format("DD/MM/YYYY"),
                statusHistory: item.statusHistory
                .map((status: any) => ({
                    ...status,
                    createdAt: moment(status.createdAt).format("DD MMMM YYYY h:mm A"),
                    status: ondcReturnStatus.filter((x: any)=> x.key === status.status)[0].long_desc
            }))
            }
        })
    }
    setData(data);
  };

  const toggleItemDetails = (item: any) => {
    if (itemDetailsOpen === item.store_item_id) {
      setItemDetailsOpen(null);
    } else {
      setItemDetailsOpen(item.store_item_id);
    }
  };

  const toggleReturnDetails = (item: any) => {
    if (returnHistoryDetailsOpen === item.return_id) {
      setReturnHistoryDetailsOpen(null);
    } else {
      setReturnHistoryDetailsOpen(item.return_id);
    }
  };

  const fetchReturnDetails = useCallback(() => {
    setLoading(true);
    const payload = { order_seller_seq: selected_seller.order_seller_seq};
    getReturnDetails(payload)
        .then((data: any) => {
            if (data) formatResponse(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  if (selected_seller) {
    fetchReturnDetails();
  } else {
    navigate("/landing-page/orders/order-details");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [fetchReturnDetails, navigate]);

  return (
    <>
      {!loading && (
        <div className="container-fluid h-auto mt-3 px-3">
          <div className="row mt-1">
            <div className="col-12 text-left d-flex">
              <div>
                <div className="d-flex">
                  <div>
                    <h4>
                      <span className="cursor-pointer d-flex">
                        <span
                          className="back-btn me-1"
                          onClick={navigateToOrderDetails}
                        >
                          <i className="fa fa-arrow-left me-2 fa-left-icon"></i>
                        </span>
                        Return Details
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 text-left refund-info">
              <p className="text-default-grey">
                <span>#{selected_seller.order_seller_seq}</span>
              </p>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-12 order-summary-container">
                  <div className="order-details-left-column">
                    {/* seller cards starts here for loop */}
                    {
                      selected_seller.order_seller_seq && (
                              <div
                                key={selected_seller.order_seller_seq}
                                className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3"
                              >
                               
                                {selected_seller.is_ondc_product && (
                                  <div className="seller-wise-statuses-container pt-3">
                                    {
                                      selected_seller.fulfillment_status && (
                                        <>
                                        <span className="status-label ml-0">Fulfillment </span>
                                        <p
                                          className={
                                            renderFulfillmentButtons(
                                              selected_seller.fulfillment_status
                                            ) +
                                            " ml-1 mb-0 custom-rounded-border"
                                          }
                                        >
                                          {getFulfillmentStatus(
                                            selected_seller.fulfillment_status
                                          )}
                                        </p>
                                        </>
                                      )
                                    }
                                  </div>
                                )}
                                {selected_seller.seller_id !== "shopify" && (
                                  <div className="provider-seller-info-container px-2 py-2">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        {selected_seller?.seller_name !==
                                          selected_seller?.provider_info?.name && (
                                          <div className="d-flex justify-content-between">
                                            <span>{selected_seller?.seller_name} </span>
                                          </div>
                                        )}

                                        <div className="d-flex justify-content-between">
                                          <span className=" mb-0">
                                            {selected_seller?.provider_info?.name}:{" "}
                                            <span className="text-grey">
                                              {selected_seller?.provider_info?.id}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                          <span>
                                            {selected_seller?.provider_info?.address}
                                          </span>
                                        </div>
                                      </div>
                                      {selected_seller.is_ondc_product && (
                                        <div>
                                          <img
                                            src={ondc_product}
                                            style={{ width: "38px" }}
                                            alt="ondc_product"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                <div className="product-detail-table-container">
                                  <div
                                    className="table-responsive "
                                    style={{ borderRadius: "0.75rem" }}
                                  >
                                    <table
                                      id="example"
                                      className="table text-left orders-table-custom"
                                      data-paging="false"
                                    >
                                      <thead className="table-light">
                                        <tr>
                                          <th
                                            colSpan={3}
                                            className="border-bottom-none"
                                          >
                                            Original order
                                          </th>
                                          <th
                                            colSpan={3}
                                            className="text-center border-bottom-none"
                                          >
                                            Charges in ₹
                                          </th>
                                          <th
                                            colSpan={2}
                                            className="border-bottom-none"
                                          ></th>
                                        </tr>

                                        <tr>
                                          <th style={{ width: "85%" }}>
                                            Product
                                          </th>
                                          <th>Price</th>
                                          <th>Qty</th>
                                          <th>Pkg</th>
                                          <th>Conv</th>
                                          <th>Delivery</th>
                                          <th>Tax</th>
                                          <th>Total</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {selected_seller.items.map(
                                          (item: any, index: number) => {
                                            return (
                                              <tr key={item.name + index}>
                                                <td>
                                                  <span>
                                                    <b
                                                      onClick={() =>
                                                        toggleItemDetails(item)
                                                      }
                                                      className="cursor-pointer"
                                                    >
                                                      {item.name}
                                                    </b>
                                                    {selected_seller.is_ondc_product &&
                                                      item.fulfillment_status && (
                                                        <span
                                                          className={
                                                            renderFulfillmentButtons(
                                                              item.fulfillment_status
                                                            ) +
                                                            " ml-1 mb-0 custom-rounded-border"
                                                          }
                                                        >
                                                          {getOndcFulfillmentStatus(
                                                            item.fulfillment_status
                                                          )}
                                                        </span>
                                                      )}
                                                  </span>
                                                  <br />
                                                  {itemDetailsOpen ===
                                                    item.store_item_id && (
                                                    <>
                                                      <span className="font-small text-grey">
                                                        SKU: {item.sku}
                                                      </span>
                                                      <br />
                                                      {item.alt_id && (
                                                        <span className="font-small text-grey">
                                                          Alt Id: {item.alt_id}
                                                        </span>
                                                      )}
                                                    </>
                                                  )}
                                                </td>
                                                <td>{item.price}</td>
                                                <td className="text-centre">
                                                  {item.qty}
                                                </td>
                                                <td className="text-centre">
                                                  {item.pkg_charge}
                                                </td>
                                                <td className="text-centre">
                                                  {item.convenience_fee}
                                                </td>
                                                <td className="text-centre">
                                                  {item.delivery_charge}
                                                </td>
                                                <td className="text-centre">
                                                  {item.tax}
                                                </td>
                                                <td className="text-right">
                                                  {item.total}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="seller-wise-totals-container">
                                    <div className="totals-labels">
                                      <span className="text-grey">
                                        Sub Total:{" "}
                                      </span>
                                      <span className="text-grey">
                                        Shipping charges:{" "}
                                      </span>
                                      <span className="text-grey">Taxes: </span>
                                      <div className="dropdown-divider total-label-divider w-100 my-0"></div>
                                      <span className="text-grey total-span">
                                        Total:{" "}
                                      </span>
                                    </div>
                                    <div className="totals-values">
                                      <span className="text-default">
                                        {selected_seller.subTotal}
                                      </span>
                                      <span className="text-default">
                                        {selected_seller.shipping_charges}
                                      </span>
                                      <span className="text-default">
                                        {selected_seller.taxes}
                                      </span>
                                      <div className="dropdown-divider total-divider w-100 my-0 "></div>
                                      <span className="text-default total-span">
                                        {selected_seller.total}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                    }
                    <div className="card-orders shadow bg-white mb-3 pt-3 pb-1 px-3">
                      <div className="seller-wise-order-info">
                        <h4 className="seller-order-id mb-0">Return History</h4>
                      </div>

                      <div className="d-flex mt-2 mb-2">
                        <div
                          className="card-orders seller-card-container shadow bg-white mb-0"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="table-responsive "
                            style={{ borderRadius: "0.75rem" }}
                          >
                            <table
                              id="example"
                              className="table text-left orders-table-custom"
                              data-paging="false"
                            >
                              <thead className="table-light">
                                <tr>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "170px",
                                    }}
                                  >
                                    Return Id
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "170px",
                                    }}
                                  >
                                    Item Name
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "150px",
                                    }}
                                    className="text-centre"
                                  >
                                    Qty
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "150px",
                                    }}
                                    className="text-centre"
                                  >
                                    Price
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "150px",
                                    }}
                                    className="text-centre"
                                  >
                                    Date
                                  </th>
                                  <th
                                    style={{
                                      padding: "0.375rem",
                                      minWidth: "150px",
                                    }}
                                    className="text-centre"
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  data && data.length>0 && <>
                                  {
                                    data.map((item: any, index: number) => {
                                      return (
                                        <>
                                        <tr key={item.return_id + index} onClick={() =>
                                                toggleReturnDetails(item)
                                              } className="cursor-pointer">
                                          <td>
                                            <span>
                                                {item.return_id}
                                            </span>
                                            <br />
                                          </td>
                                          <td>{item.item_name}</td>
                                          <td className="text-centre">
                                            {item.quantity}
                                          </td>
                                          <td className="text-centre">
                                            {item.price}
                                          </td>
                                          <td className="text-centre">
                                            {item.createdAt}
                                          </td>
                                          <td className="text-centre">
                                            {item.status}
                                          </td>
                                        </tr>
                                        {
                                          item.statusHistory && item.statusHistory.length>0 && returnHistoryDetailsOpen === item.return_id && <tr>
                                          <td colSpan={6} style={{borderTop:"none"}}>
                                            <div className="history-tl-container px-3">
                                              <ul className="tl ms-2 custom-timeline">
                                                {
                                                  item.statusHistory.map((status: any, index: number) => {
                                                    return (
                                                      <li
                                                        key={status.createdAt + index}
                                                        className={index === 0 ? "tl-item active" : "tl-item"}
                                                      >
                                                        <div className="timestamp">
                                                          {status.createdAt}
                                                        </div>
                                                        <div className="item-detail">
                                                          {status.status}
                                                        </div>
                                                      </li>
                                                    );
                                                  })
                                                }
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>
                                        }
                                          
                                        </>
                                      );
                                    })
                                  }
                                  </>
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selected_order_info && (
                    <div className="order-details-right-column">
                      <div
                        className="card-orders bg-white text-left shadow  mb-1 pt-3 pb-1 px-3"
                        style={{ backgroundColor: "#5CBCE652 !important" }}
                      >
                        <div className="d-flex cust-divider">
                          <div>
                            <h6>
                              <b>Customer Information</b>
                            </h6>
                          </div>
                          <div>
                            <span>
                              <i className="fa fa-user"></i>
                            </span>
                          </div>
                        </div>

                        <span className="cust-name">
                          {selected_order_info.customer_info?.first_name}{" "}
                          {selected_order_info.customer_info?.last_name}
                        </span>
                        <br />
                        <span className="text-grey">
                          <i className="fa fa-envelope"></i>{" "}
                          {selected_order_info.customer_info?.email
                            ? selected_order_info.customer_info?.email
                            : "No email provided"}
                        </span>
                        <br />
                        <p className="mb-0">
                          {selected_order_info.customer_info?.address1 && (
                            <span>{selected_order_info.customer_info?.address1},</span>
                          )}
                          {selected_order_info.customer_info?.address2 && (
                            <span> {selected_order_info.customer_info?.address2},</span>
                          )}
                        </p>
                        {selected_order_info.customer_info?.city && (
                          <p className="mb-0">
                            {selected_order_info.customer_info?.city},{" "}
                            {selected_order_info.customer_info?.state}
                          </p>
                        )}
                        {selected_order_info.customer_info?.areacode && (
                          <p>{selected_order_info.customer_info?.areacode}</p>
                        )}
                      </div>
                      <div className="card-orders  text-left shadow bg-white mb-1 pt-3 pb-1 px-3">
                        <div className="d-flex cust-divider">
                          <div>
                            <h6>
                              <b>Shipping Address</b>
                            </h6>
                          </div>
                          <div>
                            <span>
                              <i className="fa fa-map-marker"></i>
                            </span>
                          </div>
                        </div>
                        {selected_order_info.shipping_info?.name && (
                          <p className="mb-0">
                            {selected_order_info.shipping_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {selected_order_info.shipping_info?.address1 && (
                            <span>{selected_order_info.shipping_info?.address1},</span>
                          )}
                          {selected_order_info.shipping_info?.address2 && (
                            <span> {selected_order_info.shipping_info?.address2},</span>
                          )}
                        </p>
                        {selected_order_info.shipping_info?.city && (
                          <p className="mb-0">
                            {selected_order_info.shipping_info?.city},{" "}
                            {selected_order_info.shipping_info?.province}
                          </p>
                        )}
                        {selected_order_info.shipping_info?.country && (
                          <p>
                            {selected_order_info.shipping_info?.country} -{" "}
                            {selected_order_info.shipping_info?.zip}
                          </p>
                        )}
                      </div>
                      <div className="card-orders text-left shadow bg-white mb-3  pt-3 pb-1 px-3">
                        <div className="d-flex cust-divider">
                          <div>
                            <h6>
                              <b>Payment Details</b>
                            </h6>
                          </div>
                          <div>
                            <span>
                              <i className="fa fa-credit-card"></i>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-default-black">
                            {selected_order_info.payment_gateway.join(", ")}
                          </span>
                        </div>

                        <br />
                        <h6>
                          <b>Billing Address</b>
                        </h6>
                        {selected_order_info.billing_info?.name && (
                          <p className="mb-0">
                            {selected_order_info.billing_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {selected_order_info.billing_info?.address1 && (
                            <span>{selected_order_info.billing_info?.address1},</span>
                          )}
                          {selected_order_info.billing_info?.address2 && (
                            <span> {selected_order_info.billing_info?.address2},</span>
                          )}
                        </p>
                        {selected_order_info.billing_info?.city && (
                          <p className="mb-0">
                            {selected_order_info.billing_info?.city},{" "}
                            {selected_order_info.billing_info?.province}
                          </p>
                        )}
                        {selected_order_info.billing_info?.country && (
                          <p>
                            {selected_order_info.billing_info?.country} -{" "}
                            {selected_order_info.billing_info?.zip}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefundDetails;
