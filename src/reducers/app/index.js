/*
 * @file: index.js
 * @description: contains all user releated reducers
 * @date: 9 Jan 2019
 * @author: Parshant Nagpal
 * */

import * as Types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  root: "login", // 'login' / 'after-login'
  componentId: "",
  screen: "MySchedule",
  loading: false,
  refreshLoader: false,
  notification: {
    isVisible: false
  }
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case Types.START_LOADER:
      return {
        ...state,
        loading: true
      };
    case Types.STOP_LOADER:
      return {
        ...state,
        loading: false
      };
    case Types.START_REFRESH_LOADER:
      return {
        ...state,
        refreshLoader: true
      };
    case Types.STOP_REFRESH_LOADER:
      return {
        ...state,
        refreshLoader: false
      };
    case Types.ROOT_CHANGED:
      return {
        ...state,
        root: action.root
      };
    case Types.SET_COMPONENT:
      return {
        ...state,
        componentId: action.payload
      };
    case Types.SET_SCREEN:
      return {
        ...state,
        screen: action.payload
      };
    case Types.SHOW_TOAST:
      return {
        ...state,
        notification: action.payload
      };
    case Types.HIDE_TOAST:
      return {
        ...state,
        notification: action.payload
      };
    case Types.RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
