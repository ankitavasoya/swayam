import { SEND_MAIL_TO_HR, SEND_MAIL_TO_HR_ERROR, SEND_MAIL_TO_HR_LOADING } from "../type";

const initialState = {
    sendMailToHRloading: false,
    sendMailToHR: [],
    sendMailToHRError: []
}
export const sendMailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SEND_MAIL_TO_HR_LOADING:
            return {
                ...state,
                sendMailToHRloading: action.payload,
            };
        case SEND_MAIL_TO_HR:
            return {
                ...state,
                sendMailToHR: action.payload,
            };
        case SEND_MAIL_TO_HR_ERROR:
            return {
                ...state,
                sendMailToHRError: action.payload,
            };
        default:
            return state
    }
}