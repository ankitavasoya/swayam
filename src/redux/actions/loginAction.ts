import STORAGEKEY from "../../config/APP/app.config"
import AuthStorage from "../../helper/AuthStorage"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPost2, ApiPostNoAuth, ApiPut } from "../../helper/API/ApiData"
import { IS_LOADING, LOGIN, LOGIN_LOADING, LOGIN_ERROR, FORGOT_PASSWORD_LOADING, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD, CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD, GET_USER, GET_USER_LOADING, GET_USER_ERROR, IS_PROFILEIMAGE } from "../type"
import { toast } from "react-toastify"

export const loginAction = (body: any, selectLoginType: any, signUp?: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: LOGIN_LOADING,
            payload: true
        })

        await ApiPostNoAuth('user/auth/login', body)
            .then((res: any) => {
                if (res.status === 200) {
                    if (!signUp) {
                        toast.success("Login successfull")
                    }
                    if (res.data.userCreds.userType.toLowerCase() === selectLoginType.toLowerCase()) {
                        AuthStorage.setStorageData(STORAGEKEY.token, res.data.token, true);
                        AuthStorage.setStorageData(STORAGEKEY.userId, res.data.userCreds.id, true);
                        AuthStorage.setStorageData(STORAGEKEY.userType, res.data.userCreds.userType, true);
                        AuthStorage.setStorageData(STORAGEKEY.profileImg, res.data.userCreds.avatar, true);
                        dispatch({
                            type: LOGIN,
                            payload: res
                        })

                    } else {
                        toast.error("Select valid login type")
                    }
                }
            }).catch((error) => {
                console.log(error);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error,
                })
            })

        dispatch({
            type: LOGIN_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: LOGIN_ERROR,
            payload: err
        })

        dispatch({
            type: LOGIN_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const forgotAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: FORGOT_PASSWORD_LOADING,
            payload: true
        })

        await ApiPostNoAuth('user/auth/sendForgotlink', body)
            .then((res: any) => {
                dispatch({
                    type: FORGOT_PASSWORD,
                    payload: res
                })
            })

        dispatch({
            type: FORGOT_PASSWORD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        console.log('err', err)
        dispatch({
            type: FORGOT_PASSWORD_ERROR,
            payload: err
        })

        dispatch({
            type: FORGOT_PASSWORD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const ChangePasswordAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: CHANGE_PASSWORD_LOADING,
            payload: true
        })

        await ApiPostNoAuth('user/auth/forgot', body)
            .then((res: any) => {
                dispatch({
                    type: CHANGE_PASSWORD,
                    payload: res
                })
            })

        dispatch({
            type: CHANGE_PASSWORD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: CHANGE_PASSWORD_ERROR,
            payload: err
        })

        dispatch({
            type: CHANGE_PASSWORD_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}

export const getUser = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: GET_USER_LOADING,
            payload: true
        })
        await ApiGet('user/auth/getUser')
            .then((res: any) => {
                dispatch({
                    type: GET_USER,
                    payload: res
                })
            })

        dispatch({
            type: GET_USER_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_USER_ERROR,
            payload: err
        })

        dispatch({
            type: GET_USER_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}
