const OrderSummary = (props: any) => {
    return (
        <div className="product-shipping-details-container mt-0 mb-0">
                                                <div className="product-details-container">
                                                    <div className="totals-container">
                                                        <div className="order-summary-totals-info border-top-0 pl-2 pr-2 pt-2 mb-0 pb-0">
                                                                <span className="text-grey title-column">Subtotal </span>
                                                                <span className="text-left description-column">{props.order_summary.itemsCount} items</span>
                                                                <span className="text-default value-column">{props.order_summary.subTotal}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 pl-2 pr-2 pt-2 mb-0 pb-0">
                                                                <span className="text-grey title-column">Shipping </span>
                                                                <span className="text-left description-column">Standard Shipping (0.0 kg: Items 0.0 kg, Package 0.0 kg)</span>
                                                                <span className="text-default value-column">{props.order_summary.shipping_charges}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 pl-2 pr-2 pt-2 mb-0 pb-0">
                                                                <span className="text-grey title-column">Taxes </span>
                                                                <span className="text-align-left description-column">Tax details</span>
                                                                <span className="text-default value-column">{props.order_summary.taxes}</span>
                                                        </div>
                                                        <div className="order-summary-totals-info border-top-0 pl-2 pr-2 pt-2 mb-0 pb-2">
                                                                <span className="text-grey title-column"><b>Total</b> </span>
                                                                <span className="text-default value-column"><b>{props.order_summary.total}</b></span>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>
    );
}

export default OrderSummary;