
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData"
import { GET_ALL_USER, GET_ALL_USERL_LOADING, GET_ALL_USER_ERROR, IS_LOADING } from "../type"

export const getAllUser = (type: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ALL_USERL_LOADING,
            payload: true
        })
        let URL = `userPanel/auth/allUsers`
        if (type) {
            URL = URL.concat(`?type=${type}`);
        }
        await ApiGetNoAuth(URL)
            .then((res) => {
                dispatch({
                    type: GET_ALL_USER,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_USERL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ALL_USER_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ALL_USERL_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}