export const renderSettlementStatusButtons = (data: any) => {
    let btn = ''
    btn = data === "INITIATED" || data === "PARTIAL" || data === "PENDING" ? "product-draft" : 
    data === "SETTLED" ? "product-active" :
    data === "NOT_SETTLED" ? "product-danger" : ""
    return btn
}

export const renderOrderStatusButtons = (data: any) => {
    let btn = '';
    btn = data === "CREATED" || data === "INPROGRESS" || data === "PARTIAL" || data === "PENDING" ? "product-draft" : 
    data === "COMPLETED" ||  data === "ACCEPTED" ? " product-active" :
    data === "CANCELLED" ? "product-danger" : ""
    return btn
}

export const renderFulfillmentButtons = (data: any) => {
    let btn = '';
    btn = data === "PENDING" || data === "PARTIAL" || data === "INPROGRESS" ||
    data === "AGENT_ASSIGNED" || data === "AT_DESTINATION_HUB" ||
    data === "IN_TRANSIT" || data === "RTO_INITIATED" || data === "SERVICEABLE" ? "product-draft" : 
    data === "PACKED" || data === "OUT_FOR_DELIVERY" ||
    data === "ORDER_DELIVERED" || data === "ORDER_PICKED_UP" || data === "DELIVERED" ||
    data === "OUT_FOR_PICKUP" || data === "RTO_DELIVERED" ? "product-active" :
    data === "CANCELLED" || data === "DELIVERY_FAILED" ||
    data === "PICKUP_FAILED" || data === "RTO_DISPOSED" ? "product-danger" : ""
    return btn
}

export const ondcReturnStatus = [
    {
        key: 'Liquidated',
        short_desc: 'Liquidated',
        long_desc: 'Return has been liquidated.'
    },
    {
        key: 'Return_Picked',
        short_desc: 'Return Picked',
        long_desc: 'Return has been picked up.'
    },
    {
        key: 'Cancelled',
        short_desc: 'Cancelled',
        long_desc: 'Return has been cancelled.'
    },
    {
        key: 'Return_Initiated',
        short_desc: 'Return Initiated',
        long_desc: 'Return process has been initiated.'
    },
    {
        key: 'Return_Approved',
        short_desc: 'Return Approved',
        long_desc: 'Return has been approved.'
    },
    {
        key: 'Return_Pick_Failed',
        short_desc: 'Return Pick Failed',
        long_desc: 'Return pick-up has failed.'
    },
    {
        key: 'Return_Delivered',
        short_desc: 'Return Delivered',
        long_desc: 'Return has been delivered.'
    },
    {
        key: 'Return_Rejected',
        short_desc: 'Return Rejected',
        long_desc: 'Return has been rejected.'
    },
    {
        key: 'Return_Failed',
        short_desc: 'Return Failed',
        long_desc: 'Return process has failed.'
    },
    {
        key: 'Return_Pick_Successful',
        short_desc: 'Return Pick Successful',
        long_desc: 'Return pick-up was successful.'
    },
    {
        key: 'Pending',
        short_desc: 'Pending',
        long_desc: 'Return is pending.'
    }
]