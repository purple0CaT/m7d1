import { createStore } from "redux";
import { userReducer } from "../reducer/reducer";

export const initialState = {
  user: {
    name: "",
    image:
      "https://cdn2.iconfinder.com/data/icons/everything-in-office/65/icon_Ai-11-512.png",
    favorites: [],
  },
};

const configureStore = createStore(
  userReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;
