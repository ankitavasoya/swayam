import { log } from "console"
import STORAGEKEY from "../../config/APP/app.config"
import { ApiGet, ApiPost } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { ADD_JOB_APPLICATION, ADD_JOB_APPLICATION_ERROR, ADD_JOB_APPLICATION_LODAING, IS_LOADING, JOB_APPLICATION_COUNT, JOB_APPLICATION_COUNT_LOADING, JOB_APPLICATION_COUNT_ERROR, GET_ALL_JOB_APPLICATION_LOADING, GET_ALL_JOB_APPLICATION_ERROR, GET_ALL_JOB_APPLICATION, UPDATE_JOB_APPLICATION_LOADING, UPDATE_JOB_APPLICATION, UPDATE_JOB_APPLICATION_ERROR, GET_JOB_APPLICATION, GET_JOB_APPLICATION_LOADING, GET_JOB_APPLICATION_ERROR } from "../type"

export const AddJobApplication = (body: any) => async (dispatch: any) => {

    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_JOB_APPLICATION_LODAING,
            payload: true
        })

        await ApiPost(`jobApplication/addJobApplication?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res) => {
                dispatch({
                    type: ADD_JOB_APPLICATION,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_JOB_APPLICATION_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: ADD_JOB_APPLICATION_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_JOB_APPLICATION_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const jobApplicationCount = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: JOB_APPLICATION_COUNT_LOADING,
            payload: true
        })
        await ApiPost(`jobApplication/jobApplicationsCount?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res) => {
                dispatch({
                    type: JOB_APPLICATION_COUNT,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: JOB_APPLICATION_COUNT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: JOB_APPLICATION_COUNT_ERROR,
            payload: err
        })

        dispatch({
            type: JOB_APPLICATION_COUNT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getAllJobApplications = (perPage: number, pageNo: number, jobRole: string, jobId: string, selected: any, hired: any, jobCategoryId: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ALL_JOB_APPLICATION_LOADING,
            payload: true
        })
        let URL = `jobApplication/getAllJobApplications?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
        if (perPage) {
            URL = URL.concat(`&per_page=${perPage}`)
        }
        if (pageNo) {
            URL = URL.concat(`&page_number=${pageNo}`)
        }
        if (jobRole) {
            URL = URL.concat(`&jobRole=${jobRole}`)
        }
        if (jobId) {
            URL = URL.concat(`&jobId=${jobId}`)
        }
        // if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
        //     URL = URL.concat(`&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        // }
        if (selected) {
            URL = URL.concat(`&selected=${selected}`)
        }
        if (hired) {
            URL = URL.concat(`&hired=${hired}`)
        }
        if (jobCategoryId) {
            URL = URL.concat(`&jobCategoryId=${jobCategoryId}`)
        }
        await ApiGet(URL)
            .then((res) => {
                dispatch({
                    type: GET_ALL_JOB_APPLICATION,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_ALL_JOB_APPLICATION_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ALL_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const updateJobApplication = (id: any, selected: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: UPDATE_JOB_APPLICATION_LOADING,
            payload: true
        })
        await ApiPost(`jobApplication/updateIsSelected?id=${id}&selected=${selected}&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}&userType=EMPLOYER`, {})
            .then((res) => {
                dispatch({
                    type: UPDATE_JOB_APPLICATION,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: UPDATE_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: UPDATE_JOB_APPLICATION_ERROR,
            payload: err
        })

        dispatch({
            type: UPDATE_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getJobApplication = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_JOB_APPLICATION_LOADING,
            payload: true
        })
        await ApiGet(`jobApplication/getAllJobApplication?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_JOB_APPLICATION,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOB_APPLICATION_ERROR,
            payload: err
        })

        dispatch({
            type: GET_JOB_APPLICATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}