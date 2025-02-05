const CustomerInfo = (props: any) => {

    return (
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
                {props.order_info.customer_info?.first_name}{" "}
                {props.order_info.customer_info?.last_name}
            </span>
            <br />
            <span className="text-grey">
                <i className="fa fa-envelope"></i>{" "}
                {props.order_info.customer_info?.email
                    ? props.order_info.customer_info?.email
                    : "NA"}
            </span>
            <span className="text-grey">
                <i className="fa fa-phone"></i>{" "}
                {props.order_info.customer_info?.phone
                    ? props.order_info.customer_info?.phone
                    : "NA"}
            </span>
            <br />
            <p className="mb-0">
                {props.order_info.customer_info?.address1 && (
                    <span>{props.order_info.customer_info?.address1},</span>
                )}
                {props.order_info.customer_info?.address2 && (
                    <span> {props.order_info.customer_info?.address2},</span>
                )}
            </p>
            {props.order_info.customer_info?.city && (
                <p className="mb-0">
                    {props.order_info.customer_info?.city},{" "}
                    {props.order_info.customer_info?.state}
                </p>
            )}
            {props.order_info.customer_info?.areacode && (
                <p>{props.order_info.customer_info?.areacode}</p>
            )}
        </div>
    )

}

export default CustomerInfo;