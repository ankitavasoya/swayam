import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { IS_LOADING, GET_DISTRICT_LOADING, GET_DISTRICT_ERROR, GET_DISTRICT } from "../type"

export const getDistrict = (stateId: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_DISTRICT_LOADING,
            payload: true,
        })
        await ApiGet(`district/getDistrict?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&stateId=${stateId}`)
            .then((res) => {
                dispatch({
                    type: GET_DISTRICT,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_DISTRICT_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_DISTRICT_ERROR,
            payload: err
        })
        dispatch({
            type: GET_DISTRICT_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

