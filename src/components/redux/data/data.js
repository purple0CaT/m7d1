import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer } from "../reducer/user";
import { searchReducer } from "../reducer/search";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  user: {
    name: "",
    image:
      "https://cdn2.iconfinder.com/data/icons/everything-in-office/65/icon_Ai-11-512.png",
    favorites: [],
  },
  search: {
    searchQuery: "",
    type: "",
    loading: false,
    data: [],
    page: 0,
  },
};

const bigReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default configureStore;
