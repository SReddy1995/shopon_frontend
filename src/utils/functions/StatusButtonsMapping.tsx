export const renderSettlementStatusButtons = (data: any) => {
    let btn = ''
    btn = data === "INITIATED" || data === "PARTIAL" || data === "PENDING" ? "product-draft" : 
    data === "SETTLED" ? "product-active" :
    data === "NOT_SETTLED" ? "product-danger" : ""
    return btn
}

export const renderOrderStatusButtons = (data: any) => {
    let btn = '';
    btn = data === "CREATED" || data === "INPROGRESS" || data === "PARTIAL" ? "product-draft" : 
    data === "COMPLETED" ||  data === "ACCEPTED" ? " product-active" :
    data === "CANCELLED" ? "product-danger" : ""
    return btn
}

export const renderFulfillmentButtons = (data: any) => {
    let btn = '';
    btn = data === "PENDING" || data === "PARTIAL" || data === "INPROGRESS" ||
    data === "AGENT_ASSIGNED" || data === "AT_DESTINATION_HUB" ||
    data === "IN_TRANSIT" || data === "RTO_INITIATED" ? "product-draft" : 
    data === "PACKED" || data === "OUT_FOR_DELIVERY" ||
    data === "ORDER_DELIVERED" || data === "ORDER_PICKED_UP" ||
    data === "OUT_FOR_PICKUP" || data === "RTO_DELIVERED" ? "product-active" :
    data === "CANCELLED" || data === "DELIVERY_FAILED" ||
    data === "PICKUP_FAILED" || data === "RTO_DISPOSED" ? "product-danger" : ""
    return btn
}