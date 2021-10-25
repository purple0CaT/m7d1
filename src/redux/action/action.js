import { urlCheck } from "../../components/search/urlCheck";

export const addToFavorite = (value) => ({
  type: "ADD_TO_FAV",
  payload: value,
});
export const deleteOfFavorite = (value) => ({
  type: "DELETE_OF_FAV",
  payload: value,
});
export const addTheName = (value) => ({
  type: "ADD_NAME",
  payload: value,
});

// SEARCH
export const setSearch = (value) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: value,
    });
  };
};
// FETCHING
export const searchBy = (value) => {
  return async (dispatch, getState) => {
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
export const setUpPage = (value) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "SET_PAGE",
      payload: value,
    });
  };
};
export const cleanUpAct = (value) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "CLEAN_UP",
      payload: value,
    });
  };
};
