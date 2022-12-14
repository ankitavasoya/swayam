import {
    GET_COURSE_LOADING, GET_COURSE, GET_COURSE_ERROR, GET_COURSE_CATEGORY_LOADING, GET_COURSE_CATEGORY, GET_COURSE_CATEGORY_ERROR,
    GET_COURSE_CATEGORIES, GET_COURSE_CATEGORIES_LOADING, GET_COURSE_CATEGORIES_ERROR, GET_COURSES, GET_COURSES_LOADING, GET_COURSES_ERROR,
    GET_COURSES_BY_ID, GET_COURSES_BY_ID_LOADING, GET_COURSES_BY_ID_ERROR, ADD_COURSE_RATING, ADD_COURSE_RATING_LOADING, ADD_COURSE_RATING_ERROR,
    ADD_SAVE_COURSE, ADD_SAVE_COURSE_LOADING, ADD_SAVE_COURSE_ERROR, ADD_ENROLLED_COURSE, ADD_ENROLLED_COURSE_LOADING, ADD_ENROLLED_COURSE_ERROR,
    GET_SAVE_COURSE, GET_SAVE_COURSE_LOADING, GET_SAVE_COURSE_ERROR, GET_BANNER_TRUE, GET_BANNER_TRUE_LOADING, GET_BANNER_TRUE_ERROR,
    GET_BANNER_FALSE, GET_BANNER_FALSE_LOADING, GET_BANNER_FALSE_ERROR, GET_COURSES_FOR_SAVE_AND_ENROLLED, GET_COURSES_FOR_SAVE_AND_ENROLLED_LOADING, GET_COURSES_FOR_SAVE_AND_ENROLLED_ERROR,
    GET_COURSE_RATING, GET_COURSE_RATING_LOADING, GET_COURSE_RATING_ERROR, GET_SPECIFIC_COURSE_RATINGS, GET_SPECIFIC_COURSE_RATINGS_LOADING, GET_SPECIFIC_COURSE_RATINGS_ERROR,
    DELETE_SAVE_COURSE, DELETE_SAVE_COURSE_LOADING, DELETE_SAVE_COURSE_ERROR, DELETE_ENROLLED_COURSE, DELETE_ENROLLED_COURSE_LOADING, DELETE_ENROLLED_COURSE_ERROR, UPDATE_COURSE_LOADING, UPDATE_COURSE, UPDATE_COURSE_ERROR, ADD_PARTNER_COURSE, ADD_PARTNER_COURSE_LOADING, ADD_PARTNER_COURSE_ERROR,
    EDIT_PARTNER_COURSE, EDIT_PARTNER_COURSE_LOADING, EDIT_PARTNER_COURSE_ERROR, GET_OFFLINE_COURSES, GET_OFFLINE_COURSES_ERROR, GET_OFFLINE_COURSES_LOADING, GET_ONLINE_COURSES, GET_ONLINE_COURSES_LOADING, GET_ONLINE_COURSES_ERROR, GET_OTHER_COURSES_LOADING, GET_OTHER_COURSES, GET_OTHER_COURSES_ERROR, GET_QUALIFICATIONS_LOADING, GET_QUALIFICATIONS, GET_QUALIFICATIONS_ERROR,

} from "../type"

const initialState = {
    courseLoading: false,
    course: [],
    courseError: [],
    courseCategoryLoading: false,
    courseCategory: [],
    courseCategoryError: [],
    getCoursesLoading: false,
    getCourses: [],
    getCoursesError: [],
    getCoursesByIdLoading: false,
    getCoursesByIdData: [],
    getCoursesByIdError: [],
    addCourseRatingLoading: false,
    addCourseRatingData: [],
    addCourseRatingError: [],
    addSaveCourseLoading: false,
    addSaveCourseData: [],
    addSaveCourseError: [],
    addEnrolledCourseLoading: false,
    addEnrolledCourseData: [],
    addEnrolledCourseError: [],
    getSaveCourseLoading: false,
    getSaveCourseData: [],
    getSaveCourseError: [],
    getBannerLoading: false,
    getBannerData: [],
    getBannerError: [],
    getBannerFalseLoading: false,
    getBannerFlaseData: [],
    getBannerFalseError: [],
    getCourseLoading: false,
    getCourseData: [],
    getCourseError: [],
    getCourseRatingLoading: false,
    getCourseRatingData: [],
    GET_COURSE_RATING_ERROR: [],
    getSpecificCourseRatingLoading: false,
    getSpecificCourseRatingData: [],
    getSpecificCourseRatingError: [],
    deleteSavedCourseLoading: false,
    deleteSavedCourseData: [],
    deleteSavedCourseError: [],
    deleteEnrolledCourseLoading: false,
    deleteEnrolledCourseData: [],
    deleteEnrolledCourseError: [],
    updateCourseLoading: false,
    updateCourseData: [],
    updateCourseError: [],
    addPartnerCourseError: [],
    editPartnerCourseLoading: false,
    editPartnerCourseData: [],
    editPartnerCourseError: [],
    addPartnerCourseData: [],
    addPartnerCourseLoading: [],
    offLineCourseLoading: false,
    offLineCourseData: [],
    offLineCourseError: [],
    onLineCourseLoading: false,
    onLineCourseData: [],
    onLineCourseError: [],
    getOtherCourseLoading: false,
    getOtherCourseData: [],
    getOtherCourseError: [],
    getQualificationLoading: false,
    getQualificationData: [],
    getQualificationError: [],

}

export const courseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COURSE_LOADING:
            return {
                ...state,
                courseLoading: action.payload,
            };
        case GET_COURSE:
            return {
                ...state,
                course: action.payload,
            };
        case GET_COURSE_ERROR:
            return {
                ...state,
                courseError: action.payload,
            };

        case GET_COURSE_CATEGORIES_LOADING:
            return {
                ...state,
                courseCategoryLoading: action.payload
            }
        case GET_COURSE_CATEGORIES:
            return {
                ...state,
                courseCategory: action.payload,
            }
        case GET_COURSE_CATEGORIES_ERROR:
            return {
                ...state,
                courseCategoryError: action.payload,
            }

        case GET_COURSES_LOADING:
            return {
                ...state,
                getCoursesLoading: action.payload
            }
        case GET_COURSES:
            return {
                ...state,
                getCourses: action.payload,
            }
        case GET_COURSES_ERROR:
            return {
                ...state,
                getCoursesError: action.payload,
            }

        case GET_COURSES_BY_ID_LOADING:
            return {
                ...state,
                getCoursesByIdLoading: action.payload
            }
        case GET_COURSES_BY_ID:
            return {
                ...state,
                getCoursesByIdData: action.payload,
            }
        case GET_COURSES_BY_ID_ERROR:
            return {
                ...state,
                getCoursesByIdError: action.payload,
            }

        case ADD_COURSE_RATING_LOADING:
            return {
                ...state,
                addCourseRatingLoading: action.payload
            }
        case ADD_COURSE_RATING:
            return {
                ...state,
                addCourseRatingData: action.payload,
            }
        case ADD_COURSE_RATING_ERROR:
            return {
                ...state,
                addCourseRatingError: action.payload,
            }

        case ADD_SAVE_COURSE_LOADING:
            return {
                ...state,
                addSaveCourseLoading: action.payload
            }
        case ADD_SAVE_COURSE:
            return {
                ...state,
                addSaveCourseData: action.payload,
            }
        case ADD_SAVE_COURSE_ERROR:
            return {
                ...state,
                addSaveCourseError: action.payload,
            }

        case ADD_ENROLLED_COURSE_LOADING:
            return {
                ...state,
                addEnrolledCourseLoading: action.payload
            }
        case ADD_ENROLLED_COURSE:
            return {
                ...state,
                addEnrolledCourseData: action.payload,
            }
        case ADD_ENROLLED_COURSE_ERROR:
            return {
                ...state,
                addEnrolledCourseError: action.payload,
            }

        case GET_SAVE_COURSE_LOADING:
            return {
                ...state,
                getSaveCourseLoading: action.payload
            }
        case GET_SAVE_COURSE:
            return {
                ...state,
                getSaveCourseData: action.payload,
            }
        case GET_SAVE_COURSE_ERROR:
            return {
                ...state,
                getSaveCourseError: action.payload,
            }

        case GET_BANNER_TRUE_LOADING:
            return {
                ...state,
                getBannerLoading: action.payload
            }
        case GET_BANNER_TRUE:
            return {
                ...state,
                getBannerData: action.payload,
            }
        case GET_BANNER_TRUE_ERROR:
            return {
                ...state,
                getBannerError: action.payload,
            }

        case GET_BANNER_FALSE_LOADING:
            return {
                ...state,
                getBannerFalseLoading: action.payload
            }
        case GET_BANNER_FALSE:
            return {
                ...state,
                getBannerFlaseData: action.payload,
            }
        case GET_BANNER_FALSE_ERROR:
            return {
                ...state,
                getBannerFalseError: action.payload,
            }

        case GET_COURSES_FOR_SAVE_AND_ENROLLED_LOADING:
            return {
                ...state,
                getCourseLoading: action.payload
            }
        case GET_COURSES_FOR_SAVE_AND_ENROLLED:
            return {
                ...state,
                getCourseData: action.payload,
            }
        case GET_COURSES_FOR_SAVE_AND_ENROLLED_ERROR:
            return {
                ...state,
                getCourseError: action.payload,
            }

        case GET_COURSE_RATING_LOADING:
            return {
                ...state,
                getCourseRatingLoading: action.payload
            }
        case GET_COURSE_RATING:
            return {
                ...state,
                getCourseRatingData: action.payload,
            }
        case GET_COURSE_RATING_ERROR:
            return {
                ...state,
                getCourseRatingError: action.payload,
            }

        case GET_SPECIFIC_COURSE_RATINGS_LOADING:
            return {
                ...state,
                getSpecificCourseRatingLoading: action.payload
            }
        case GET_SPECIFIC_COURSE_RATINGS:
            return {
                ...state,
                getSpecificCourseRatingData: action.payload,
            }
        case GET_SPECIFIC_COURSE_RATINGS_ERROR:
            return {
                ...state,
                getSpecificCourseRatingError: action.payload,
            }

        case DELETE_SAVE_COURSE_LOADING:
            return {
                ...state,
                deleteSavedCourseLoading: action.payload
            }
        case DELETE_SAVE_COURSE:
            return {
                ...state,
                deleteSavedCourseRatingData: action.payload,
            }
        case DELETE_SAVE_COURSE_ERROR:
            return {
                ...state,
                deleteSavedCourseError: action.payload,
            }

        case DELETE_ENROLLED_COURSE_LOADING:
            return {
                ...state,
                deleteEnrolledCourseLoading: action.payload
            }
        case DELETE_ENROLLED_COURSE:
            return {
                ...state,
                deleteEnrolledCourseData: action.payload,
            }
        case DELETE_ENROLLED_COURSE_ERROR:
            return {
                ...state,
                deleteEnrolledCourseError: action.payload,
            }

        case UPDATE_COURSE_LOADING:
            return {
                ...state,
                updateCourseLoading: action.payload
            }
        case UPDATE_COURSE:
            return {
                ...state,
                updateCourseData: action.payload,
            }
        case UPDATE_COURSE_ERROR:
            return {
                ...state,
                updateCourseError: action.payload,
            }

        case ADD_PARTNER_COURSE_LOADING:
            return {
                ...state,
                addPartnerCourseLoading: action.payload
            }
        case ADD_PARTNER_COURSE:
            return {
                ...state,
                addPartnerCourseData: action.payload,
            }
        case ADD_PARTNER_COURSE_ERROR:
            return {
                ...state,
                addPartnerCourseError: action.payload,
            }
        case EDIT_PARTNER_COURSE_LOADING:
            return {
                ...state,
                editPartnerCourseLoading: action.payload
            }
        case EDIT_PARTNER_COURSE:
            return {
                ...state,
                editPartnerCourseData: action.payload,
            }
        case EDIT_PARTNER_COURSE_ERROR:
            return {
                ...state,
                editPartnerCourseError: action.payload,
            }

        case GET_OFFLINE_COURSES_LOADING:
            return {
                ...state,
                offLineCourseLoading: action.payload
            }
        case GET_OFFLINE_COURSES:
            return {
                ...state,
                offLineCourseData: action.payload,
            }
        case GET_OFFLINE_COURSES_ERROR:
            return {
                ...state,
                offLineCourseError: action.payload,
            }

        case GET_ONLINE_COURSES_LOADING:
            return {
                ...state,
                onLineCourseLoading: action.payload
            }
        case GET_ONLINE_COURSES:
            return {
                ...state,
                onLineCourseData: action.payload,
            }
        case GET_ONLINE_COURSES_ERROR:
            return {
                ...state,
                onLineCourseError: action.payload,
            }

        case GET_OTHER_COURSES_LOADING:
            return {
                ...state,
                getOtherCourseLoading: action.payload
            }
        case GET_OTHER_COURSES:
            return {
                ...state,
                getOtherCourseData: action.payload,
            }
        case GET_OTHER_COURSES_ERROR:
            return {
                ...state,
                getOtherCourseError: action.payload,
            }

        case GET_QUALIFICATIONS_LOADING:
            return {
                ...state,
                getQualificationLoading: action.payload
            }
        case GET_QUALIFICATIONS:
            return {
                ...state,
                getQualificationData: action.payload,
            }
        case GET_QUALIFICATIONS_ERROR:
            return {
                ...state,
                getQualificationError: action.payload,
            }


        default:
            return state
    }
}