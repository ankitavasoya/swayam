import { ADD_JOB_APPLICATION, ADD_JOB_APPLICATION_ERROR, ADD_JOB_APPLICATION_LODAING, JOB_APPLICATION_COUNT, JOB_APPLICATION_COUNT_LOADING, JOB_APPLICATION_COUNT_ERROR, GET_ALL_JOB_APPLICATION_ERROR, GET_ALL_JOB_APPLICATION, GET_ALL_JOB_APPLICATION_LOADING, UPDATE_JOB_APPLICATION_LOADING, UPDATE_JOB_APPLICATION, UPDATE_JOB_APPLICATION_ERROR, GET_JOB_APPLICATION, GET_JOB_APPLICATION_LOADING, GET_JOB_APPLICATION_ERROR } from "../type";

const initialState = {
    addJobApplicationLoading: false,
    addJobApplication: [],
    addJobApplicationError: [],

    jobApplicationLoading: false,
    jobApplicationCount: [],
    jobApplicationCountError: [],

    getAllJobApplicationLoading: false,
    getAllJobApplication: [],
    getAllJobApplicationError: [],

    updateJobApplicationLoading: false,
    updateJobApplication: [],
    updateJobApplicationError: [],

    getJobApplicationLoading: false,
    getJobApplication: [],
    getJobApplicationError: []
}

export const jobApplicationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_JOB_APPLICATION_LODAING:
            return {
                ...state,
                addJobApplicationLoading: action.payload,
            };
        case ADD_JOB_APPLICATION:
            return {
                ...state,
                addJobApplication: action.payload,
            };
        case ADD_JOB_APPLICATION_ERROR:
            return {
                ...state,
                addJobApplicationError: action.payload,
            };


        case JOB_APPLICATION_COUNT_LOADING:
            return {
                ...state,
                jobApplicationCountLoading: action.payload,
            }
        case JOB_APPLICATION_COUNT:
            return {
                ...state,
                jobApplicationCount: action.payload,
            }
        case JOB_APPLICATION_COUNT_ERROR:
            return {
                ...state,
                jobApplicationCountError: action.payload,
            }


        case GET_ALL_JOB_APPLICATION_LOADING:
            return {
                ...state,
                getAllJobApplicationLoading: action.payload,
            }
        case GET_ALL_JOB_APPLICATION:
            return {
                ...state,
                getAllJobApplication: action.payload,
            }
        case GET_ALL_JOB_APPLICATION_ERROR:
            return {
                ...state,
                getAllJobApplicationError: action.payload,
            }

        case UPDATE_JOB_APPLICATION_LOADING:
            return {
                ...state,
                updateJobApplicationLoading: action.payload,
            }
        case UPDATE_JOB_APPLICATION:
            return {
                ...state,
                updateJobApplication: action.payload,
            }
        case UPDATE_JOB_APPLICATION_ERROR:
            return {
                ...state,
                updateJobApplicationError: action.payload,
            }

        case GET_JOB_APPLICATION_LOADING:
            return {
                ...state,
                getJobApplicationLoading: action.payload,
            }
        case GET_JOB_APPLICATION:
            return {
                ...state,
                getJobApplication: action.payload,
            }
        case GET_JOB_APPLICATION_ERROR:
            return {
                ...state,
                getJobApplicationError: action.payload,
            }

        default:
            return state

    }
}