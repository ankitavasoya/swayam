import { GET_COURSE_RATING, GET_COURSE_RATING_ERROR, GET_COURSE_RATING_LOADING } from "../type"

const initialState = {
    courseRatinLoading: false,
    courseRatin: [],
    courseRatinError: []
}

export const courseRatingReucer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COURSE_RATING_LOADING:
            return {
                ...state,
                courseRatinLoading: action.payload
            }
        case GET_COURSE_RATING:
            return {
                ...state,
                courseRatin: action.payload,
                loading: false
            }
        case GET_COURSE_RATING_ERROR:
            return {
                ...state,
                courseRatinError: action.payload,
                loading: false
            }
        default:
            return state
    }
}
