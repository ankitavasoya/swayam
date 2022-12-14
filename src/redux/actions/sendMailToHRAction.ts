import { ApiPost, ApiPostNoAuth } from "../../helper/API/ApiData"
import { IS_LOADING, SEND_MAIL_TO_HR, SEND_MAIL_TO_HR_ERROR, SEND_MAIL_TO_HR_LOADING } from "../type"


export const sendMail = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: SEND_MAIL_TO_HR_LOADING,
            payload: true,
        })
        await ApiPostNoAuth(`userPanel/sendMailToHR`, body)
            .then((res) => {
                dispatch({
                    type: SEND_MAIL_TO_HR,
                    payload: res,
                })
            }).catch((error) => {
                console.log(error);
            })

        dispatch({
            type: SEND_MAIL_TO_HR_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: SEND_MAIL_TO_HR_ERROR,
            payload: err
        })
        dispatch({
            type: SEND_MAIL_TO_HR_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

