import { GET_TESTIMONIAL_LODAING, GET_TESTIMONIAL, GET_TESTIMONIAL_ERROR, GET_ALL_TESTIMONIAL, GET_ALL_TESTIMONIAL_LODAING, GET_ALL_TESTIMONIAL_ERROR } from "../type";

const initialState = {
    getTestimonialLoading: false,
    getTestimonial: [],
    getTestimonialError: [],

    getAllTestimonialLoading: false,
    getAllTestimonial: [],
    getAllTestimonialError: [],
}


export const testimonialReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TESTIMONIAL_LODAING:
            return {
                ...state,
                getTestimonialLoading: action.payload,
            };
        case GET_TESTIMONIAL:
            return {
                ...state,
                getTestimonial: action.payload,
            };
        case GET_TESTIMONIAL_ERROR:
            return {
                ...state,
                getTestimonialError: action.payload,
            };

            case GET_ALL_TESTIMONIAL_LODAING:
                return {
                    ...state,
                    getAllTestimonialLoading: action.payload,
                };
            case GET_ALL_TESTIMONIAL:
                return {
                    ...state,
                    getAllTestimonial: action.payload,
                };
            case GET_ALL_TESTIMONIAL_ERROR:
                return {
                    ...state,
                    getAllTestimonialError: action.payload,
                };

        default:
            return state
    }
}