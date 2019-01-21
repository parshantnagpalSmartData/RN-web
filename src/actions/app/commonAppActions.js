/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all common app actions
Date : 09 Jan 2019
*/

import * as Types from "../../actionTypes";

export const startLoader = () => {
  return dispatch => {
    dispatch({ type: Types.START_LOADER });
  };
};
export const stopLoader = () => {
  return dispatch => {
    dispatch({ type: Types.STOP_LOADER });
  };
};
export const stopLoader2 = () => {
  return dispatch => {
    dispatch({ type: Types.STOP_LOADER });
  };
};

export const startRefreshLoader = () => {
  return dispatch => {
    dispatch({ type: Types.START_REFRESH_LOADER });
  };
};
export const stopRefreshLoader = () => {
  return dispatch => {
    dispatch({ type: Types.STOP_REFRESH_LOADER });
  };
};

export const showToast = (type, message) => {
  return dispatch => {
    dispatch({
      type: Types.SHOW_TOAST,
      payload: { type, message, isVisible: true }
    });
  };
};

export const hideToast = () => {
  return dispatch => {
    dispatch({
      type: Types.HIDE_TOAST,
      payload: { isVisible: false }
    });
  };
};
