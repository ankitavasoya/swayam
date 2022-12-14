import { SIGNUP, SIGNUP_LOADING, SIGNUP_ERR, USER_AUTH_SIGNUP_LOADING, USER_AUTH_SIGNUP, USER_AUTH_SIGNUP_ERR } from "../type";

const signupdata = {
    loading: false,
    signUpData: null,
    signupError: null,

    userAuthSingupLoading: false,
    userAuthSingup: null,
    userAuthSingupError: null,
};

export const signupReducer = (state = signupdata, action: any) => {
    switch (action.type) {
        case SIGNUP_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SIGNUP:
            return {
                ...state,
                signUpData: action.payload,
            };
        case SIGNUP_ERR:
            return {
                ...state,
                signupError: action.payload,
            };
        case USER_AUTH_SIGNUP_LOADING:
            return {
                ...state,
                userAuthSingupLoading: action.payload
            }
        case USER_AUTH_SIGNUP:
            return {
                ...state,
                userAuthSingup: action.payload
            }
        case USER_AUTH_SIGNUP_ERR:
            return {
                ...state,
                userAuthSingupError: action.payload
            }
        default:
            return state;

    }
}