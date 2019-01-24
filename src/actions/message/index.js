/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all messeging related actions for app 
Date : 9 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
// import Constants from "../../constants";

export const getMessages = folder => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall(`messages?folder=${folder}`, getState().user.token)
      .then(res => {
        dispatch(AppActions.stopLoader());
        if (res.status) {
          if (folder === "inbox") {
            dispatch({
              type: Types.UPDATE_INBOX,
              payload: res.result.data
            });
            return;
          }
          if (folder === "trash") {
            dispatch({
              type: Types.UPDATE_TRASH,
              payload: res.result.data
            });
            return;
          }
          if (folder === "sent") {
            dispatch({
              type: Types.UPDATE_SENT,
              payload: res.result.data
            });
            return;
          }
        } else {
          dispatch(AppActions.checkLogin(res));
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
