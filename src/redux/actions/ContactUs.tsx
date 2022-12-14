import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { IS_LOADING, GET_CONTACTUS, GET_CONTACTUS_LODAING, GET_CONTACTUS_ERROR  } from "../type"

export const getContactUs = (langId:any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_CONTACTUS_LODAING,
            payload: true,
        })
        await ApiGetNoAuth(`contactUs/getContactUs?langId=${langId}`)
            .then((res) => {
                dispatch({
                    type: GET_CONTACTUS,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_CONTACTUS_LODAING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_CONTACTUS_ERROR,
            payload: err
        })
        dispatch({
            type: GET_CONTACTUS_LODAING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

