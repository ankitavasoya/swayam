import STORAGEKEY from "../../config/APP/app.config"
import {ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { IS_LOADING, GET_GENERALDATA, GET_GENERALDATA_LOADING, GET_GENERALDATA_ERROR } from "../type"

export const PrivancypolicyAction = (langID:any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_GENERALDATA_LOADING,
            payload: true,
        })
        await ApiGetNoAuth(`general/getGeneralData?langId=${langID}`)
            .then((res) => {
                dispatch({
                    type: GET_GENERALDATA,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_GENERALDATA_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_GENERALDATA_ERROR,
            payload: err
        })
        dispatch({
            type: GET_GENERALDATA_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

