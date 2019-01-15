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
    let startLoader = () =>
      refresh
        ? dispatch(AppActions.startRefreshLoader())
        : dispatch(AppActions.startLoader());
    let stopLoader = () =>
      refresh
        ? dispatch(AppActions.stopRefreshLoader())
        : dispatch(AppActions.stopLoader());
    startLoader();
    if (page === 1) {
      dispatch({ type: Types.CLEAR_OPEN_SHIFT });
    }
    RestClient.getCall(
      `nurses/openshifts?startDate=${startDate}&enddate=${enddate}&page=${page}&limit=${limit}`,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch({ type: Types.OPEN_SHIFTS, payload: res.result });
        } else {
          dispatch(AppActions.checkLogin(res));
        }
        stopLoader();
      })
      .catch(e => {
        stopLoader();
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
          sucess();
        } else {
          dispatch(AppActions.checkLogin(res));
        }
      })
      .catch(e => {
        console.warn("error", e); // eslint-disable-line
      });
  };
};
