import { IS_LOGIN, IS_PROFILEIMAGE } from "../type";

const initialState = {
    isLoggedIn: false,
    isProfileImage: null
};

export const isLoginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        default:
            return state;
    }
}

export const isProfileImage = (state = initialState, action: any) => {
    switch (action.type) {
        case IS_PROFILEIMAGE:
            return {
                ...state,
                isProfileImage: action.payload
            }
        default:
            return state;
    }
}

