import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../helper/API/ApiData"
import { GET_COURSE_RATING, GET_COURSE_RATING_ERROR, GET_COURSE_RATING_LOADING, IS_LOADING } from "../type"

export const couresRatingAction = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSE_RATING_LOADING,
            payload: true
        })
        await ApiGet(`courseRating/getCourseRating`)
            .then((res) => {
                dispatch({
                    type: GET_COURSE_RATING,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSE_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_COURSE_RATING_ERROR,
            payload: err
        })

        dispatch({
            type: GET_COURSE_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}