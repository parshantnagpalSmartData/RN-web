/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all OpenShift related actions for app 
Date : 9 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchOpenShift = (
  page = 1,
  startDate,
  enddate,
  refresh = false,
  limit = Constants.AppConstants.limit
) => {
  return (dispatch, getState) => {
    refresh
      ? dispatch(AppActions.startRefreshLoader())
      : dispatch(AppActions.startLoader());
    if (page === 1) {
      dispatch({ type: Types.CLEAR_OPEN_SHIFT });
    }
    RestClient.getCall(
      `nurses/openshifts?startDate=${startDate}&enddate=${enddate}&page=${page}&limit=${limit}`,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
          dispatch({ type: Types.OPEN_SHIFTS, payload: res.result });
        } else {
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
          if (res.error === "Token expired") {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.error
              )
            );
            dispatch({ type: Types.RESET_USER });
            dispatch(AppActions.goAuth());
          } else {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.message
              )
            );
          }
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const openshiftsLike = (shiftId, sucess) => {
  return (dispatch, getState) => {
    RestClient.restCall(
      `nurses/openshifts/${shiftId}/like`,
      null,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch({
            type: Types.UPDATE_OPENSHIFT_LIKE_INDICATOR,
            payload: shiftId
          });
          // dispatch(
          //   AppActions.showToast(
          //     Constants.Strings.Sucess.likeIndicator,
          //     res.message
          //   )
          // );
          sucess();
        } else {
          if (res.error === "Token expired") {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.error
              )
            );
            dispatch({ type: Types.RESET_USER });
            dispatch(AppActions.goAuth());
          } else {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.message
              )
            );
          }
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
