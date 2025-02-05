const ShippingInfo = (props: any) => {

    return (
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
                        {props.order_info.shipping_info?.name && (
                          <p className="mb-0">
                            {props.order_info.shipping_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {props.order_info.shipping_info?.address1 && (
                            <span>{props.order_info.shipping_info?.address1},</span>
                          )}
                          {props.order_info.shipping_info?.address2 && (
                            <span> {props.order_info.shipping_info?.address2},</span>
                          )}
                        </p>
                        {props.order_info.shipping_info?.city && (
                          <p className="mb-0">
                            {props.order_info.shipping_info?.city},{" "}
                            {props.order_info.shipping_info?.province}
                          </p>
                        )}
                        {props.order_info.shipping_info?.country && (
                          <p>
                            {props.order_info.shipping_info?.country} -{" "}
                            {props.order_info.shipping_info?.zip}
                          </p>
                        )}
                      </div>
    );
    }

export default ShippingInfo;