import { GET_CONTACTUS, GET_CONTACTUS_LODAING, GET_CONTACTUS_ERROR } from "../type"

const initialState = {
    contactUsLoading: false,
    contactUsData: [],
    contactUsError: []
}

export const contactUsReucer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CONTACTUS_LODAING:
            return {
                ...state,
                contactUsLoading: action.payload
            }
        case GET_CONTACTUS:
            return {
                ...state,
                contactUsData: action.payload,
                loading: false
            }
        case GET_CONTACTUS_ERROR:
            return {
                ...state,
                contactUsError: action.payload,
                loading: false
            }
        default:
            return state
    }
}
