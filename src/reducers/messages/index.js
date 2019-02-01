/*
 * @file: index.js
 * @description: contains all message releated reducers
 * @date: 14 Jan 2019
 * @author: Suraj Sanwal
 * */
import _ from "underscore";
import * as Types from "../../actionTypes";

const initialState = {
  tab: "index",
  inbox: [],
  trash: [],
  sent: [],
  recipients: [],
  activeMessage: null
};

export default function messages(state = initialState, action = {}) {
  switch (action.type) {
    case Types.UPDATE_INBOX:
      return {
        ...state,
        inbox: action.payload
      };
    case Types.UPDATE_TRASH:
      return {
        ...state,
        trash: action.payload
      };
    case Types.ADD_MESSAGE:
      let pushRequest = [...state.sent];
      pushRequest.unshift(action.payload[0]);
      return { ...state, sent: pushRequest };
    case Types.DELETE_MESSAGE:
      if (action.payload.category === "inbox") {
        let inboxData = [...state.inbox],
          delIndex = _.findIndex(state.inbox, {
            MessageID: action.payload.messageId
          });
        if (delIndex != -1) {
          inboxData.splice(delIndex, 1);
        }
        return { ...state, inbox: inboxData };
      } else if (action.payload.category === "sent") {
        let sentData = [...state.sent],
          delIndex = _.findIndex(state.sent, {
            MessageID: action.payload.messageId
          });
        if (delIndex != -1) {
          sentData.splice(delIndex, 1);
        }
        return { ...state, sent: sentData };
      }
      return { ...state };
    case Types.UPDATE_SENT:
      return {
        ...state,
        sent: action.payload
      };
    case Types.RECIPIENTS_LIST:
      return {
        ...state,
        recipients: action.payload
      };
    case Types.UPDATE_ACTIVE_MESSAGE:
      return {
        ...state,
        activeMessage: action.payload
      };
    case Types.UPDATE_CURRENT_TAB:
      return {
        ...state,
        tab: action.payload
      };

    case Types.RESET_USER:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
