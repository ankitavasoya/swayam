import { log } from "console";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_BANNERS, GET_BANNERS_ERROR, GET_BANNERS_LODAING, IS_LOADING } from "../type"


let page_number: any, per_page: any
export const getBanner = (perPage: number, pageNumber: number) => async (dispatch: any) => {
    per_page = perPage;
    page_number = pageNumber;
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_BANNERS_LODAING,
            payload: true
        })
        await ApiGetNoAuth(`banner/getBanners?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
            .then((res) => {
                dispatch({
                    type: GET_BANNERS,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_BANNERS_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_BANNERS_ERROR,
            payload: err
        })

        dispatch({
            type: GET_BANNERS_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}