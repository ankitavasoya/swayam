import { GET_JOB_BY_ID_USERPANEL, GET_JOB_BY_ID_USERPANEL_ERROR, GET_JOB_BY_ID_USERPANEL_LODAING } from "../type";

const initialState = {
    getJobByIdLoading: false,
    getJobById: [],
    getJobByIdError: []
}
export const userPanelReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_JOB_BY_ID_USERPANEL_LODAING:
            return {
                ...state,
                getJobByIdLoading: action.payload,
            };
        case GET_JOB_BY_ID_USERPANEL:
            return {
                ...state,
                getJobById: action.payload,
            };
        case GET_JOB_BY_ID_USERPANEL_ERROR:
            return {
                ...state,
                getJobByIdError: action.payload,
            };
        default:
            return state

    }
}