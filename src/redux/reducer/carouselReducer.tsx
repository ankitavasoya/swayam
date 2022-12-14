import { GET_CAROUSEL, GET_CAROUSEL_ERROR, GET_CAROUSEL_LOADING } from "../type";

const initialState = {
    getCarouselLoading: false,
    getCarousel: [],
    getCarouselError: [],
}

export const carouselReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CAROUSEL_LOADING:
            return {
                ...state,
                getCarouselLoading: action.payload,
            };
        case GET_CAROUSEL:
            return {
                ...state,
                getCarousel: action.payload,
            };
        case GET_CAROUSEL_ERROR:
            return {
                ...state,
                getCarouselError: action.payload,
            };
        default:
            return state
    }
}