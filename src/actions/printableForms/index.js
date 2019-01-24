/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all printable form related actions for app 
Date : 14 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
// import Constants from "../../constants";

export const fetchPrintableForms = () => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall("downloadforms", getState().user.token)
      .then(res => {
        if (res.status) {
          dispatch({ type: Types.PRINTABLE_FORMS, payload: res.result.data });
        } else {
          dispatch(AppActions.checkLogin(res));
        }
        dispatch(AppActions.stopLoader());
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const fetchBase64DataForPdf = formId => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall(
      "downloadforms/download/" + formId,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          // console.log("res.status", res);
          // dispatch({ type: Types.PRINTABLE_FORMS, payload: res.result.data });
        } else {
          dispatch(AppActions.checkLogin(res));
        }
        dispatch(AppActions.stopLoader());
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
