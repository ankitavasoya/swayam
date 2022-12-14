import { ADD_JOB, ADD_JOB_ERROR, ADD_JOB_LOADING, ADD_SAVED_JOB, ADD_SAVED_JOB_ERROR, ADD_SAVED_JOB_LODAING, DASHBOARD_JOBS, DASHBOARD_JOBS_ERROR, DASHBOARD_JOBS_LOADING, DELETE_SAVED_JOB, DELETE_SAVED_JOB_ERROR, DELETE_SAVED_JOB_LODAING, GET_JOBS_FILTER_FOR_MAIN, GET_JOBS_FILTER_FOR_MAIN_ERROR, GET_JOBS_FILTER_FOR_MAIN_FALSE, GET_JOBS_FILTER_FOR_MAIN_LOADING, GET_JOBS_FILTER_FOR_MAIN_TRUE, GET_JOB_BY_ID, GET_JOB_BY_ID_ERROR, GET_JOB_BY_ID_LOADING, GET_JOB_CATEGORIES, GET_JOB_CATEGORIES_ERROR, GET_JOB_CATEGORIES_LOADING, GET_JOB_ROLES, GET_JOB_ROLES_ERROR, GET_JOB_ROLES_LOADING, JOB_UPDATE_ERROR, JOB_UPDATE_LOADING, JOB_UPDATE_MAIN, POST_ALL_JOB, POST_ALL_JOB_ERROR, POST_ALL_JOB_LOADING, POST_UPDATE_JOB_VIEWCOUNT, POST_UPDATE_JOB_VIEWCOUNT_ERROR, POST_UPDATE_JOB_VIEWCOUNT_LOADING, GET_QUERY, GET_QUERY_LOADING, GET_QUERY_ERROR } from "../type";

const initialState = {
    allJobLoading: false,
    allJob: [],
    allJobError: [],

    jobViewCounterLoading: false,
    jobViewCounter: [],
    jobViewCounterError: [],

    gteJobByIdLoading: false,
    gteJobById: [],
    gteJobByIdError: [],

    getJobRolesLoading: false,
    getJobRoles: [],
    getJobRolesError: [],

    getJobCategoriesLoading: false,
    getJobCategories: [],
    getJobCategoriesError: [],

    getJobsFilterForMainLoading: false,
    getJobsFilterForMain: [],
    getJobsFilterForMainTrue: [],
    getJobsFilterForMainFalse: [],
    getJobsFilterForMainError: [],

    addSavedJobLoading: false,
    addSavedJob: [],
    addSavedJobError: [],

    deleteSavedJobLoading: false,
    deleteSavedJob: [],
    deleteSavedJobError: [],

    dashboardJobsLoading: false,
    dashboardJobs: [],
    dashboardJobsError: [],

    updateJobLoading: false,
    updateJob: [],
    updateJobError: [],

    addJobLoading: false,
    addJob: [],
    addJobError: [],

    getQueryLoading: false,
    getQueryData: [],
    getQueryError: [],
}

export const jobReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case POST_ALL_JOB_LOADING:
            return {
                ...state,
                allJobLoading: action.payload,
            };
        case POST_ALL_JOB:
            return {
                ...state,
                allJob: action.payload,
            };
        case POST_ALL_JOB_ERROR:
            return {
                ...state,
                allJobError: action.payload,
            };
        case POST_UPDATE_JOB_VIEWCOUNT_LOADING:
            return {
                ...state,
                jobViewCounterLoading: action.payload
            }
        case POST_UPDATE_JOB_VIEWCOUNT:
            return {
                ...state,
                jobViewCounter: action.payload
            }
        case POST_UPDATE_JOB_VIEWCOUNT_ERROR:
            return {
                ...state,
                jobViewCounterError: action.payload
            }

        case GET_JOB_BY_ID_LOADING:
            return {
                ...state,
                gteJobByIdLoading: action.payload
            }
        case GET_JOB_BY_ID:
            return {
                ...state,
                gteJobById: action.payload
            }
        case GET_JOB_BY_ID_ERROR:
            return {
                ...state,
                gteJobByIdError: action.payload
            }
        case GET_JOB_ROLES_LOADING:
            return {
                ...state,
                getJobRolesLoading: action.payload
            }
        case GET_JOB_ROLES:
            return {
                ...state,
                getJobRoles: action.payload
            }
        case GET_JOB_ROLES_ERROR:
            return {
                ...state,
                getJobRolesError: action.payload
            }
        case GET_JOB_CATEGORIES_LOADING:
            return {
                ...state,
                getJobCategoriesLoading: action.payload
            }
        case GET_JOB_CATEGORIES:
            return {
                ...state,
                getJobCategories: action.payload
            }
        case GET_JOB_CATEGORIES_ERROR:
            return {
                ...state,
                getJobCategoriesError: action.payload
            }


        case GET_JOBS_FILTER_FOR_MAIN_LOADING:
            return {
                ...state,
                getJobsFilterForMainLoading: action.payload
            }
        case GET_JOBS_FILTER_FOR_MAIN:
            return {
                ...state,
                getJobsFilterForMain: action.payload
            }
        case GET_JOBS_FILTER_FOR_MAIN_TRUE:
            return {
                ...state,
                getJobsFilterForMainTrue: action.payload
            }
        case GET_JOBS_FILTER_FOR_MAIN_FALSE:
            return {
                ...state,
                getJobsFilterForMainFalse: action.payload
            }
        case GET_JOBS_FILTER_FOR_MAIN_ERROR:
            return {
                ...state,
                getJobsFilterForMainError: action.payload
            }


        case ADD_SAVED_JOB_LODAING:
            return {
                ...state,
                addSavedJobLoading: action.payload
            }
        case ADD_SAVED_JOB:
            return {
                ...state,
                addSavedJob: action.payload
            }
        case ADD_SAVED_JOB_ERROR:
            return {
                ...state,
                addSavedJobError: action.payload
            }


        case DELETE_SAVED_JOB_LODAING:
            return {
                ...state,
                deleteSavedJobLoading: action.payload
            }
        case DELETE_SAVED_JOB:
            return {
                ...state,
                deleteSavedJob: action.payload
            }
        case DELETE_SAVED_JOB_ERROR:
            return {
                ...state,
                deleteSavedJobError: action.payload
            }


        case DASHBOARD_JOBS_LOADING:
            return {
                ...state,
                dashboardJobsLoading: action.payload
            }
        case DASHBOARD_JOBS:
            return {
                ...state,
                dashboardJobs: action.payload
            }
        case DASHBOARD_JOBS_ERROR:
            return {
                ...state,
                dashboardJobsError: action.payload
            }

        case JOB_UPDATE_LOADING:
            return {
                ...state,
                updateJobLoading: action.payload
            }
        case JOB_UPDATE_MAIN:
            return {
                ...state,
                updateJob: action.payload
            }
        case JOB_UPDATE_ERROR:
            return {
                ...state,
                updateJobError: action.payload
            }


        case ADD_JOB_LOADING:
            return {
                ...state,
                addJobLoading: action.payload
            }
        case ADD_JOB:
            return {
                ...state,
                addJob: action.payload
            }
        case ADD_JOB_ERROR:
            return {
                ...state,
                addJobError: action.payload
            }
        case GET_QUERY_LOADING:
            return {
                ...state,
                getQueryLoading: action.payload
            }
        case GET_QUERY:
            return {
                ...state,
                getQueryData: action.payload
            }
        case GET_QUERY_ERROR:
            return {
                ...state,
                getQueryError: action.payload
            }

        default:
            return state

    }
}