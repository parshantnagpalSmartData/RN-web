/*
 * @file: index.js
 * @description: contains all message releated reducers
 * @date: 14 Jan 2019
 * @author: Suraj Sanwal
 * */

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
