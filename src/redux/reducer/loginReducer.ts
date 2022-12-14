import { LOGIN, LOGIN_LOADING, LOGIN_ERROR, IS_LOGIN, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD, FORGOT_PASSWORD_LOADING, CHANGE_PASSWORD_LOADING, CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, GET_USER, GET_USER_LOADING, GET_USER_ERROR } from "../type";

const login = {
    loading: false,
    loginData: null,
    loginError: null,
    is_loggedin: false,

    forgotLoading: false,
    forgot: null,
    forgotError: null,

    changeLoading: false,
    change: null,
    changeError: null,

    getUserLoading: false,
    getUserData: null,
    getUserError: null,
};


export const loginReducer = (state = login, action: any) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                loginData: action.payload,
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload,
            };


        case FORGOT_PASSWORD_LOADING:
            return {
                ...state,
                forgotLoading: action.payload,
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                forgot: action.payload,
            };
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotError: action.payload,
            };


        case CHANGE_PASSWORD_LOADING:
            return {
                ...state,
                changeLoading: action.payload,
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                change: action.payload,
            };
        case CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                changeError: action.payload,
            };

        case GET_USER_LOADING:
            return {
                ...state,
                getUserLoading: action.payload,
            };
        case GET_USER:
            return {
                ...state,
                getUserData: action.payload,
            };
        case GET_USER_ERROR:
            return {
                ...state,
                getUserError: action.payload,
            };

        default:
            return state;
    }
}