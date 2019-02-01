/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all common app actions
Date : 09 Jan 2019
*/

import * as Types from "../../actionTypes";
import Constants from "../../constants";
import * as AppActions from "../../actions";

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

/**
 * App Action For Setting the width of web
 *
 */

export const setWebWidth = value => {
  return dispatch => {
    dispatch({ type: Types.SET_WEB_WIDTH, payload: { value } });
  };
};

export const checkLogin = res => {
  return dispatch => {
    if (res.error === "Token expired") {
      setTimeout(() => {
        dispatch({ type: Types.RESET_USER });
        dispatch(AppActions.goAuth());
      }, 1000);
      dispatch(
        showToast(Constants.AppConstants.Notificaitons.Error, res.error)
      );
    } else {
      dispatch(
        showToast(Constants.AppConstants.Notificaitons.Error, res.message)
      );
    }
  };
};
