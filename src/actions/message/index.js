/*
FileName: index.js
Author :Suraj Sanwal
Description: conatins all messeging related actions for app 
Date : 9 January 2019
*/
import { Platform } from "react-native";
import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const getMessages = (folder, cb) => {
  return (dispatch, getState) => {
    dispatch(AppActions.startRefreshLoader());
    dispatch({ type: Types.UPDATE_CURRENT_TAB, payload: folder });
    RestClient.getCall(`messages?folder=${folder}`, getState().user.token)
      .then(res => {
        dispatch(AppActions.stopRefreshLoader());
        if (res.status) {
          if (folder === "inbox") {
            dispatch({
              type: Types.UPDATE_INBOX,
              payload: res.result.data
            });
          } else if (folder === "trash") {
            dispatch({
              type: Types.UPDATE_TRASH,
              payload: res.result.data
            });
          } else if (folder === "sent") {
            dispatch({
              type: Types.UPDATE_SENT,
              payload: res.result.data
            });
          }
          if (cb) {
            cb(res.result.data);
          }
          return;
        } else {
          dispatch(AppActions.checkLogin(res));
        }
      })
      .catch(e => {
        dispatch(AppActions.stopRefreshLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
export const deleteMessage = (messageId, category, success) => {
  return (dispatch, getState) => {
    RestClient.restCall(
      `messages/${messageId}`,
      {},
      getState().user.token,
      "DELETE"
    )
      .then(res => {
        if (res.status) {
          dispatch({
            type: Types.DELETE_MESSAGE,
            payload: { category, messageId }
          });

          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Success,
              "Message deleted successfully."
            )
          );
          if (success) {
            success();
          }
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
              Constants.AppConstants.Notificaitons.Success,
              "Message has been sent successfully."
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

export const getRecipients = () => {
  return (dispatch, getState) => {
    dispatch(AppActions.startRefreshLoader());
    RestClient.getCall("messages/groups", getState().user.token)
      .then(res => {
        dispatch(AppActions.stopRefreshLoader());
        if (res.status) {
          let recipients = res.result.data;
          let data = [];
          recipients.map(item => {
            data.push({
              value: item.MessageGroupID,
              label: `${item.GroupName} (${item.GroupEmail})`,
              email: item.GroupEmail,
              name: item.GroupName
            });
          });
          dispatch({ type: Types.RECIPIENTS_LIST, payload: data });
        } else {
          dispatch(AppActions.checkLogin(res));
        }
      })
      .catch(e => {
        dispatch(AppActions.stopRefreshLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const updateWebSelectedMessage = messageId => {
  return dispatch => {
    dispatch({ type: Types.UPDATE_ACTIVE_MESSAGE, payload: messageId });
  };
};

export const setActiveMessage = (messageId, componentId) => {
  return dispatch => {
    dispatch(updateWebSelectedMessage(messageId));
    {
      Platform.OS !== "web"
        ? dispatch(
            AppActions.pushToParticularScreen(componentId, "MessageDetails")
          )
        : null;
    }
  };
};
