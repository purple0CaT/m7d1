import { createStore } from "redux";
import { userReducer } from "../reducer/reducer";

export const initialState = {
  user: {
    name: "",
    favorites: [],
  },
};

const configureStore = createStore(
  userReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;
