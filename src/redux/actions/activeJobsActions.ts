
import { toast } from "react-toastify";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiPost, ApiPostNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import {
    GET_ACTIVE_JOBS_FILTER_FOR_MAIN, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_ERROR, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_TRUE, GET_ACTIVE_JOBS_FILTER_FOR_MAIN_FALSE, IS_LOADING,
    JOB_UPDATE_ACTIVE_MAIN, JOB_UPDATE_ACTIVE_LOADING, JOB_UPDATE_ACTIVE_ERROR,
} from "../type"

export const getActiveJobsFilterForMain = (perPage: number, PageNo: number, state: string, categories: string, jobRole: string, status: string, search: string, bannerSelected: boolean, jobType: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: true,
        })
        let URL = `userPanel/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${PageNo}`
        if (state) {
            URL = URL.concat(`&state=${state}`)
        }
        if (categories) {
            URL = URL.concat(`&type=${categories}`)
        }
        if (jobType) {
            URL = URL.concat(`&jobType=${jobType}`)
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
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&created_by=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        if (bannerSelected === true || bannerSelected === false) {
            URL = URL.concat(`&bannerSelected=${bannerSelected}`)
        }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        await ApiPostNoAuth(URL, {})
            .then((res) => {
                if (bannerSelected === true) {
                    dispatch({
                        type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_TRUE,
                        payload: res
                    })
                }
                else if (bannerSelected === false) {
                    dispatch({
                        type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_FALSE,
                        payload: res
                    })
                } else {
                    dispatch({
                        type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN,
                        payload: res
                    })
                }
            }).catch((error) => {
                console.log(error)
            })
        dispatch({
            type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_ERROR,
            payload: err
        })
        dispatch({
            type: GET_ACTIVE_JOBS_FILTER_FOR_MAIN_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const updateJobForActive = (id: any, body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: JOB_UPDATE_ACTIVE_LOADING,
            payload: true
        })
        await ApiPost(`job/update?jobId=${id}&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}`, body)
            .then((res: any) => {
                dispatch({
                    type: JOB_UPDATE_ACTIVE_MAIN,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error)
                // toast.error("Somthing Wrong")
            })
        dispatch({
            type: JOB_UPDATE_ACTIVE_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: JOB_UPDATE_ACTIVE_ERROR,
            payload: err
        })
        dispatch({
            type: JOB_UPDATE_ACTIVE_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

