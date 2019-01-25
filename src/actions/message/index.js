/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all messeging related actions for app 
Date : 9 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

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

export const deleteMessage = (messageId, success) => {
  return (dispatch, getState) => {
    RestClient.restCall(
      `messages/${messageId}`,
      {},
      getState().user.token,
      "DELETE"
    )
      .then(res => {
        if (res.status) {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Success,
              "Message deleted successfully."
            )
          );
          success();
        } else {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        }
      })
      .catch(e => {
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const readMessage = messageId => {
  return (dispatch, getState) => {
    RestClient.restCall(`messages/${messageId}/read`, {}, getState().user.token)
      .then(res => {
        if (res.status) {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Success,
              res.message
            )
          );
        } else {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        }
      })
      .catch(e => {
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const composeMessage = postData => {
  return (dispatch, getState) => {
    RestClient.restCall("messages", postData, getState().user.token)
      .then(res => {
        if (res.status) {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        } else {
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        }
      })
      .catch(e => {
        console.warn("error", e); // eslint-disable-line
      });
  };
};