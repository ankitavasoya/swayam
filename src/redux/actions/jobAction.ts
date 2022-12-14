import { toast } from "react-toastify";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiGet, ApiGetNoAuth, ApiPost, ApiPostNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { ADD_JOB, ADD_JOB_ERROR, ADD_JOB_LOADING, ADD_SAVED_JOB, ADD_SAVED_JOB_ERROR, ADD_SAVED_JOB_LODAING, DASHBOARD_JOBS, DASHBOARD_JOBS_ERROR, DASHBOARD_JOBS_LOADING, DELETE_SAVED_JOB, DELETE_SAVED_JOB_ERROR, DELETE_SAVED_JOB_LODAING, GET_JOBS_FILTER_FOR_MAIN, GET_JOBS_FILTER_FOR_MAIN_ERROR, GET_JOBS_FILTER_FOR_MAIN_FALSE, GET_JOBS_FILTER_FOR_MAIN_LOADING, GET_JOBS_FILTER_FOR_MAIN_TRUE, GET_JOB_BY_ID, GET_JOB_BY_ID_ERROR, GET_JOB_BY_ID_LOADING, GET_JOB_CATEGORIES, GET_JOB_CATEGORIES_ERROR, GET_JOB_CATEGORIES_LOADING, GET_JOB_ROLES, GET_JOB_ROLES_ERROR, GET_JOB_ROLES_LOADING, IS_LOADING, JOB_UPDATE_ERROR, JOB_UPDATE_LOADING, JOB_UPDATE_MAIN, POST_ALL_JOB, POST_ALL_JOB_ERROR, POST_ALL_JOB_LOADING, POST_UPDATE_JOB_VIEWCOUNT, POST_UPDATE_JOB_VIEWCOUNT_ERROR, POST_UPDATE_JOB_VIEWCOUNT_LOADING, GET_QUERY, GET_QUERY_LOADING, GET_QUERY_ERROR } from "../type"


let per_Page: any, page_Num: any, State: any, CateGory: any, Jobrole: any, Status: any, Search: any, BannerSelected: any, created_by: any;
export const AllJOb = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: POST_ALL_JOB_LOADING,
            payload: true
        })
        await ApiPostNoAuth(`userPanel/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res) => {
                dispatch({
                    type: POST_ALL_JOB,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: POST_ALL_JOB_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: POST_ALL_JOB_ERROR,
            payload: err
        })

        dispatch({
            type: POST_ALL_JOB_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const updateJobViewCount = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: POST_UPDATE_JOB_VIEWCOUNT_LOADING,
            payload: true
        })
        await ApiPostNoAuth(`userPanel/updateJobViewCount`, body)
            .then((res) => {
                dispatch({
                    type: POST_UPDATE_JOB_VIEWCOUNT,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: POST_UPDATE_JOB_VIEWCOUNT_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: POST_UPDATE_JOB_VIEWCOUNT_ERROR,
            payload: err
        })
        dispatch({
            type: POST_UPDATE_JOB_VIEWCOUNT_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}
export const getJobById = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_JOB_BY_ID_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getJobById`)
            .then((res) => {
                dispatch({
                    type: GET_JOB_BY_ID,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: GET_JOB_BY_ID_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOB_BY_ID_ERROR,
            payload: err
        })
        dispatch({
            type: GET_JOB_BY_ID_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const getJobRoles = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_JOB_ROLES_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getRoles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_JOB_ROLES,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: GET_JOB_ROLES_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOB_ROLES_ERROR,
            payload: err
        })
        dispatch({
            type: GET_JOB_ROLES_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const getJobCategories = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_JOB_CATEGORIES_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`job/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_JOB_CATEGORIES,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: GET_JOB_CATEGORIES_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOB_CATEGORIES_ERROR,
            payload: err
        })
        dispatch({
            type: GET_JOB_CATEGORIES_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const getJobsFilterForMain = (perPage: number, PageNo: number, state: string, categories: string, jobRole: string, status: string, search: string, bannerSelected: any, createdBy: any) => async (dispatch: any) => {
    per_Page = perPage
    page_Num = PageNo
    State = state
    CateGory = categories
    Jobrole = jobRole
    Status = status
    Search = search
    BannerSelected = bannerSelected
    created_by = createdBy
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: true,
        })
        let URL = `userPanel/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${PageNo}`
        if (state) {
            URL = URL.concat(`&state=${state}`)
        }
        if (categories) {
            URL = URL.concat(`&jobType=${categories}`)
        }
        if (jobRole) {
            URL = URL.concat(`&jobRole=${jobRole}`)
        }
        if (status) {
            URL = URL.concat(`&status=${status}`)
        }
        if (search) {
            URL = URL.concat(`&search=${search}`)
        }
        if (bannerSelected === true || bannerSelected === false) {
            URL = URL.concat(`&bannerSelected=${bannerSelected}`)
        }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        if (createdBy) {
            URL = URL.concat(`&created_by=${createdBy}`)
        }
        await ApiPostNoAuth(URL, {})
            .then((res) => {
                if (bannerSelected === true) {
                    dispatch({
                        type: GET_JOBS_FILTER_FOR_MAIN_TRUE,
                        payload: res
                    })
                }
                else if (bannerSelected === false) {
                    dispatch({
                        type: GET_JOBS_FILTER_FOR_MAIN_FALSE,
                        payload: res
                    })
                } else {
                    dispatch({
                        type: GET_JOBS_FILTER_FOR_MAIN,
                        payload: res
                    })
                }
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing Wrong")
            })
        dispatch({
            type: GET_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOBS_FILTER_FOR_MAIN_ERROR,
            payload: err
        })
        dispatch({
            type: GET_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addSavedJob = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_SAVED_JOB_LODAING,
            payload: true
        })
        await ApiPost(`savedJob/addSavedJob`, body)
            .then((res) => {
                dispatch({
                    type: ADD_SAVED_JOB,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: ADD_SAVED_JOB_LODAING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_SAVED_JOB_ERROR,
            payload: err
        })
        dispatch({
            type: ADD_SAVED_JOB_LODAING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const deleteSavedJob = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_SAVED_JOB_LODAING,
            payload: true
        })
        await ApiPost(`savedJob/deleteSavedJob`, body)
            .then((res) => {
                dispatch({
                    type: DELETE_SAVED_JOB,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: DELETE_SAVED_JOB_LODAING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_SAVED_JOB_ERROR,
            payload: err
        })
        dispatch({
            type: DELETE_SAVED_JOB_LODAING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const dashboardJobs = (perPage: number, PageNo: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DASHBOARD_JOBS_LOADING,
            payload: true
        })
        let URL = `job/dashboardJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
        if (perPage) {
            URL = URL.concat(`&per_page=${perPage}`)
        }
        if (PageNo) {
            URL = URL.concat(`&page_number=${PageNo}`)
        }
        await ApiPost(URL, {})
            .then((res) => {
                dispatch({
                    type: DASHBOARD_JOBS,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: DASHBOARD_JOBS_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DASHBOARD_JOBS_ERROR,
            payload: err
        })
        dispatch({
            type: DASHBOARD_JOBS_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const updateJob = (id: any, body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: JOB_UPDATE_LOADING,
            payload: true
        })
        await ApiPost(`job/update?jobId=${id}`, body)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getJobsFilterForMain(per_Page, page_Num, State, CateGory, Jobrole, Status, Search, BannerSelected, created_by))
                }
                dispatch({
                    type: JOB_UPDATE_MAIN,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: JOB_UPDATE_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: JOB_UPDATE_ERROR,
            payload: err
        })
        dispatch({
            type: JOB_UPDATE_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const addJob = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_JOB_LOADING,
            payload: true
        })
        await ApiPost(`job/add?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res) => {
                dispatch({
                    type: ADD_JOB,
                    payload: res
                })
            })
            .catch((error) => {
                console.log("error", error)
            })
        dispatch({
            type: ADD_JOB_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_JOB_ERROR,
            payload: err
        })
        dispatch({
            type: ADD_JOB_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const getQueryAction = (per_page: number, page_number: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_QUERY_LOADING,
            payload: true
        })
        ApiGetNoAuth(`query/getQueries?per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                dispatch({
                    type: GET_QUERY,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_QUERY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_QUERY_ERROR,
            payload: err
        })

        dispatch({
            type: GET_QUERY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}