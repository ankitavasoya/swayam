import { GET_BANNERS, GET_BANNERS_ERROR, GET_BANNERS_LODAING } from "../type";

const initialState = {
    getBannerLoading: false,
    getBanner: [],
    getBannerError: [],
}

export const bannerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_BANNERS_LODAING:
            return {
                ...state,
                getBannerLoading: action.payload,
            };
        case GET_BANNERS:
            return {
                ...state,
                getBanner: action.payload,
            };
        case GET_BANNERS_ERROR:
            return {
                ...state,
                getBannerError: action.payload,
            };
        default:
            return state
    }
}