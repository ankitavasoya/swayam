import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiPost, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { ADD_SAVED_NEWS, ADD_SAVED_NEWS_ERROR, ADD_SAVED_NEWS_LODAING, DELETE_SAVED_NEWS, DELETE_SAVED_NEWS_ERROR, DELETE_SAVED_NEWS_LODAING, GET_ARTICLE, GET_ARTICLE_ERROR, GET_ARTICLE_LODAING, IS_LOADING } from "../type"

let page_number: any, per_page: any
export const getArticle = (perPage: number, pageNumber: number, userId: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ARTICLE_LODAING,
            payload: true
        })
        let URL = `article/getArticles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
        if (userId) {
            URL = URL.concat(`&user_id=${userId}`)
        }
        await ApiGet(URL)
            .then((res) => {
                dispatch({
                    type: GET_ARTICLE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ARTICLE_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ARTICLE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ARTICLE_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addSavedNews = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_SAVED_NEWS_LODAING,
            payload: true
        })
        await ApiPost(`savedNews/addSavedNews`, body)
            .then((res) => {
                dispatch({
                    type: ADD_SAVED_NEWS,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_SAVED_NEWS_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: ADD_SAVED_NEWS_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ARTICLE_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deleteSavedNews = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_SAVED_NEWS_LODAING,
            payload: true
        })
        await ApiPost(`savedNews/deleteSavedNews`, body)
            .then((res) => {
                dispatch({
                    type: DELETE_SAVED_NEWS,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: DELETE_SAVED_NEWS_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: DELETE_SAVED_NEWS_ERROR,
            payload: err
        })

        dispatch({
            type: DELETE_SAVED_NEWS_LODAING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}