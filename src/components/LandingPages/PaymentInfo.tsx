const PaymentInfo = (props: any) => {
    return (
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
                            {props.order_info.payment_gateway.join(", ")}
                          </span>
                        </div>

                        <br />
                        <h6>
                          <b>Billing Address</b>
                        </h6>
                        {props.order_info.billing_info?.name && (
                          <p className="mb-0">
                            {props.order_info.billing_info?.name},
                          </p>
                        )}
                        <p className="mb-0">
                          {props.order_info.billing_info?.address1 && (
                            <span>{props.order_info.billing_info?.address1},</span>
                          )}
                          {props.order_info.billing_info?.address2 && (
                            <span> {props.order_info.billing_info?.address2},</span>
                          )}
                        </p>
                        {props.order_info.billing_info?.city && (
                          <p className="mb-0">
                            {props.order_info.billing_info?.city},{" "}
                            {props.order_info.billing_info?.province}
                          </p>
                        )}
                        {props.order_info.billing_info?.country && (
                          <p>
                            {props.order_info.billing_info?.country} -{" "}
                            {props.order_info.billing_info?.zip}
                          </p>
                        )}
                      </div>
    )
}

export default PaymentInfo;