import { ADD_GET_STARTED, ADD_GET_STARTED_ERROR, ADD_GET_STARTED_LODAING } from "../type";

const initialState = {
    addGetStartedloading: [],
    addGetStarted: [],
    addGetStartedError: []
}
export const getStartedReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_GET_STARTED_LODAING:
            return {
                ...state,
                addGetStartedloading: action.payload,
            };
        case ADD_GET_STARTED:
            return {
                ...state,
                addGetStarted: action.payload,
            };
        case ADD_GET_STARTED_ERROR:
            return {
                ...state,
                addGetStartedError: action.payload,
            };
        default:
            return state

    }
}