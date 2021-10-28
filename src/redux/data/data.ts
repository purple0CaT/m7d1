import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { userReducer } from "../reducer/user";
import { searchReducer } from "../reducer/search";
import thunk from "redux-thunk";
import localStorage from "redux-persist/es/storage";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { ReduxStore } from "../../types/types";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: ReduxStore = {
  user: {
    name: "",
    image:
      "https://cdn2.iconfinder.com/data/icons/everything-in-office/65/icon_Ai-11-512.png",
    favorites: [],
    favoriteJobs: [],
  },
  search: {
    searchQuery: "",
    type: "",
    loading: false,
    data: [],
    page: 0,
    error: "",
  },
};

const bigReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const persistConfigs = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEYENCRIPTION!,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfigs, bigReducer);
const configureStore: any = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(configureStore);

export type RootState = ReturnType<typeof configureStore.getState>;
export type AppDispatch = typeof configureStore.dispatch;
export { configureStore, persistor };
