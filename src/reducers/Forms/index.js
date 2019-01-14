/*
 * @file: index.js
 * @description: contains all forms releated reducers
 * @date: 14 Jan 2019
 * @author: Suraj Sanwal
 * */

import * as Types from "../../actionTypes";

const initialState = {
  myForms: []
};

export default function forms(state = initialState, action = {}) {
  switch (action.type) {
    case Types.PRINTABLE_FORMS:
      return {
        ...state,
        myForms: action.payload
      };
    case Types.RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
