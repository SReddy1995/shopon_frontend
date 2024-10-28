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
    downloadDocumentsZip: 'documents/download'
}

export const UserUrls = {
    getUsersList: '/get_users',
    updateUser: '/update_user',
    createUser: '/save_user',
}