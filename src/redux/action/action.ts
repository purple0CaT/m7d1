import { Dispatch } from "redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { urlCheck } from "../../components/search/urlCheck";
import { Job } from "../../types/types";

export const addToFavorite = (value: string) => ({
  type: "ADD_TO_FAV",
  payload: value,
});
export const deleteOfFavorite = (value: string) => ({
  type: "DELETE_OF_FAV",
  payload: value,
});
export const addTheName = (value: string) => ({
  type: "ADD_NAME",
  payload: value,
});
export const addFavJob = (value: Job) => ({
  type: "ADD_JOB",
  payload: value,
});
export const deleteFavJob = (value: Job) => ({
  type: "DELETE_JOB",
  payload: value,
});
export const logOutUser = () => ({
  type: "LOG_OUT",
  // payload: value,
});

// SEARCH
export const setSearch = (value: { type: string; query: string }) => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: value,
    });
  };
};
// FETCHING
export const searchBy = () => {
  return async (dispatch: Dispatch, getState: any) => {
    let searchInfo = await getState();
    let url = urlCheck(
      searchInfo.search.type,
      searchInfo.search.searchQuery,
      searchInfo.search.page
    );
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "SEARCH_DATA",
          payload: data,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      } else {
        console.log(res);
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        dispatch({
          type: "SET_ERROR",
          payload: `${res.status}, ${res.statusText}!`,
        });
        setTimeout(() => {
          dispatch({
            type: "SET_ERROR",
            payload: "",
          });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      dispatch({
        type: "SET_ERROR",
        payload: error,
      });
      console.log(error);
    }
  };
};
// CHANGE PAGE NUM
export const setUpPage = (value: any) => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: "SET_PAGE",
      payload: value,
    });
  };
};
export const cleanUpAct = () => {
  return async (dispatch: any, getState: any) => {
    dispatch({
      type: "CLEAN_UP",
      // payload: value,
    });
  };
};
