import { GET_ABOUT_US, GET_ABOUT_US_LOADING, GET_ABOUT_US_ERROR, GET_WOMEN_TESTIMONIAL, GET_WOMEN_TESTIMONIAL_LOADING, GET_WOMEN_TESTIMONIAL_ERROR } from "../type";

const initialState = {
    getAboutUsLoading: false,
    getAboutUs: [],
    getAboutUsError: [],
    getWomenTestimonialLoading: false,
    getWomenTestimonial: [],
    getWomenTestimonialError: [],
}

export const aboutUsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ABOUT_US_LOADING:
            return {
                ...state,
                getAboutUsLoading: action.payload,
            };
        case GET_ABOUT_US:
            return {
                ...state,
                getAboutUs: action.payload,
            };
        case GET_ABOUT_US_ERROR:
            return {
                ...state,
                getAboutUsError: action.payload,
            };

        case GET_WOMEN_TESTIMONIAL_LOADING:
            return {
                ...state,
                getWomenTestimonialLoading: action.payload,
            };
        case GET_WOMEN_TESTIMONIAL:
            return {
                ...state,
                getWomenTestimonial: action.payload,
            };
        case GET_WOMEN_TESTIMONIAL_ERROR:
            return {
                ...state,
                getWomenTestimonialError: action.payload,
            };

        default:
            return state
    }
}