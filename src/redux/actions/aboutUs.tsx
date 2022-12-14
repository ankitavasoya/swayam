import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_ABOUT_US, GET_ABOUT_US_LOADING, GET_ABOUT_US_ERROR, IS_LOADING, GET_WOMEN_TESTIMONIAL, GET_WOMEN_TESTIMONIAL_LOADING, GET_WOMEN_TESTIMONIAL_ERROR } from "../type"

export const getAboutUs = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ABOUT_US_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`aboutUs/getAboutUs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_ABOUT_US,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ABOUT_US_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ABOUT_US_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ABOUT_US_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getWomenTestimonial = (per_page:number,page_number:number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_WOMEN_TESTIMONIAL_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getWomenTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                dispatch({
                    type: GET_WOMEN_TESTIMONIAL,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_WOMEN_TESTIMONIAL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_WOMEN_TESTIMONIAL_ERROR,
            payload: err
        })

        dispatch({
            type: GET_WOMEN_TESTIMONIAL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}