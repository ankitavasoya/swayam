import { GET_STATE, GET_STATE_ERROR, GET_STATE_LODAING } from "../type";

const initialState = {
    stateloading: false,
    stateData: [],
    stateError: []
}
export const stateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_STATE_LODAING:
            return {
                ...state,
                stateloading: action.payload,
            };
        case GET_STATE:
            return {
                ...state,
                stateData: action.payload,
            };
        case GET_STATE_ERROR:
            return {
                ...state,
                stateError: action.payload,
            };
        default:
            return state

    }
}