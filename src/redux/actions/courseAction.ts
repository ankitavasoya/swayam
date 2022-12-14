import { log } from "console";
import { toast } from "react-toastify";
import STORAGEKEY from "../../config/APP/app.config"
import { ApiDelete, ApiGet, ApiGetNoAuth, ApiPost, ApiPostNoAuth, ApiPut } from "../../helper/API/ApiData"
import AuthStorage from "../../helper/AuthStorage"
import {
    GET_COURSE_CATEGORY, GET_COURSE_CATEGORY_LOADING, GET_COURSE, GET_COURSE_ERROR, GET_COURSE_LOADING, IS_LOADING,
    UPDATE_COURSE_VIEW_COUNT, UPDATE_COURSE_VIEW_COUNT_LOADING, UPDATE_COURSE_VIEW_COUNT_ERROR, GET_COURSE_CATEGORIES, GET_COURSE_CATEGORIES_LOADING, GET_COURSE_CATEGORIES_ERROR,
    GET_COURSES, GET_COURSES_LOADING, GET_COURSES_ERROR, GET_COURSES_BY_ID, GET_COURSES_BY_ID_LOADING, GET_COURSES_BY_ID_ERROR,
    ADD_SAVE_COURSE, ADD_SAVE_COURSE_LOADING, ADD_SAVE_COURSE_ERROR, ADD_ENROLLED_COURSE, ADD_ENROLLED_COURSE_LOADING, ADD_ENROLLED_COURSE_ERROR,
    ADD_COURSE_RATING, ADD_COURSE_RATING_LOADING, ADD_COURSE_RATING_ERROR, GET_SAVE_COURSE, GET_SAVE_COURSE_LOADING, GET_SAVE_COURSE_ERROR,
    GET_BANNER_TRUE, GET_BANNER_TRUE_LOADING, GET_BANNER_TRUE_ERROR, GET_BANNER_FALSE, GET_BANNER_FALSE_LOADING, GET_BANNER_FALSE_ERROR,
    GET_COURSES_FOR_SAVE_AND_ENROLLED, GET_COURSES_FOR_SAVE_AND_ENROLLED_LOADING, GET_COURSES_FOR_SAVE_AND_ENROLLED_ERROR, GET_COURSE_RATING,
    GET_COURSE_RATING_LOADING, GET_COURSE_RATING_ERROR, GET_SPECIFIC_COURSE_RATINGS, GET_SPECIFIC_COURSE_RATINGS_LOADING, GET_SPECIFIC_COURSE_RATINGS_ERROR,
    DELETE_SAVE_COURSE, DELETE_SAVE_COURSE_LOADING, DELETE_SAVE_COURSE_ERROR, DELETE_ENROLLED_COURSE, DELETE_ENROLLED_COURSE_LOADING, DELETE_ENROLLED_COURSE_ERROR, UPDATE_COURSE_LOADING, UPDATE_COURSE, UPDATE_COURSE_ERROR, ADD_PARTNER_COURSE_LOADING, ADD_PARTNER_COURSE, ADD_PARTNER_COURSE_ERROR,
    EDIT_PARTNER_COURSE, EDIT_PARTNER_COURSE_LOADING, EDIT_PARTNER_COURSE_ERROR, GET_OFFLINE_COURSES, GET_ONLINE_COURSES, GET_OTHER_COURSES_LOADING, GET_OTHER_COURSES, GET_OTHER_COURSES_ERROR, GET_QUALIFICATIONS_LOADING, GET_QUALIFICATIONS, GET_QUALIFICATIONS_ERROR,



} from "../type"

let per_Page: number, page_Num: number, mode: any, course_ID: number, ID: number, user_Id: number, State: any, CourseCategory: any, Status: any, Search: any, CourseRating: any, BannerSelected: any

export const getCouresCategoryAction = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSE_CATEGORY_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`course/getCategories`)
            .then((res) => {
                dispatch({
                    type: GET_COURSE_CATEGORY,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSE_CATEGORY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_COURSE_CATEGORY,
            payload: err
        })

        dispatch({
            type: GET_COURSE_CATEGORY_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const updateCourseViewCountAction = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: UPDATE_COURSE_VIEW_COUNT_LOADING,
            payload: true
        })
        await ApiPostNoAuth(`userPanel/updateCourseViewCount`, body)
            .then((res) => {
                dispatch({
                    type: UPDATE_COURSE_VIEW_COUNT,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: UPDATE_COURSE_VIEW_COUNT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: UPDATE_COURSE_VIEW_COUNT_ERROR,
            payload: err
        })

        dispatch({
            type: UPDATE_COURSE_VIEW_COUNT_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getCourseCategoriesAction = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSE_CATEGORIES_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getCourseCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res) => {
                dispatch({
                    type: GET_COURSE_CATEGORIES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSE_CATEGORIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_COURSE_CATEGORIES_ERROR,
            payload: err
        })

        dispatch({
            type: GET_COURSE_CATEGORIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getCoursesAction = (perPage: number, PageNo: number, state?: any, courseCategory?: any, status?: any, search?: string, rating?: any, bannerSelected?: any, mode?: string) => async (dispatch: any) => {
    per_Page = perPage
    page_Num = PageNo
    State = state
    CourseCategory = courseCategory
    Status = status
    Search = search
    CourseRating = rating
    BannerSelected = bannerSelected
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSES_LOADING,
            payload: true
        })
        let URL = `userPanel/getCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
        if (perPage) {
            URL = URL.concat(`&per_page=${perPage}`);
        } if (PageNo) {
            URL = URL.concat(`&page_number=${PageNo}`);
        }
        if (state) {
            URL = URL.concat(`&state=${state}`);
        }
        if (courseCategory) {
            URL = URL.concat(`&categoryId=${courseCategory}`)
        }
        if (status) {
            URL = URL.concat(`&status=${status}`)
        }
        if (search) {
            URL = URL.concat(`&search=${search}`)
        }
        if (rating) {
            URL = URL.concat(`&rating=${rating}`)
        }
        if (bannerSelected !== "" && bannerSelected !== undefined) {
            URL = URL.concat(`&bannerSelected=${bannerSelected}`)
        }
        if (AuthStorage.getStorageData(STORAGEKEY.userId)) {
            URL = URL.concat(`&user_id=${AuthStorage.getStorageData(STORAGEKEY.userId)}`)
        }
        if (mode) {
            URL = URL.concat(`&mode=${mode}`)
        }
        await ApiGetNoAuth(URL)
            .then((res) => {
                if (bannerSelected === true) {
                    dispatch({
                        type: GET_BANNER_TRUE,
                        payload: res
                    })
                }
                else if (bannerSelected === false) {
                    // dispatch({
                    //     type: GET_BANNER_FALSE,
                    //     payload: res
                    // })
                    if (mode === "ONLINE") {
                        dispatch({
                            type: GET_ONLINE_COURSES,
                            payload: res
                        })
                    }
                    else if (mode === "OFFLINE") {
                        dispatch({
                            type: GET_OFFLINE_COURSES,
                            payload: res
                        })
                    }
                    dispatch({
                        type: GET_BANNER_FALSE,
                        payload: res
                    })
                }
                else {
                    dispatch({
                        type: GET_COURSES,
                        payload: res
                    })
                }

            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSES_LOADING,
            payload: false
        })
        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: GET_COURSES_ERROR,
            payload: err
        })

        dispatch({
            type: GET_COURSES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

//-- for save & enrolled---

export const getCourseById = (id: any, user_id: any) => async (dispatch: any) => {
    ID = id;
    user_Id = user_id;
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSES_BY_ID_LOADING,
            payload: true
        })

        let URL = `userPanel/getCourse?id=${id}&langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`

        if (user_id) {
            URL = URL.concat(`&user_id=${user_id}`);
        }

        await ApiGet(URL)
            .then((res) => {
                dispatch({
                    type: GET_COURSES_BY_ID,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSE_CATEGORIES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_COURSES_BY_ID_ERROR,
            payload: err
        })

        dispatch({
            type: GET_COURSES_BY_ID_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const addSavedCourse = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_SAVE_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`savedCourse/addSavedCourse`, { course: body })
            .then((res: any) => {
                // if(res.status === 200){
                //    dispatch(getCourseById(body,user_Id))
                // //    dispatch(getCourseById(Id,user_Id))
                // }
                dispatch({
                    type: ADD_SAVE_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_SAVE_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const addEnrolledCourse = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_ENROLLED_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`enrolledCourse/addEnrolledCourse`, { course: body })
            .then((res: any) => {
                // if(res.status === 200){
                //     dispatch(getCourseById(ID,user_Id))
                // }
                dispatch({
                    type: ADD_ENROLLED_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_ENROLLED_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_ENROLLED_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_ENROLLED_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addCourseRating = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_COURSE_RATING_LOADING,
            payload: true
        })
        await ApiPost(`courseRating/addCourseRating`, body)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getSpecificCourseRatings(course_ID, per_Page, page_Num))
                }
                dispatch({
                    type: ADD_COURSE_RATING,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: ADD_COURSE_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_COURSE_RATING_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_COURSE_RATING_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getSavedCourses = (per_page: number, page_num: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SAVE_COURSE_LOADING,
            payload: true
        })
        await ApiGet(`savedCourse/getSavedCourses?per_page=${per_page}&page_number=${page_num}`,)
            .then((res) => {
                dispatch({
                    type: GET_SAVE_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_SAVE_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getCourseRatings = (per_page: number, page_number: number) => async (dispatch: any) => {
    page_Num = page_number;
    per_Page = per_page;
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSE_RATING_LOADING,
            payload: true
        })
        await ApiGet(`courseRating/getCourseRatings?per_page=${per_page}&page_number=${page_number}`)
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

export const getSpecificCourseRatings = (course_id: any, per_page: number, page_number: number) => async (dispatch: any) => {
    page_Num = page_number;
    per_Page = per_page;
    course_ID = course_id;
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_SPECIFIC_COURSE_RATINGS_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/specificCourseRatings?course_id=${course_id}&per_page=${per_page}&page_number=${page_number}`)
            .then((res) => {
                dispatch({
                    type: GET_SPECIFIC_COURSE_RATINGS,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_SPECIFIC_COURSE_RATINGS_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_SPECIFIC_COURSE_RATINGS_ERROR,
            payload: err
        })

        dispatch({
            type: GET_SPECIFIC_COURSE_RATINGS_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deleteSavedCourse = (body: any) => async (dispatch: any) => {

    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_SAVE_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`savedCourse/deleteSavedCourse`, body)
            .then((res: any) => {
                // if(res.status === 200){
                //     dispatch(getCourseById(ID,user_Id))
                // }
                dispatch({
                    type: DELETE_SAVE_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: DELETE_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_SAVE_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: DELETE_SAVE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const deleteEnrolledCourse = (body: any) => async (dispatch: any) => {

    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: DELETE_ENROLLED_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`enrolledCourse/deleteEnrolledCourse`, body)
            .then((res: any) => {
                // if(res.status === 200){
                //     dispatch(getCourseById(ID,user_Id))
                // }
                dispatch({
                    type: DELETE_ENROLLED_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: DELETE_ENROLLED_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: DELETE_ENROLLED_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: DELETE_ENROLLED_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
export const updateCourses = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: UPDATE_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`course/editSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getCoursesAction(per_Page, page_Num, "", "", Status))
                }
                dispatch({
                    type: UPDATE_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: UPDATE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })

    }
    catch (err) {
        dispatch({
            type: UPDATE_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: UPDATE_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const getSingleCourseById = (id: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_COURSE_LOADING,
            payload: true
        })
        await ApiGetNoAuth(`userPanel/getCourse?id=${id}&langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            // &user_id=${user_id} 
            .then((res) => {
                dispatch({
                    type: GET_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
            })
        dispatch({
            type: GET_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: GET_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const editPartnerCourse = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: EDIT_PARTNER_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(getCoursesAction(per_Page, page_Num, "", "", Status))
                }
                dispatch({
                    type: EDIT_PARTNER_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: EDIT_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: EDIT_PARTNER_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: EDIT_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const addPartnerCourse = (body: any) => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: ADD_PARTNER_COURSE_LOADING,
            payload: true
        })
        await ApiPost(`course/addPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&mode=PARTNER`, body)
            .then((res: any) => {
                dispatch({
                    type: ADD_PARTNER_COURSE,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: ADD_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: ADD_PARTNER_COURSE_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const otherCourse = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_OTHER_COURSES_LOADING,
            payload: true
        })
        await ApiGet(`otherCourse/getOtherCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res: any) => {
                dispatch({
                    type: GET_OTHER_COURSES,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: GET_OTHER_COURSES_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_OTHER_COURSES_ERROR,
            payload: err
        })

        dispatch({
            type: ADD_PARTNER_COURSE_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}

export const qualification = () => async (dispatch: any) => {
    try {
        dispatch({
            type: IS_LOADING,
            payload: true
        })
        dispatch({
            type: GET_QUALIFICATIONS_LOADING,
            payload: true
        })
        await ApiGet(`qualification/getqualifications?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res: any) => {
                dispatch({
                    type: GET_QUALIFICATIONS,
                    payload: res
                })
            }).catch((error) => {
                console.log(error);
                // toast.error("Somthing went wrong")
            })
        dispatch({
            type: GET_QUALIFICATIONS_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
    catch (err) {
        dispatch({
            type: GET_QUALIFICATIONS_ERROR,
            payload: err
        })

        dispatch({
            type: GET_QUALIFICATIONS_LOADING,
            payload: false
        })

        dispatch({
            type: IS_LOADING,
            payload: false
        })
    }
}
