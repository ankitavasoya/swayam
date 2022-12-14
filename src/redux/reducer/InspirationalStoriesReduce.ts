import { INSPIRATIONAL_STORIES_ERROR, INSPIRATIONAL_STORIES_JOB, INSPIRATIONAL_STORIES_LOADING, INSPIRATIONAL_STORIES_SCHEME } from "../type";

const initialState = {
    inspirationalStoriesloading: false,
    inspirationalStoriesJob: [],
    inspirationalStoriesScheme: [],
    inspirationalStoriesError: []
}
export const inspirationalStoriesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INSPIRATIONAL_STORIES_LOADING:
            return {
                ...state,
                inspirationalStoriesloading: action.payload,
            };
        case INSPIRATIONAL_STORIES_JOB:
            return {
                ...state,
                inspirationalStoriesJob: action.payload,
            };
        case INSPIRATIONAL_STORIES_SCHEME:
            return {
                ...state,
                inspirationalStoriesScheme: action.payload,
            };
        case INSPIRATIONAL_STORIES_ERROR:
            return {
                ...state,
                inspirationalStoriesError: action.payload,
            };
        default:
            return state

    }
}