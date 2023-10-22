const BASE_URL = process.env.REACT_APP_BASE_URL;
export const CATEGORIES = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
}
export const AUTH = {
    LOGIN_API : BASE_URL + "/auth/login",
    OTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    RESET_TOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password"
}
export const COURSE = {
    COURSE_CREATE_API : BASE_URL + "/course/createCourse",
    COURSE_GET_CATEGORIES: BASE_URL + "/course/showAllCategories",
    COURSE_ADD_SECTION: BASE_URL + "/course/addSection",
    COURSE_UPDATE_SECTION: BASE_URL + "/course/updateSection",
    COURSE_DELETE_SECTION: BASE_URL + "/course/deleteSection",
    COURSE_ADD_SUBSECTION: BASE_URL + "/course/addSubSection",
    COURSE_DELETE_SUBSECTION: BASE_URL + "/course/deleteSubSection",
    COURSE_GET_DETAILS: BASE_URL + "/course/getCourseDetails",
    COURSE_DELETE : BASE_URL + "/course/deleteCourse",
    INSTRUCTOR_COURSES_GET_DETAILS: BASE_URL + "/course/getInstructorCourses"
}
export const SETTINGS = {
    UPDATE_PROFILE_API : BASE_URL + "/profile/updateDisplayPicture",
    DELETE_ACCOUNT_API : BASE_URL + "/profile/deleteProfile",
    GET_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses"
}