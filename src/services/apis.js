const BASE_URL = process.env.REACT_APP_BASE_URL;
export const CATEGORIES = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}
export const AUTH = {
    LOGIN_API : BASE_URL + "/auth/login",
    OTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    RESET_TOKEN_API: BASE_URL + "/auth/reset-password-token",
}