/*
FileName: index.js
Author :Parshant Nagpal
Description: conatins all My schedule related actions for app 
Date : 9 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchMySchedules = (
  page = 1,
  prevDate,
  nextDate,
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
      dispatch({ type: Types.CLEAR_MY_SCHEDULE });
    }
    RestClient.getCall(
      `nurses/schedules?startDate=${prevDate}&endDate=${nextDate}&page=${page}&limit=${limit}`,
      getState().user.token
    )
      .then(res => {
        dispatch(AppActions.stopLoader());
        if (res.status) {
          dispatch({ type: Types.ADD_MYSCHEDULE, payload: res.result });
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
