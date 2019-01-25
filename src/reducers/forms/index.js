/*
 * @file: index.js
 * @description: contains all forms releated reducers
 * @date: 14 Jan 2019
 * @author: Suraj Sanwal
 * */
//test  dklasjdfakl

import * as Types from "../../actionTypes";

const initialState = {
  myForms: [],
  myUrls: [],
  base64PrintableData: {}
};

export default function forms(state = initialState, action = {}) {
  switch (action.type) {
    case Types.PRINTABLE_FORMS:
      return {
        ...state,
        myForms: action.payload
      };
    case Types.RESOURCES_DATA:
      return {
        ...state,
        myUrls: action.payload
      };
    case Types.PRINTABLE_FORMS_BASE_64_DATA:
      return {
        ...state,
        base64PrintableData: action.payload
      };
    case Types.RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
