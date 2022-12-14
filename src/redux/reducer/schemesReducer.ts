
import { ADD_ENROLLED_SCHEMES, ADD_ENROLLED_SCHEMES_ERROR, ADD_ENROLLED_SCHEMES_LOADING, ADD_SAVEED_SCHEMES, ADD_SAVEED_SCHEMES_ERROR, ADD_SAVEED_SCHEMES_LOADING, GET_ALL_SCHEMES, GET_ALL_SCHEMES_ERROR, GET_ALL_SCHEMES_LOADING, GET_ONE_SCHEMES_BY_ID, GET_ONE_SCHEMES_BY_ID_ERROR, GET_ONE_SCHEMES_BY_ID_LOADING, GET_SCHEMES_CATEGORIE, GET_SCHEMES_CATEGORIES_BENIFITS, GET_SCHEMES_CATEGORIES_BENIFITS_ERROR, GET_SCHEMES_CATEGORIES_BENIFITS_LOADING, GET_SCHEMES_CATEGORIES_ERROR, GET_SCHEMES_CATEGORIES_LOADING, GET_ALL_SCHEMES_FALSE, GET_ALL_SCHEMES_TRUE, DELETE_SAVEED_SCHEMES_LOADING, DELETE_SAVEED_SCHEMES, DELETE_SAVEED_SCHEMES_ERROR, DELETE_ENROLL_SCHEMES_LOADING, DELETE_ENROLL_SCHEMES, DELETE_ENROLL_SCHEMES_ERROR, GET_SCHEMES_RECOMMENDATION_LOADING, GET_SCHEMES_RECOMMENDATION, GET_SCHEMES_RECOMMENDATION_ERROR } from "../type"

const initialState = {
    schemesCategoryLoading: false,
    schemesCategory: [],
    schemesCategoryError: [],

    schemesBenifitsLoading: false,
    schemesBenifits: [],
    schemesBenifitsError: [],

    allSchemesLoading: false,
    allSchemes: [],
    allSchemesTrue: [],
    allSchemesFalse: [],
    allSchemesError: [],

    getOneSchemeLoading: false,
    getOneScheme: [],
    getOneSchemeError: [],

    AddEnrolledSChemesLoading: false,
    AddEnrolledSChemes: [],
    AddEnrolledSChemesError: [],

    addSavedSchemesLoading: false,
    addSavedSchemes: [],
    addSavedSchemesError: [],

    deleteSavedSchemesLoading: false,
    deleteSavedSchemes: [],
    deleteSavedSchemesError: [],

    deleteEnrollSchemesLoading: false,
    deleteEnrollSchemes: [],
    deleteEnrollSchemesError: [],

    getSchemeRecommendationLoading: false,
    getSchemeRecommendation: [],
    getSchemeRecommendationError: [],

}
export const schemesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SCHEMES_CATEGORIES_LOADING:
            return {
                ...state,
                schemesCategoryLoading: action.payload,
            };
        case GET_SCHEMES_CATEGORIE:
            return {
                ...state,
                schemesCategory: action.payload,
            };
        case GET_SCHEMES_CATEGORIES_ERROR:
            return {
                ...state,
                schemesCategoryError: action.payload,
            };
        case GET_SCHEMES_CATEGORIES_BENIFITS_LOADING:
            return {
                ...state,
                schemesBenifitsLoading: action.payload
            }
        case GET_SCHEMES_CATEGORIES_BENIFITS:
            return {
                ...state,
                schemesBenifits: action.payload,
            }
        case GET_SCHEMES_CATEGORIES_BENIFITS_ERROR:
            return {
                ...state,
                schemesBenifitsError: action.payload,
            }



        case GET_ALL_SCHEMES_LOADING:
            return {
                ...state,
                allSchemesLoading: action.payload
            }
        case GET_ALL_SCHEMES:
            return {
                ...state,
                allSchemes: action.payload,
            }
        case GET_ALL_SCHEMES_TRUE:
            return {
                ...state,
                allSchemesTrue: action.payload
            }
        case GET_ALL_SCHEMES_FALSE: {
            return {
                ...state,
                allSchemesFalse: action.payload,
            }
        }
        case GET_ALL_SCHEMES_ERROR:
            return {
                ...state,
                allSchemesError: action.err,
            }





        case GET_ONE_SCHEMES_BY_ID_LOADING:
            return {
                ...state,
                getOneSchemeLoading: action.payload
            }
        case GET_ONE_SCHEMES_BY_ID:
            return {
                ...state,
                getOneScheme: action.payload,
            }
        case GET_ONE_SCHEMES_BY_ID_ERROR:
            return {
                ...state,
                getOneSchemeError: action.payload,
                loadong: false
            }
        case ADD_ENROLLED_SCHEMES_LOADING:
            return {
                ...state,
                AddEnrolledSChemesLoading: action.payload
            }
        case ADD_ENROLLED_SCHEMES:
            return {
                ...state,
                AddEnrolledSChemes: action.payload
            }
        case ADD_ENROLLED_SCHEMES_ERROR:
            return {
                ...state,
                AddEnrolledSChemesError: action.payload
            }
        case ADD_SAVEED_SCHEMES_LOADING:
            return {
                ...state,
                addSavedSchemesLoading: action.payload
            }
        case ADD_SAVEED_SCHEMES:
            return {
                ...state,
                addSavedSchemes: action.payload
            }
        case ADD_SAVEED_SCHEMES_ERROR:
            return {
                ...state,
                addSavedSchemesError: action.payload
            }
        case DELETE_SAVEED_SCHEMES_LOADING:
            return {
                ...state,
                deleteSavedSchemesLoading: action.payload
            }
        case DELETE_SAVEED_SCHEMES:
            return {
                ...state,
                deleteSavedSchemes: action.payload
            }
        case DELETE_SAVEED_SCHEMES_ERROR:
            return {
                ...state,
                deleteSavedSchemesError: action.payload
            }
        case DELETE_ENROLL_SCHEMES_LOADING:
            return {
                ...state,
                deleteEnrollSchemesLoading: action.payload
            }
        case DELETE_ENROLL_SCHEMES:
            return {
                ...state,
                deleteEnrollSchemes: action.payload
            }
        case DELETE_ENROLL_SCHEMES_ERROR:
            return {
                ...state,
                deleteEnrollSchemesError: action.payload
            }

        case GET_SCHEMES_RECOMMENDATION_LOADING:
            return {
                ...state,
                getSchemeRecommendationLoading: action.payload
            }
        case GET_SCHEMES_RECOMMENDATION:
            return {
                ...state,
                getSchemeRecommendation: action.payload
            }
        case GET_SCHEMES_RECOMMENDATION_ERROR:
            return {
                ...state,
                getSchemeRecommendationError: action.payload
            }

        default:
            return state;
    }
}



