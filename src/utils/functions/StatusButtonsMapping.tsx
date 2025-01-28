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
        long_desc: 'Order has been canceled and processed for liquidation of the item. Refund process will be initiated.'
    },
    {
        key: 'Return_Picked',
        short_desc: 'Picked',
        long_desc: 'The items that were requested for return have been collected from the customer or location for processing.'
    },
    {
        key: 'Cancelled',
        short_desc: 'Cancelled',
        long_desc: 'The return is cancelled either by the customer or system, due to reasons such as out-of-stock items, user request, or order errors.'
    },
    {
        key: 'Return_Initiated',
        short_desc: 'Initiated',
        long_desc: 'Return rquest is initiated.'
    },
    {
        key: 'Return_Approved',
        short_desc: 'Approved',
        long_desc: 'Request for return is approved.'
    },
    {
        key: 'Return_Pick_Failed',
        short_desc: 'Failed',
        long_desc: 'Pickup failed due to address discrepancy or customer availability and a follow-up for reschedule will be attempted.'
    },
    {
        key: 'Return_Delivered',
        short_desc: 'Delivered',
        long_desc: 'Item successfully received at the returns center and will be processed for refund or replacement.'
    },
    {
        key: 'Return_Rejected',
        short_desc: 'Rejected',
        long_desc: 'The return request was rejected due to non-comliance the return policy.'
    },
    {
        key: 'Return_Failed',
        short_desc: 'Failed',
        long_desc: 'The return process was unsuccessful, either due to logistical issues, failed inspections, or customer failure to meet return conditions.'
    },
    {
        key: 'Return_Pick_Successful',
        short_desc: 'Successful',
        long_desc: 'Item successfully collected from customer location.'
    },
    {
        key: 'Pending',
        short_desc: 'Pending',
        long_desc: 'The return process is currently pending for a decision or verfication requirment.'
    }
]