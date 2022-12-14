import { GET_ALL_USER, GET_ALL_USERL_LOADING, GET_ALL_USER_ERROR } from "../type";

const initialState = {
    getAllUserLoading: false,
    getAllUser: [],
    getAllUserError: []
}
export const getAllUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ALL_USERL_LOADING:
            return {
                ...state,
                getAllUserLoading: action.payload,
            };
        case GET_ALL_USER:
            return {
                ...state,
                getAllUser: action.payload,
            };
        case GET_ALL_USER_ERROR:
            return {
                ...state,
                getAllUserError: action.payload,
            };
        default:
            return state
    }
}