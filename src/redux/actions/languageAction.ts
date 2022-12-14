import { ApiGet, ApiGetNoAuth, ApiPost } from "../../helper/API/ApiData"
import { ADD_LANGUAGE, ADD_LANGUAGE_ERROR, ADD_LANGUAGE_LOADING, GET_LANGUAGE, GET_LANGUAGE_BY_NAME, GET_LANGUAGE_BY_NAME_ERROR, GET_LANGUAGE_BY_NAME_LOADING, GET_LANGUAGE_ERROR, GET_LANGUAGE_LOADING, IS_LOADING } from "../type"

export const addLanguageAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: ADD_LANGUAGE_LOADING,
            payload: true
        })
        await ApiPost("language/addLanguage", body)
            .then((res) => {
                dispatch({
                    type: ADD_LANGUAGE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_LANGUAGE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: ADD_LANGUAGE_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_LANGUAGE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const getLanguageAction = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: GET_LANGUAGE_LOADING,
            payload: true
        })
        await ApiGetNoAuth("language/getLanguage")
            .then((res) => {
                dispatch({
                    type: GET_LANGUAGE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_LANGUAGE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: GET_LANGUAGE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_LANGUAGE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getLanguageByNameAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })

        dispatch({
            type: GET_LANGUAGE_BY_NAME_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`language/getLanguageByName/name=${body}`)
            .then((res) => {
                dispatch({
                    type: GET_LANGUAGE_BY_NAME,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_LANGUAGE_BY_NAME_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {

        dispatch({
            type: GET_LANGUAGE_BY_NAME_ERROR,
            payload: err
        })

        dispatch({
            type: GET_LANGUAGE_BY_NAME_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}