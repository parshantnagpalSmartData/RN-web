/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all Potientail Cases related actions for app 
Date : 9 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchPotientialCases = (
  page = 1,
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
      dispatch({ type: Types.CLEAR_POTIENTIAL_DATA });
    }
    RestClient.getCall(
      `nurses/potentialcases?page=${page}&limit=${limit}`,
      getState().user.token
    )
      .then(res => {
        stopLoader();
        if (res.status) {
          dispatch({ type: Types.POTIENTIAL_CASES, payload: res.result });
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

export const potientialCasesLike = (caseId, sucess) => {
  return (dispatch, getState) => {
    RestClient.restCall(
      `nurses/potentialcases/${caseId}/like`,
      null,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch({
            type: Types.UPDATE_POTIENTIAL_LIKE_INDICATOR,
            payload: caseId
          });
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
