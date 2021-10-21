import { initialState } from "../data/data";

export const userReducer = (state = initialState.user, action) => {
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
    default:
      return state;
  }
};
