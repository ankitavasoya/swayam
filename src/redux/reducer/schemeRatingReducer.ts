import { ADD_SCHEMES_RATING, ADD_SCHEMES_RATING_ERROR, ADD_SCHEMES_RATING_LOADING, GET_SCHEMES_RATING, GET_SCHEMES_RATING_ERROR, GET_SCHEMES_RATING_LOADING, SPECIFIC_SCHEMES_RATING, SPECIFIC_SCHEMES_RATING_ERROR, SPECIFIC_SCHEMES_RATING_LOADING } from "../type"

const initialState = {
    addSchemeRatingLoading: false,
    addSchemeRating: [],
    addSchemeRatingError: [],

    schemeRatingLoading: false,
    schemeRating: [],
    schemeRatingError: [],


    specificSchemeRatingsLoading: false,
    specificSchemeRatings: [],
    specificSchemeRatingsError: [],
}
export const schemesRatingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_SCHEMES_RATING_LOADING:
            return {
                ...state,
                addSchemeRatingLoading: action.payload,
            };
        case ADD_SCHEMES_RATING:
            return {
                ...state,
                addSchemeRating: action.payload,
            };
        case ADD_SCHEMES_RATING_ERROR:
            return {
                ...state,
                addSchemeRatingError: action.payload,
            };

        case GET_SCHEMES_RATING_LOADING:
            return {
                ...state,
                schemeRatingLoading: action.payload,
            };
        case GET_SCHEMES_RATING:
            return {
                ...state,
                schemeRating: action.payload,
            };
        case GET_SCHEMES_RATING_ERROR:
            return {
                ...state,
                schemeRatingError: action.payload,
            };
        case SPECIFIC_SCHEMES_RATING_LOADING:
            return {
                ...state,
                specificSchemeRatingsLoading: action.payload,
            }
        case SPECIFIC_SCHEMES_RATING:
            return {
                ...state,
                specificSchemeRatings: action.payload
            }
        case SPECIFIC_SCHEMES_RATING_ERROR:
            return {
                ...state,
                specificSchemeRatingsError: action.payload
            }
        default:
            return state

    }
}