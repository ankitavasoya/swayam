import { GET_GENERALDATA, GET_GENERALDATA_LOADING, GET_GENERALDATA_ERROR  } from "../type"

const initialState = {
    getGeneralLoading: false,
    getGeneralData: [],
    getGeneralError: []
}

export const privacyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_GENERALDATA_LOADING:
            return {
                ...state,
                getGeneralLoading: action.payload
            }
        case GET_GENERALDATA:
            return {
                ...state,
                getGeneralData: action.payload,
                loading: false
            }
        case GET_GENERALDATA_ERROR:
            return {
                ...state,
                getGeneralError: action.payload,
                loading: false
            }
        default:
            return state
    }
}
