import STORAGEKEY from "../../config/APP/app.config"
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { IS_LOADING, GET_JOB_BY_ID_USERPANEL_LODAING, GET_JOB_BY_ID_USERPANEL_ERROR, GET_JOB_BY_ID_USERPANEL } from "../type"

export const getJobByIdUserPanel = (jobId: any) => async (dispatch: any) => {
    try {

        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: GET_JOB_BY_ID_USERPANEL_LODAING,
            payload: true,
        })
        let URL = `userPanel/getJobById?jobId=${jobId}`
        let userId = AuthStorage.getStorageData(STORAGEKEY.userId)
        if (userId) {
            URL = URL.concat(`&user_id=${userId}`)
        }
        await ApiGetNoAuth(URL)
            .then((res) => {
                dispatch({
                    type: GET_JOB_BY_ID_USERPANEL,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_JOB_BY_ID_USERPANEL_LODAING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_JOB_BY_ID_USERPANEL_ERROR,
            payload: err
        })
        dispatch({
            type: GET_JOB_BY_ID_USERPANEL_LODAING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

