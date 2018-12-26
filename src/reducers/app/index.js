import * as Types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  root: "login", // 'login' / 'after-login'
  componentId: "",
  screen: "Home",
  loading: false,
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
    case Types.RESET_APP:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
