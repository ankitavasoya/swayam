import { log } from "console";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPostNoAuth, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import { GET_ALL_SCHEMES, GET_SCHEMES_CATEGORIES_ERROR, GET_ALL_SCHEMES_ERROR, GET_ALL_SCHEMES_LOADING, GET_ONE_SCHEMES_BY_ID, GET_ONE_SCHEMES_BY_ID_ERROR, GET_ONE_SCHEMES_BY_ID_LOADING, GET_SCHEMES_CATEGORIE, GET_SCHEMES_CATEGORIES_BENIFITS, GET_SCHEMES_CATEGORIES_BENIFITS_ERROR, GET_SCHEMES_CATEGORIES_BENIFITS_LOADING, GET_SCHEMES_CATEGORIES_LOADING, IS_LOADING, ADD_ENROLLED_SCHEMES_LOADING, ADD_ENROLLED_SCHEMES, ADD_ENROLLED_SCHEMES_ERROR, ADD_SAVEED_SCHEMES_LOADING, ADD_SAVEED_SCHEMES, ADD_SAVEED_SCHEMES_ERROR, GET_ALL_SCHEMES_TRUE, GET_ALL_SCHEMES_FALSE, DELETE_SAVEED_SCHEMES_LOADING, DELETE_SAVEED_SCHEMES, DELETE_SAVEED_SCHEMES_ERROR, DELETE_ENROLL_SCHEMES_LOADING, DELETE_ENROLL_SCHEMES, DELETE_ENROLL_SCHEMES_ERROR, GET_SCHEMES_RECOMMENDATION_LOADING, GET_SCHEMES_RECOMMENDATION_ERROR, GET_SCHEMES_RECOMMENDATION } from "../type"

let page_number: any, per_page: any, status: any, schemeBenifit: any, schemeCategory: any, search: any, rating: any, bannerSelected: any, user_id: any, body: any;
export const schemesCategory = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SCHEMES_CATEGORIES_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getSchemeCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_SCHEMES_CATEGORIE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_SCHEMES_CATEGORIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_SCHEMES_CATEGORIES_ERROR,
            payload: err
        })

        dispatch({
            type: GET_SCHEMES_CATEGORIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const schemeBenifits = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SCHEMES_CATEGORIES_BENIFITS_LOADING,
            payload: true
        })

        await ApiGetNoAuth(`userPanel/getSchemeBenifits?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_SCHEMES_CATEGORIES_BENIFITS,
                    payload: res
                })
            })
            .catch((error) => {
                console.log(error)
            })
        dispatch({
            type: GET_SCHEMES_CATEGORIES_BENIFITS_LOADING,
            payload: false
        })
        dispatch({
            typeof: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_SCHEMES_CATEGORIES_BENIFITS_ERROR,
            payload: err
        })
        dispatch({
            type: GET_SCHEMES_CATEGORIES_BENIFITS_LOADING,
            payload: err
        })
        dispatch({
            type: IS_LOADING,
            payload: err
        })
    }
}

export const allScheme = (perPage: number, pageNumber: number, statusData: string, schemeBenifitData?: string, schemeCategoryData?: any, searchData?: string, ratingData?: string, bannerSelectedData?: any, userIdData?: any, bodyData?: any) => async (dispatch: any) => {
    // per_page = perPage;
    // page_number = pageNumber;
    // status = statusData;
    // schemeBenifit = schemeBenifitData;
    // schemeCategory = schemeCategoryData;
    // search = searchData;
    // rating = ratingData;
    // bannerSelected = bannerSelectedData;
    // user_id = userIdData

    if (bodyData) {
        body = { locations: [bodyData] }
    } else {
        body = {}
    }
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ALL_SCHEMES_LOADING,
            payload: true
        })
        let URL = `userPanel/schemesWithFilterAndPagination?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
        if (statusData) {
            URL = URL.concat(`&status=${statusData}`)
        }
        if (schemeBenifitData) {
            URL = URL.concat(`&schemeBenifit=${schemeBenifitData}`)
        }
        if (schemeCategoryData !== '') {
            URL = URL.concat(`&schemeCategory=${schemeCategoryData}`)
        }
        if (searchData) {
            URL = URL.concat(`&search=${searchData}`)
        }
        if (ratingData) {
            URL = URL.concat(`&rating=${ratingData}`)
        }
        if (bannerSelectedData !== "" && bannerSelectedData !== undefined) {
            URL = URL.concat(`&bannerSelected=${bannerSelectedData}`)
        }
        if (userIdData) {
            URL = URL.concat(`&user_id=${userIdData}`)
        }
        await ApiPostNoAuth(URL, body)
            .then((res) => {
                if (bannerSelectedData === true) {
                    dispatch({
                        type: GET_ALL_SCHEMES_TRUE,
                        payload: res
                    })
                }
                else if (bannerSelectedData === false) {
                    dispatch({
                        type: GET_ALL_SCHEMES_FALSE,
                        // type: GET_ALL_SCHEMES_FALSE,
                        payload: res
                    })
                } else {
                    dispatch({
                        type: GET_ALL_SCHEMES,
                        payload: res
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ALL_SCHEMES_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_ALL_SCHEMES_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ALL_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getOneScheme = (id: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_ONE_SCHEMES_BY_ID_LOADING,
            payload: true
        })
        let URL = `userPanel/getOneSchemeById?id=${id}`
        // if (user_id) {
        //     URL = URL.concat(`&user_id=${user_id}`);
        // }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`);
        }
        ApiGetNoAuth(URL)
            .then((res) => {
                dispatch({
                    type: GET_ONE_SCHEMES_BY_ID,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_ONE_SCHEMES_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_ONE_SCHEMES_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: GET_ONE_SCHEMES_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addEnrolledSchemesAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_ENROLLED_SCHEMES_LOADING,
            payload: true
        })
        ApiPost(`enrolledScheme/addEnrolledScheme`, { scheme: body })
            .then((res) => {
                dispatch({
                    type: ADD_ENROLLED_SCHEMES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_ENROLLED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_ENROLLED_SCHEMES_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_ENROLLED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addSaveedSchemesAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_SAVEED_SCHEMES_LOADING,
            payload: true
        })
        ApiPost(`savedScheme/addSavedScheme`, { scheme: body })
            .then((res) => {
                dispatch({
                    type: ADD_SAVEED_SCHEMES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_SAVEED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_SAVEED_SCHEMES_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_SAVEED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deleteSaveedSchemesAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_SAVEED_SCHEMES_LOADING,
            payload: true
        })
        ApiPost(`savedScheme/deleteSavedScheme`, { scheme_id: body, user_id: AuthStorage.getStorageData(STORAGEKEY.userId) })
            .then((res) => {
                dispatch({
                    type: DELETE_SAVEED_SCHEMES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: DELETE_SAVEED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_SAVEED_SCHEMES_ERROR,
            payload: err
        })

        dispatch({
            type: DELETE_SAVEED_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deleteErollSchemesAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_ENROLL_SCHEMES_LOADING,
            payload: true
        })
        ApiPost(`enrolledScheme/deleteEnrolledScheme`, { scheme_id: body, user_id: AuthStorage.getStorageData(STORAGEKEY.userId) })
            .then((res) => {
                dispatch({
                    type: DELETE_ENROLL_SCHEMES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: DELETE_ENROLL_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_ENROLL_SCHEMES_ERROR,
            payload: err
        })

        dispatch({
            type: DELETE_ENROLL_SCHEMES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const getRecomendedSchemes = (schemeCategory: any, userId: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SCHEMES_RECOMMENDATION_LOADING,
            payload: true
        })
        let URL = `scheme/getRecomendedSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
        if (schemeCategory) {
            URL = URL.concat(`&schemeCategory=${schemeCategory}`)
        }
        if (userId) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        ApiGetNoAuth(URL)
            .then((res) => {
                dispatch({
                    type: GET_SCHEMES_RECOMMENDATION,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_SCHEMES_RECOMMENDATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_SCHEMES_RECOMMENDATION_ERROR,
            payload: err
        })

        dispatch({
            type: GET_SCHEMES_RECOMMENDATION_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}




