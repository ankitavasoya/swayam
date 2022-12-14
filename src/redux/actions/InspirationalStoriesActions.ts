import STORAGEKEY from "../../config/APP/app.config"
import { ApiGetNoAuth } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { INSPIRATIONAL_STORIES_ERROR, INSPIRATIONAL_STORIES_JOB, INSPIRATIONAL_STORIES_LOADING, INSPIRATIONAL_STORIES_SCHEME, IS_LOADING } from "../type"

export const inspirationalStorie = (per_page: any, page_number: any, pageType: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true,
        })
        dispatch({
            type: INSPIRATIONAL_STORIES_LOADING,
            payload: true,
        })
        let URL = `inspirationalStories/getInspirationalStories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
        if (per_page) {
            URL = URL.concat(`&per_page=${per_page}`)
        }
        if (page_number) {
            URL = URL.concat(`&page_number=${page_number}`)
        }
        if (pageType) {
            URL = URL.concat(`&pageType=${pageType}`)
        }
        await ApiGetNoAuth(URL)
            .then((res) => {
                if (pageType === "JOB") {
                    dispatch({
                        type: INSPIRATIONAL_STORIES_JOB,
                        payload: res,
                    })
                } else
                    if (pageType === "SCHEME") {
                        dispatch({
                            type: INSPIRATIONAL_STORIES_SCHEME,
                            payload: res,
                        })
                    }
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: INSPIRATIONAL_STORIES_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: INSPIRATIONAL_STORIES_ERROR,
            payload: err
        })
        dispatch({
            type: INSPIRATIONAL_STORIES_LOADING,
            payload: false,
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

