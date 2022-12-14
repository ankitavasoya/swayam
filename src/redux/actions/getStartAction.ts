import { ApiPost } from "../../helper/API/ApiData"
import { ADD_GET_STARTED, ADD_GET_STARTED_ERROR, ADD_GET_STARTED_LODAING, IS_LOADING } from "../type"

export const getStarted = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_GET_STARTED_LODAING,
            payload: true
        })

        await ApiPost(`getStarted/addGetStarted`, body)
            .then((res) => {
                dispatch({
                    type: ADD_GET_STARTED,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_GET_STARTED_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: ADD_GET_STARTED_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_GET_STARTED_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}


