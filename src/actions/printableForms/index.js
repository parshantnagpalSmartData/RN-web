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

/**
 * Fetch base64 data for pdf
 */
export const fetchBase64DataForPdf = (formId, cb) => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall(
      "downloadforms/download/" + formId,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch({
            type: Types.PRINTABLE_FORMS_BASE_64_DATA,
            payload: res.result[0]
          });
          if (cb) {
            // After fetching the base 64 pdf data then set that value in reducer so that on reload the pdfviewer component data was there
            cb();
          }
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
