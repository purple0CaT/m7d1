import { initialState } from "../data/data";

export const searchReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload.query,
        type: action.payload.type,
      };
    case "SEARCH_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "IS_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "CLEAN_UP":
      return {
        ...state,
        page: 0,
        searchQuery: "",
        type: "",
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        data: [],
      };
    default:
      return state;
  }
};
