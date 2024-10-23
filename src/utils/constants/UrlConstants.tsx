export const baseUrl = 'https://ondc.opteamix.com/staging'; // replace with window.location.origin
export const baseUrlSuffix = '/api/syssvc'

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
}

export const UserUrls = {
    getUsersList: '/get_users',
    updateUser: '/update_user',
    createUser: '/save_user',
}