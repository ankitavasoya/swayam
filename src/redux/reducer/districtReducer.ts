import { GET_DISTRICT, GET_DISTRICT_ERROR, GET_DISTRICT_LOADING, GET_STATE, GET_STATE_ERROR, GET_STATE_LODAING } from "../type";

const initialState = {
    districtloading: false,
    districtData: [],
    districtError: []
}
export const districtReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DISTRICT_LOADING:
            return {
                ...state,
                districtloading: action.payload,
            };
        case GET_DISTRICT:
            return {
                ...state,
                districtData: action.payload,
            };
        case GET_DISTRICT_ERROR:
            return {
                ...state,
                districtError: action.payload,
            };
        default:
            return state

    }
}