import { ADD_SAVED_NEWS, ADD_SAVED_NEWS_ERROR, ADD_SAVED_NEWS_LODAING, DELETE_SAVED_NEWS, DELETE_SAVED_NEWS_ERROR, DELETE_SAVED_NEWS_LODAING, GET_ARTICLE, GET_ARTICLE_ERROR, GET_ARTICLE_LODAING } from "../type";

const initialState = {
    getArticleLoading: false,
    getArticle: [],
    getArticleError: [],

    savedNewsLoading: false,
    savedNews: [],
    savedNewsError: [],

    deleteNewsLoading: false,
    deleteNews: [],
    deleteNewsError: []
}

export const articleReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ARTICLE_LODAING:
            return {
                ...state,
                getArticleLoading: action.payload,
            };
        case GET_ARTICLE:
            return {
                ...state,
                getArticle: action.payload,
            };
        case GET_ARTICLE_ERROR:
            return {
                ...state,
                getArticleError: action.payload,
            };

        case ADD_SAVED_NEWS_LODAING:
            return {
                ...state,
                savedNewsLoading: action.payload,
            };
        case ADD_SAVED_NEWS:
            return {
                ...state,
                savedNews: action.payload,
            };
        case ADD_SAVED_NEWS_ERROR:
            return {
                ...state,
                savedNewsError: action.payload,
            };

        case DELETE_SAVED_NEWS_LODAING:
            return {
                ...state,
                deleteNewsLoading: action.payload,
            };
        case DELETE_SAVED_NEWS:
            return {
                ...state,
                deleteNews: action.payload,
            };
        case DELETE_SAVED_NEWS_ERROR:
            return {
                ...state,
                deleteNewsError: action.payload,
            };

        default:
            return state
    }
}