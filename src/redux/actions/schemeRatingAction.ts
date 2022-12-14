import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPut } from "../../helper/API/ApiData"
import { ADD_SCHEMES_RATING, ADD_SCHEMES_RATING_ERROR, ADD_SCHEMES_RATING_LOADING, GET_SCHEMES_RATING, GET_SCHEMES_RATING_ERROR, GET_SCHEMES_RATING_LOADING, IS_LOADING, SPECIFIC_SCHEMES_RATING, SPECIFIC_SCHEMES_RATING_ERROR, SPECIFIC_SCHEMES_RATING_LOADING } from "../type"


export const addSchemeRating = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_SCHEMES_RATING_LOADING,
            payload: true
        })
        await ApiPost(`schemeRating/addSchemeRating`, body)
            .then((res) => {
                dispatch({
                    type: ADD_SCHEMES_RATING,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: ADD_SCHEMES_RATING_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}


export const getSchemeRating = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SCHEMES_RATING_LOADING,
            payload: true
        })
        await ApiGet(`schemeRating/getSchemeRatings`)
            .then((res) => {
                dispatch({
                    type: GET_SCHEMES_RATING,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_SCHEMES_RATING_ERROR,
            payload: err
        })

        dispatch({
            type: GET_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const specificSchemesRating = (schemeId: any, perPage: number, pageNumber: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: SPECIFIC_SCHEMES_RATING_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/specificSchemeRatings?scheme_id=${schemeId}&per_page=${perPage}&page_number=${pageNumber}`)
            .then((res) => {
                dispatch({
                    type: SPECIFIC_SCHEMES_RATING,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: SPECIFIC_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: SPECIFIC_SCHEMES_RATING_ERROR,
            payload: err
        })

        dispatch({
            type: SPECIFIC_SCHEMES_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}



