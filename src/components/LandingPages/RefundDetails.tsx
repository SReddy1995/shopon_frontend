import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import {
  getOrderDetails,
  getUpdatedStatusesForOrder,
} from "../../services/OrdersService";
import ModalWindow from "./ModalWindow";
import ReconciliationDetails from "./ReconciliationDetails";
import ondc_product from "../../assets/images/ondc-icon.png";
import TrackingDetails from "./TrackingDetails";
import SettleDetails from "./SettleDetails";
import {
  renderFulfillmentButtons,
  renderOrderStatusButtons,
  renderSettlementStatusButtons,
} from "../../utils/functions/StatusButtonsMapping";

const RefundDetails = () => {
  const navigate = useNavigate();
  const orderFromRedux = useSelector((store: any) => store.order.selectedOrder);
  const selected_order = orderFromRedux
    ? orderFromRedux
    : localStorage.getItem("selected_order")
    ? JSON.parse(localStorage.getItem("selected_order")!)
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
  // const [noData, setNoData] = useState(false)
  const [open, setModalOpen] = useState(false);
  const [openTrackModal, setTrackModalOpen] = useState(false);
  const [openSettleModal, setSettleModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const refValues = useSelector((store: any) => store.refValues.referenceList);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [itemDetailsOpen, setItemDetailsOpen] = useState<any>(null);
  const status_list =
    refValues.order_status.map((status: any) => ({
      value: status.eazehuborderstatusref,
      label: status.description,
    })) || [];
  const fullfillment_status_list =
    refValues.fulfillment_status.map((status: any) => ({
      value: status.eazehubfulfillmentstatusref,
      label: status.description,
    })) || [];
  const settlement_status_list =
    refValues.settlement_status.map((status: any) => ({
      value: status.eazehubsettlementstatusref,
      label: status.description,
    })) || [];

  const getOrderStatus = (item: any) => {
    if (item) {
      return status_list.filter((x: any) => x.value === item)[0].label;
    }
    return "";
  };

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

  const getSettlementStatus = (item: any) => {
    if (item) {
      return settlement_status_list.filter((x: any) => x.value === item)[0]
        .label;
    }
    return "";
  };

  const closeReconciliationWindow = () => {
    setModalOpen(false);
  };

  const navigateToOrderDetails = () => {
    navigate("/landing-page/orders/order-details");
  };

  const getRowTotal = (ele: any) => {
    const {
      store_item_price,
      store_item_quantity,
      packing_charge,
      convenience_fee,
      delivery_charge,
      quote_info,
    } = ele;
    let sum =
      (store_item_price && store_item_quantity
        ? Number(store_item_price) * Number(store_item_quantity)
        : 0) +
      (packing_charge ? Number(packing_charge) : 0) +
      (convenience_fee ? Number(convenience_fee) : 0) +
      (delivery_charge ? Number(delivery_charge) : 0);
    if (quote_info?.breakup?.length) {
      const tax = quote_info.breakup.find((item: any) => item.title === "Tax");
      if (tax) sum += Number(tax.price.value);
    }
    return sum;
  };

  const getPriceOfItem = (ele: any) =>
    ele.store_item_price && ele.store_item_quantity
      ? Number(ele.store_item_price) * Number(ele.store_item_quantity)
      : 0;

  const getShippingOfItem = (ele: any) => {
    const { packing_charge, convenience_fee, delivery_charge } = ele;
    return (
      (packing_charge ? Number(packing_charge) : 0) +
      (convenience_fee ? Number(convenience_fee) : 0) +
      (delivery_charge ? Number(delivery_charge) : 0)
    );
  };

  const getTaxOfItem = (ele: any) => {
    if (ele.quote_info?.breakup?.length) {
      const tax = ele.quote_info.breakup.find(
        (item: any) => item.title === "Tax"
      );
      return tax ? Number(tax.price.value) : 0;
    }
    return 0;
  };

  const formatCurrency = (price: any, curr: any = "INR") => {
    const formattedPrice = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: curr,
    }).format(price);
    return formattedPrice.includes(".00")
      ? formattedPrice.split(".")[0]
      : formattedPrice;
  };

  const getTax = (ele: any) => {
    if (ele.quote_info?.breakup?.length) {
      const tax = ele.quote_info.breakup.find(
        (item: any) => item.title === "Tax"
      );
      return tax?.price.value || 0;
    }
    return 0;
  };

  const getItemsFormatted = (itemsList: any) =>
    itemsList.map((ele: any) => ({
      store_item_id: ele.store_item_id || null,
      name: ele.store_item_title || null,
      fulfillment_status: ele.fulfillment_state || null,
      sku: ele.store_item_sku || "NA",
      alt_id: ele.alternate_id || null,
      tracking_id: ele.tracking_number || "NA",
      price: ele.store_item_price ? ele.store_item_price : 0,
      qty: ele.store_item_quantity || 0,
      pkg_charge: ele.packing_charge ? ele.packing_charge : 0,
      convenience_fee: ele.convenience_fee ? ele.convenience_fee : 0,
      delivery_charge: ele.delivery_charge ? ele.delivery_charge : 0,
      tax: getTax(ele),
      total: getRowTotal(ele),
    }));

  const getSubTotalSellerWise = (itemsList: any) =>
    itemsList.reduce((sum: number, ele: any) => sum + getPriceOfItem(ele), 0);

  const getShippingChargesSellerWise = (itemsList: any) =>
    itemsList.reduce(
      (sum: number, ele: any) => sum + getShippingOfItem(ele),
      0
    );

  const getTotalSellerWise = (itemsList: any) =>
    itemsList.reduce(
      (sum: number, ele: any) =>
        sum + getPriceOfItem(ele) + getShippingOfItem(ele),
      0
    );

  const getTaxSellerWise = (itemsList: any) =>
    itemsList.reduce((sum: number, ele: any) => sum + getTaxOfItem(ele), 0);

  const getFormattedAddress = (address: any) => {
    let formattedAddress = "";
    let concatenator = "";
    if (address?.street) {
      formattedAddress += concatenator + address.street;
      concatenator = ", ";
    }
    if (address?.locality) {
      formattedAddress += concatenator + address.locality;
      concatenator = ", ";
    }
    if (address?.city) {
      formattedAddress += concatenator + address.city;
      concatenator = ", ";
    }
    if (address?.state) {
      formattedAddress += concatenator + address.state;
      concatenator = ", ";
    }
    if (address?.area_code) {
      formattedAddress += concatenator + address.area_code;
      concatenator = ", ";
    }
    return formattedAddress;
  };

  const getProviderInfo = (seller: any) => {
    let obj: any = {};
    if (seller?.bpp_provider_info) {
      obj["id"] = seller.bpp_provider_info.id;
    }
    if (seller?.bpp_provider_info?.descriptor?.name) {
      obj["name"] = seller.bpp_provider_info.descriptor.name;
    }
    if (seller?.bpp_provider_info?.locations?.length > 0) {
      if (seller.bpp_provider_info.locations[0].address) {
        obj["address"] = getFormattedAddress(
          seller.bpp_provider_info.locations[0].address
        );
      }
    }
    return obj;
  };

  const formatResponse = (data: any) => {
    let sellers: any = [];
    let order_summary_subTotal = 0;
    let order_summary_shipping_charges = 0;
    let taxes = 0;
    let itemsCount = 0;

    if (data?.seller?.length > 0) {
      data.seller.forEach((element: any, index: any) => {
        if (element.orderItemDetails.length > 0) {
          const subTotal = getSubTotalSellerWise(element.orderItemDetails);
          const shippingCharges = getShippingChargesSellerWise(
            element.orderItemDetails
          );
          const tax = getTaxSellerWise(element.orderItemDetails);
          const total = getTotalSellerWise(element.orderItemDetails);

          sellers.push({
            is_ondc_product: element.is_ondc_product || false,
            is_refund_initiated: true,
            ondc_order_state: element.ondc_order_state || null,
            fulfillment_status: element.eazehub_fulfillment_status || null,
            settlement_status: element.settlement_status || null,
            seller_id: element.seller_id || null,
            order_seller_seq: element.order_seller_seq,
            provider_info: getProviderInfo(element),
            seller_name: element.bpp_descriptor_info?.name || null,
            shipping_profile: element.shipping_profile || "NA",
            items: getItemsFormatted(element.orderItemDetails),
            subTotal: formatCurrency(subTotal, "INR"),
            shipping_charges: formatCurrency(shippingCharges, "INR"),
            taxes: formatCurrency(tax, "INR"),
            total: formatCurrency(total, "INR"),
          });

          itemsCount += element.orderItemDetails.length;
          order_summary_subTotal += subTotal;
          order_summary_shipping_charges += shippingCharges;
          taxes += tax;
        }
      });
    }

    const { seller, ...filteredValues } = data;

    let res = {
      info: filteredValues,
      sellers: sellers.sort((a: any, b: any) =>
        a.order_seller_seq.localeCompare(b.order_seller_seq)
      ),
      order_summary: {
        subTotal: formatCurrency(order_summary_subTotal, "INR"),
        itemsCount,
        shipping_charges: formatCurrency(order_summary_shipping_charges, "INR"),
        taxes: formatCurrency(taxes, "INR"),
        total: formatCurrency(
          order_summary_subTotal + order_summary_shipping_charges + taxes,
          "INR"
        ),
      },
    };
    setData(res);
  };

  const fetchOrderDetails = useCallback(() => {
    setLoading(true);
    const payload = { order_id: selected_order.order_id };
    getOrderDetails(payload)
      .then((data: any) => {
        if (data) formatResponse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selected_order && selected_seller) {
      fetchOrderDetails();
    } else {
      navigate("/landing-page/orders/order-details");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOrderDetails, navigate]);

  const toggleItemDetails = (item: any) => {
    if (itemDetailsOpen === item.store_item_id) {
      setItemDetailsOpen(null);
    } else {
      setItemDetailsOpen(item.store_item_id);
    }
  };

  const updateStatuses = (data: any) => {
    setData((prevData: any) => ({
      ...prevData,
      info: {
        ...prevData.info,
        fulfillment_status: data.fulfillment_status,
        order_status: data.order_status,
        settlement_status: data.settlement_status,
      },
      sellers: prevData.sellers.map((seller: any) => {
        const updatedSeller = data.seller.find(
          (s: any) => s.order_seller_seq === seller.order_seller_seq
        );
        return updatedSeller
          ? {
              ...seller,
              fulfillment_status: updatedSeller.eazehub_fulfillment_status,
              ondc_order_state: updatedSeller.ondc_order_state,
              settlement_status: updatedSeller.settlement_status,
              items: seller.items.map((item: any) => {
                const updatedItem = updatedSeller.orderItemDetails.find(
                  (i: any) => i.store_item_id === item.store_item_id
                );
                return updatedItem
                  ? {
                      ...item,
                      fulfillment_status: updatedItem.fulfillment_state,
                    }
                  : item;
              }),
            }
          : seller;
      }),
    }));
  };

  const fetchUpdatedStatuses = () => {
    const payload = { order_id: selected_order.order_id };
    getUpdatedStatusesForOrder(payload)
      .then((data: any) => {
        if (data) updateStatuses(data);
        setStatusUpdating(false);
      })
      .catch(() => setStatusUpdating(false));
  };

  const closeTrackBySellerWindow = () => {
    setSelectedSeller(null);
    setTrackModalOpen(false);
  };

  const closeSettleBySellerWindow = () => {
    setSelectedSeller(null);
    fetchUpdatedStatuses();
    setSettleModalOpen(false);
  };

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
                        Refund details
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
                    {data?.sellers?.length > 0 && (
                      <>
                        {data.sellers.map((seller: any, index: number) => {
                          return (
                            seller.order_seller_seq ===
                              selected_seller.order_seller_seq && (
                              <div
                                key={seller.order_seller_seq}
                                className="card-orders seller-card-container shadow bg-white mb-0 py-3 px-3"
                              >
                                {/* <div className="seller-wise-order-info" >
                                                        <ul className="paid-grey d-flex pl-0 mb-0">
                                                            
                                                            <h4 className="seller-order-id">#{seller.order_seller_seq}</h4>
                                                        </ul>
                                                    </div> */}
                                {seller.is_ondc_product && (
                                  <div className="seller-wise-statuses-container pt-3">
                                    {/* <span className="status-label ml-0">Order</span>

                                                                {
                                                                    statusUpdating ?
                                                                        <p
                                                                            className="ml-1 mb-0 product-active bg-default-grey  custom-rounded-border">
                                                                            ...
                                                                        </p>
                                                                        :
                                                                        seller.ondc_order_state && <p
                                                                            className={
                                                                                renderOrderStatusButtons(seller.ondc_order_state) + " ml-1 mb-0 custom-rounded-border"
                                                                            }>
                                                                            {getOrderStatus(seller.ondc_order_state)}
                                                                        </p>
                                                                }
                                                                <span style={{ marginLeft: "10px", color: "grey" }}> | </span>

                                                                <span className="status-label">Settlement </span>

                                                                {
                                                                    statusUpdating ?
                                                                        <p
                                                                            className="ml-1 mb-0 product-active bg-default-grey  custom-rounded-border">
                                                                            ...
                                                                        </p>
                                                                        :
                                                                        seller.settlement_status && <p
                                                                            className={
                                                                                renderSettlementStatusButtons(seller.settlement_status) + " ml-1 mb-0 custom-rounded-border"
                                                                            }>
                                                                            {getSettlementStatus(seller.settlement_status)}
                                                                        </p>
                                                                }
                                                                <span style={{ marginLeft: "10px", color: "grey" }}> | </span> */}

                                    {statusUpdating ? (
                                      <p className="ml-1 mb-0 product-active bg-default-grey  custom-rounded-border">
                                        ...
                                      </p>
                                    ) : (
                                      seller.fulfillment_status && (
                                        <p
                                          className={
                                            renderFulfillmentButtons(
                                              seller.fulfillment_status
                                            ) +
                                            " ml-1 mb-0 custom-rounded-border"
                                          }
                                        >
                                          {getFulfillmentStatus(
                                            seller.fulfillment_status
                                          )}
                                        </p>
                                      )
                                    )}
                                  </div>
                                )}
                                {seller.seller_id !== "shopify" && (
                                  <div className="provider-seller-info-container px-2 py-2">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        {seller?.seller_name !==
                                          seller?.provider_info?.name && (
                                          <div className="d-flex justify-content-between">
                                            <span>{seller?.seller_name} </span>
                                          </div>
                                        )}

                                        <div className="d-flex justify-content-between">
                                          <span className=" mb-0">
                                            {seller?.provider_info?.name}:{" "}
                                            <span className="text-grey">
                                              {seller?.provider_info?.id}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                          <span>
                                            {seller?.provider_info?.address}
                                          </span>
                                        </div>
                                      </div>
                                      {seller.is_ondc_product && (
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
                                        {seller.items.map(
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
                                                    {seller.is_ondc_product &&
                                                      statusUpdating && (
                                                        <span className="ml-2 product-active bg-default-grey  custom-rounded-border">
                                                          ...
                                                        </span>
                                                      )}
                                                    {seller.is_ondc_product &&
                                                      !statusUpdating &&
                                                      item.fulfillment_status && (
                                                        <span
                                                          className={
                                                            renderFulfillmentButtons(
                                                              item.fulfillment_status
                                                            ) +
                                                            " ml-1 mb-0 custom-rounded-border"
                                                          }
                                                        >
                                                          {getFulfillmentStatus(
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
                                        {seller.subTotal}
                                      </span>
                                      <span className="text-default">
                                        {seller.shipping_charges}
                                      </span>
                                      <span className="text-default">
                                        {seller.taxes}
                                      </span>
                                      <div className="dropdown-divider total-divider w-100 my-0 "></div>
                                      <span className="text-default total-span">
                                        {seller.total}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })}
                      </>
                    )}
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
                                    Quantity
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
                                <tr>
                                  <td>
                                    <span>
                                      <b className="cursor-pointer">
                                        #09865433
                                      </b>{" "}
                                    </span>
                                    <br />
                                  </td>
                                  <td>Plain Atta</td>
                                  <td className="text-centre">1</td>
                                  <td className="text-centre">12/10/23</td>
                                  <td className="text-centre">Completed</td>
                                </tr>
                                <tr>
                                  <td colSpan={5}>
                                    <div className="history-tl-container px-3">
                                      <ul className="tl ms-2 custom-timeline">
                                        <li
                                          className="tl-item"
                                          ng-repeat="item in retailer_history"
                                        >
                                          <div className="timestamp">
                                            3rd March 2015
                                            <br /> 7:00 PM
                                          </div>
                                          <div className="item-detail">
                                            Refund completed !!
                                          </div>
                                        </li>
                                        <li
                                          className="tl-item"
                                          ng-repeat="item in retailer_history"
                                        >
                                          <div className="timestamp">
                                            19th March 2015
                                            <br /> 3:00 PM
                                          </div>
                                          <div className="item-detail">
                                            Refund processed !!
                                          </div>
                                        </li>
                                        <li
                                          className="tl-item"
                                          ng-repeat="item in retailer_history"
                                        >
                                          <div className="timestamp">
                                            1st June 2015
                                            <br /> 7:00 PM
                                          </div>
                                          <div className="item-detail">
                                            Refund was initiated !!
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <span>
                                      <b className="cursor-pointer">#3009876</b>
                                    </span>
                                  </td>
                                  <td>Adidas</td>
                                  <td className="text-centre">1</td>
                                  <td className="text-centre">12/10/23</td>
                                  <td className="text-centre">Pending</td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <span>
                                      <b className="cursor-pointer">#3009876</b>
                                    </span>
                                  </td>
                                  <td>Wheat</td>
                                  <td className="text-centre">1</td>
                                  <td className="text-centre">12/10/23</td>
                                  <td className="text-centre">Completed</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {data?.info && (
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
                          {data.info.customer_info?.first_name}{" "}
                          {data.info.customer_info?.last_name}
                        </span>
                        <br />
                        <span className="text-grey">
                          <i className="fa fa-envelope"></i>{" "}
                          {data.info.customer_info?.email
                            ? data.info.customer_info?.email
                            : "No email provided"}
                        </span>
                        <br />
                        <p className="mb-0">
                          {data.info.customer_info?.address1 && (
                            <span>{data.info.customer_info?.address1},</span>
                          )}
                          {data.info.customer_info?.address2 && (
                            <span> {data.info.customer_info?.address2},</span>
                          )}
                        </p>
                        {data.info.customer_info?.city && (
                          <p className="mb-0">
                            {data.info.customer_info?.city},{" "}
                            {data.info.customer_info?.state}
                          </p>
                        )}
                        {data.info.customer_info?.areacode && (
                          <p>{data.info.customer_info?.areacode}</p>
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
                        {data.info.shipping_info?.name && (
                          <p className="mb-0">
                            {data.info.shipping_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {data.info.shipping_info?.address1 && (
                            <span>{data.info.shipping_info?.address1},</span>
                          )}
                          {data.info.shipping_info?.address2 && (
                            <span> {data.info.shipping_info?.address2},</span>
                          )}
                        </p>
                        {data.info.shipping_info?.city && (
                          <p className="mb-0">
                            {data.info.shipping_info?.city},{" "}
                            {data.info.shipping_info?.province}
                          </p>
                        )}
                        {data.info.shipping_info?.country && (
                          <p>
                            {data.info.shipping_info?.country} -{" "}
                            {data.info.shipping_info?.zip}
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
                            {data.info.payment_gateway.join(", ")}
                          </span>
                        </div>

                        <br />
                        <h6>
                          <b>Billing Address</b>
                        </h6>
                        {data.info.billing_info?.name && (
                          <p className="mb-0">
                            {data.info.billing_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {data.info.billing_info?.address1 && (
                            <span>{data.info.billing_info?.address1},</span>
                          )}
                          {data.info.billing_info?.address2 && (
                            <span> {data.info.billing_info?.address2},</span>
                          )}
                        </p>
                        {data.info.billing_info?.city && (
                          <p className="mb-0">
                            {data.info.billing_info?.city},{" "}
                            {data.info.billing_info?.province}
                          </p>
                        )}
                        {data.info.billing_info?.country && (
                          <p>
                            {data.info.billing_info?.country} -{" "}
                            {data.info.billing_info?.zip}
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
      <ModalWindow
        show={open}
        detailsOf={"reconciliation"}
        modalClosed={closeReconciliationWindow}
      >
        <ReconciliationDetails closeModal={closeReconciliationWindow} />
      </ModalWindow>
      <ModalWindow
        show={openTrackModal}
        detailsOf={"reconciliation"}
        modalClosed={closeTrackBySellerWindow}
      >
        <TrackingDetails
          seller={selectedSeller}
          selected_order={selected_order}
          closeModal={closeTrackBySellerWindow}
        />
      </ModalWindow>
      <ModalWindow
        show={openSettleModal}
        detailsOf={"reconciliation"}
        modalClosed={closeSettleBySellerWindow}
      >
        <SettleDetails
          seller={selectedSeller}
          selected_order={selected_order}
          closeModal={closeSettleBySellerWindow}
        />
      </ModalWindow>
    </>
  );
};

export default RefundDetails;
