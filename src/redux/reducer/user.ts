import { initialState } from "../data/data";

export const userReducer = (state = initialState.user, action: any) => {
  switch (action.type) {
    case "ADD_TO_FAV":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "DELETE_OF_FAV":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f !== action.payload),
      };
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_JOB":
      return {
        ...state,
        favoriteJobs: [...state.favoriteJobs, action.payload],
      };
    case "DELETE_JOB":
      return {
        ...state,
        favoriteJobs: state.favoriteJobs.filter(
          (f) => f._id !== action.payload._id
        ),
      };
    case "LOG_OUT":
      return {
        ...state,
        name: "",
        favorites: [],
        favoriteJobs: [],
      };
    default:
      return state;
  }
};
