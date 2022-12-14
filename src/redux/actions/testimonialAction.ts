
import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_TESTIMONIAL, GET_TESTIMONIAL_ERROR, GET_TESTIMONIAL_LODAING, IS_LOADING, GET_ALL_TESTIMONIAL, GET_ALL_TESTIMONIAL_LODAING, GET_ALL_TESTIMONIAL_ERROR} from "../type"

let page_number: any, per_page: any
export const getTestimonial = (perPage: number, pageNumber: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_TESTIMONIAL_LODAING,
            payload: true
        })
        await ApiGetNoAuth(`testimonial/getTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
            .then((res) => {
                dispatch({
                    type: GET_TESTIMONIAL,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_TESTIMONIAL_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_TESTIMONIAL_ERROR,
            payload: err
        })

        dispatch({
            type: GET_TESTIMONIAL_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getAllTestimonial = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ALL_TESTIMONIAL_LODAING,
            payload: true
        })
        await ApiGetNoAuth(`testimonial/getExportTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_TESTIMONIAL,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_TESTIMONIAL_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ALL_TESTIMONIAL_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ALL_TESTIMONIAL_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}