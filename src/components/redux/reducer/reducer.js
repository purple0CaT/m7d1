import { act } from "react-dom/test-utils";
import { initialState } from "../data/data";

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          favorites: [...state.user.favorites, action.payload],
        },
      };
    case "DELETE_OF_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          favorites: state.user.favorites.filter((f) => f !== action.payload),
        },
      };
    case "ADD_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    default:
      return state;
  }
};
