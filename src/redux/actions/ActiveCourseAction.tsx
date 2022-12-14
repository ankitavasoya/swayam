
import { toast } from "react-toastify";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiGet, ApiGetNoAuth, ApiPost } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import {
    GET_ACTIVE_COURSE_FILTER_FOR_MAIN, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_ERROR, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_TRUE, GET_ACTIVE_COURSE_FILTER_FOR_MAIN_FALSE, IS_LOADING,
    EDIT_ACTIVE_PARTNER_COURSE, EDIT_ACTIVE_PARTNER_COURSE_LOADING, EDIT_ACTIVE_PARTNER_COURSE_ERROR, DELETE_PARTNER_COURSE_LOADING, DELETE_PARTNER_COURSE, DELETE_PARTNER_COURSE_ERROR,
} from "../type"


export const getPatnerCourses = (perPage: number, PageNo: number, state?: any, courseCategory?: any, status?: any, search?: string, rating?: any, bannerSelected?: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING,
            payload: true
        })
        let URL = `userPanel/getCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${PageNo}&mode=PARTNER`

        if (state) {
            URL = URL.concat(`&state=${state}`);
        }
        if (courseCategory) {
            URL = URL.concat(`&categoryId=${courseCategory}`)
        }
        if (status) {
            URL = URL.concat(`&status=${status}`)
        }
        if (search) {
            URL = URL.concat(`&search=${search}`)
        }
        if (rating) {
            URL = URL.concat(`&rating=${rating}`)
        }
        if (bannerSelected !== "" && bannerSelected !== undefined) {
            URL = URL.concat(`&bannerSelected=${bannerSelected}`)
        }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&createdByUser=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }

        await ApiGetNoAuth(URL)
            .then((res) => {

                if (bannerSelected === true) {
                    dispatch({
                        type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_TRUE,
                        payload: res
                    })
                }

                else if (bannerSelected === false) {
                    dispatch({
                        type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_FALSE,
                        payload: res
                    })
                }

                else {
                    dispatch({
                        type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN,
                        payload: res
                    })
                }

            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ACTIVE_COURSE_FILTER_FOR_MAIN_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const editActivePartnerCourse = (body: any, categoryId: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: EDIT_ACTIVE_PARTNER_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}&categoryId=${categoryId}`, body)
            .then((res: any) => {
                dispatch({
                    type: EDIT_ACTIVE_PARTNER_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: EDIT_ACTIVE_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: EDIT_ACTIVE_PARTNER_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: EDIT_ACTIVE_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deletePartnerCourse = (id: string, key: string, type: string, courseCategoryId: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_PARTNER_COURSE_LOADING,
            payload: true
        })
        await ApiGet(`course/deleteCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&courseId=${id}&key=${key}&type=${type}&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}&categoryId=${courseCategoryId}`)
            .then((res: any) => {
                dispatch({
                    type: DELETE_PARTNER_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: DELETE_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_PARTNER_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: EDIT_ACTIVE_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

