import { log } from "console"
import { ApiDelete, ApiGet, ApiPost, ApiPostNoAuth, ApiPut } from "../../helper/API/ApiData"
import { IS_LOADING, SIGNUP, SIGNUP_LOADING, SIGNUP_ERR, USER_AUTH_SIGNUP_LOADING, USER_AUTH_SIGNUP, USER_AUTH_SIGNUP_ERR } from "../type"

export const signupAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: SIGNUP_LOADING,
            payload: true
        })

        await ApiPostNoAuth('user/auth/signup', body)
            .then((res) => {
                dispatch({
                    type: SIGNUP,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                dispatch({
                    type: SIGNUP_ERR,
                    payload: error
                })
            })

        dispatch({
            type: SIGNUP_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: SIGNUP_ERR,
            payload: err
        })

        dispatch({
            type: SIGNUP_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
}
export const userAuthSignup = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: USER_AUTH_SIGNUP_LOADING,
            payload: true
        })
        await ApiPost(`user/auth/signup`, body)
            .then((res) => {

                dispatch({
                    type: USER_AUTH_SIGNUP,
                    payload: res,

                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            typt: USER_AUTH_SIGNUP_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: USER_AUTH_SIGNUP_ERR,
            payload: err
        })
        dispatch({
            type: USER_AUTH_SIGNUP_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false,
        })

    }
}
