import STORAGEKEY from "../../config/APP/app.config"
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_ALL_FAQ, GET_ALL_FAQ_ERROR, GET_ALL_FAQ_LOADING, IS_LOADING } from "../type"

export const getAllFaqs = (type: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_ALL_FAQ_LOADING,
            payload: true,
        })
        await ApiGetNoAuth(`faq/getAllFaq?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&type=${type}`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_FAQ,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_FAQ_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_ALL_FAQ_ERROR,
            payload: err
        })
        dispatch({
            type: GET_ALL_FAQ_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

