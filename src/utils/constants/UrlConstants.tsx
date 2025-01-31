export const baseUrl = window.location.origin;

export const AuthUrls = {
    register : '/register',
    requestGenerateOtp : '/generate_auth_otp',
    verifyOtpAndLogin : '/login',
}

export const AccountUrls = {
    getAccountDetails: '/get_account_details',
    saveAccountDetails: '/save_account_details',
    getRefValues: '/get_ref_table_data',
    getLegalEntity: '/get_legal_entity',
    saveLegalEntity: '/save_legal_entity',
    getBankInfo: '/bank_info',
    saveBankInfo: '/bank_info',
    getOnlineStore: '/get_online_store',
    saveOnlineStore: '/save_online_store',
    getDocumentsDetailsList: '/documents',
    uploadDocument: '/document',
    deleteDocument: '/document',
    downloadDocumentsZip: 'documents/download',
    storeStatusDetails: '/buyer/status',
    initiateBuyerInfo:'/initiate_buyer_info',
    getBuyerInfo:'/buyer_info_details'
}

export const UserUrls = {
    getUsersList: '/get_users',
    updateUser: '/update_user',
    createUser: '/save_user',
}

export const ProductSearchUrls = {
    initiateSearch: '/search',
    getSearchResults: '/get_search_results',
    getSellersList: '/get_seller_data',
    getSpecialityList: '/get_speciality_data',
    getSourceList: '/get_source_data',
    syncWithShopify: '/add_products_from_stream'
}

export const CollectionUrls = {
    fetchShopifyProducts: '/shopify/fetch-products',
    deleteShopifyProduct: '/shopify/archive-product',
}

export const OrderUrls = {
    fetchOrdersList: '/orders_list',
    fetchOrderDetails: '/order_details',
    trackOrderBySeller: '/track_by_seller',
    statusBySeller: '/status_by_seller',
    cancelBySeller: '/cancel_by_seller',
    fetchUpdatedStatusesForOrder: '/get_order_details_status',
    trackDetailsBySeller: '/get_track_by_seller',
    settleOrderBySeller: '/settle',
    settleDetailsBySeller: '/get_settle_details',
    downloadOrdersCsv: '/get_orders_csv',
    getReturnDetails: '/return_item_history'
}