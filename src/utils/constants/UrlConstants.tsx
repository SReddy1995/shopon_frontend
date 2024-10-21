export const baseUrl = 'https://ondc.opteamix.com/system_service/staging'; // replace with window.location.origin

export const AuthUrls = {
    register : '/register',
    requestGenerateOtp : '/generate_auth_otp',
    verifyOtpAndLogin : '/login',
}

export const AccountUrls = {
    getLegalEntity: '/get_legal_entity',
    saveLegalEntity: '/save_legal_entity',
    getAccountDetails: '/get_account_details',
    saveAccountDetails: '/save_account_details',
    getRefValues: '/get_ref_table_data'
}