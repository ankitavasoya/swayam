import { GET_ALL_FAQ, GET_ALL_FAQ_ERROR, GET_ALL_FAQ_LOADING } from "../type";

const initialState = {
    AllFaqsloading: false,
    AllFaqs: [],
    ALlFaqsError: []
}
export const faqsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_FAQ_LOADING:
            return {
                ...state,
                AllFaqsloading: action.payload,
            };
        case GET_ALL_FAQ:
            return {
                ...state,
                AllFaqs: action.payload,
            };
        case GET_ALL_FAQ_ERROR:
            return {
                ...state,
                ALlFaqsError: action.payload,
            };
        default:
            return state

    }
}