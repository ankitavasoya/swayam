import {
    GET_ACTIVE_COURSE_FILTER_FOR_MAIN, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_ERROR, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_TRUE, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_FALSE,
    EDIT_ACTIVE_PARTNER_COURSE, EDIT_ACTIVE_PARTNER_COURSE_LOADING, EDIT_ACTIVE_PARTNER_COURSE_ERROR, DELETE_PARTNER_COURSE_LOADING, DELETE_PARTNER_COURSE, DELETE_PARTNER_COURSE_ERROR,
} from "../type";

const initialState = {

    getCourseLoading: false,
    getActiveCourseData: [],
    getCourseForMainTrue: [],
    getCourseFilterForMainFalse: [],
    getCourseFilterForMainError: [],

    updateCourseActiveDataLoading: false,
    updateCourseActiveData: [],
    updateCourseActiveDataError: [],

    deletePartnerCourseLoading: false,
    deletePartnerCourse: [],
    deletePartnerCourseError: [],
}

export const activeCourseReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING:
            return {
                ...state,
                getCourseLoading: action.payload
            }
        case GET_ACTIVE_COURSE_FILTER_FOR_MAIN:
            return {
                ...state,
                getActiveCourseData: action.payload
            }
        case GET_ACTIVE_COURSE_FILTER_FOR_MAIN_TRUE:
            return {
                ...state,
                getCourseForMainTrue: action.payload
            }
        case GET_ACTIVE_COURSE_FILTER_FOR_MAIN_FALSE:
            return {
                ...state,
                getCourseFilterForMainFalse: action.payload
            }
        case GET_ACTIVE_COURSE_FILTER_FOR_MAIN_ERROR:
            return {
                ...state,
                getCourseFilterForMainError: action.payload
            }

        case EDIT_ACTIVE_PARTNER_COURSE_LOADING:
            return {
                ...state,
                updateCourseActiveDataLoading: action.payload
            }
        case EDIT_ACTIVE_PARTNER_COURSE:
            return {
                ...state,
                updateCourseActiveData: action.payload
            }
        case EDIT_ACTIVE_PARTNER_COURSE_ERROR:
            return {
                ...state,
                updateCourseActiveDataError: action.payload
            }

        case DELETE_PARTNER_COURSE_LOADING:
            return {
                ...state,
                deletePartnerCourseLoading: action.payload
            }
        case DELETE_PARTNER_COURSE:
            return {
                ...state,
                deletePartnerCourse: action.payload
            }
        case DELETE_PARTNER_COURSE_ERROR:
            return {
                ...state,
                deletePartnerCourseError: action.payload
            }


        default:
            return state
    }
}