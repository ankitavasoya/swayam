import {
    GET_ACTIVE_JOBS_FILTER_FOR_MAIN, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_ERROR, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_TRUE, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_FALSE
    , JOB_UPDATE_ACTIVE_MAIN, JOB_UPDATE_ACTIVE_LOADING, JOB_UPDATE_ACTIVE_ERROR
} from "../type";

const initialState = {

    getJobsFilterForMainLoading: false,
    getJobsFilterForMain: [],
    getJobsFilterForMainTrue: [],
    getJobsFilterForMainFalse: [],
    getJobsFilterForMainError: [],
    updateJobActiveDataLoading: false,
    updateJobActiveData: [],
    updateJobActiveDataError: [],
}

export const activejobsReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING:
            return {
                ...state,
                getJobsFilterForMainLoading: action.payload
            }
        case GET_ACTIVE_JOBS_FILTER_FOR_MAIN:
            return {
                ...state,
                getJobsFilterForMain: action.payload
            }
        case GET_ACTIVE_JOBS_FILTER_FOR_MAIN_TRUE:
            return {
                ...state,
                getJobsFilterForMainTrue: action.payload
            }
        case GET_ACTIVE_JOBS_FILTER_FOR_MAIN_FALSE:
            return {
                ...state,
                getJobsFilterForMainFalse: action.payload
            }
        case GET_ACTIVE_JOBS_FILTER_FOR_MAIN_ERROR:
            return {
                ...state,
                getJobsFilterForMainError: action.payload
            }
        case JOB_UPDATE_ACTIVE_LOADING:
            return {
                ...state,
                updateJobActiveDataLoading: action.payload
            }
        case JOB_UPDATE_ACTIVE_MAIN:
            return {
                ...state,
                updateJobActiveData: action.payload
            }
        case JOB_UPDATE_ACTIVE_ERROR:
            return {
                ...state,
                updateJobActiveDataError: action.payload
            }
        default:
            return state
    }
}