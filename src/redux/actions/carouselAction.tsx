import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_CAROUSEL, GET_CAROUSEL_ERROR, GET_CAROUSEL_LOADING, IS_LOADING } from "../type"

export const getCarousel = (perPage: number, pageNumber: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_CAROUSEL_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`carousel/getCarousels?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
            .then((res) => {
                dispatch({
                    type: GET_CAROUSEL,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_CAROUSEL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_CAROUSEL_ERROR,
            payload: err
        })

        dispatch({
            type: GET_CAROUSEL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}