import * as Types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  root: "login", // 'login' / 'after-login'
  componentId: "",
  screen: "Home"
});

export default function app(state = initialState, action = {}) {
  switch (action.type) {
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
    case Types.RESET_APP:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
