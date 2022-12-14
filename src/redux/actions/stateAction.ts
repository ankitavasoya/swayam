import { log } from "console"
import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { IS_LOADING, GET_STATE_LODAING, GET_STATE, GET_STATE_ERROR } from "../type"

export const getAllState = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_STATE_LODAING,
            payload: true,
        })
        await ApiGetNoAuth(`state/getState?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_STATE,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_STATE_LODAING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_STATE_ERROR,
            payload: err
        })
        dispatch({
            type: GET_STATE_LODAING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

