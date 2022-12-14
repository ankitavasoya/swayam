import { ADD_LANGUAGE, ADD_LANGUAGE_ERROR, ADD_LANGUAGE_LOADING, GET_LANGUAGE, GET_LANGUAGE_BY_NAME, GET_LANGUAGE_BY_NAME_ERROR, GET_LANGUAGE_BY_NAME_LOADING, GET_LANGUAGE_ERROR, GET_LANGUAGE_LOADING } from "../type"
const initialState = {
    addLanguageLoading: false,
    addLanguage: [],
    addLanguageError: [],
    getLanguageLoading: false,
    getLanguage: [],
    getLanguageError: [],
    getLanguageByNameLoading: false,
    getLanguageByName: [],
    getLanguageByNameError: [],
}
export const languageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_LANGUAGE_LOADING:
            return {
                ...state,
                addLanguageLoading: action.payload
            }
        case ADD_LANGUAGE:
            return {
                ...state,
                addLanguage: action.payload
            }
        case ADD_LANGUAGE_ERROR:
            return {
                ...state,
                addLanguageError: action.payload,
            }


        case GET_LANGUAGE_LOADING:
            return {
                ...state,
                getLanguageLoading: action.payload
            }
        case GET_LANGUAGE:
            return {
                ...state,
                getLanguage: action.payload
            }
        case GET_LANGUAGE_ERROR:
            return {
                ...state,
                getLanguageError: action.payload,
            }


        case GET_LANGUAGE_BY_NAME_LOADING:
            return {
                ...state,
                getLanguageByNameLoading: action.payload
            }
        case GET_LANGUAGE_BY_NAME:
            return {
                ...state,
                getLanguageByName: action.payload
            }
        case GET_LANGUAGE_BY_NAME_ERROR:
            return {
                ...state,
                getLanguageByNameError: action.payload,
            }



        default:
            return state
    }
}