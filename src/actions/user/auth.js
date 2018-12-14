import { Platform } from "react-native";

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";

export const signIn = (postData, componentId) => {
  return dispatch => {
    dispatch({ type: Types.LOGIN_REQUEST });
    RestClient.restCall("users/login", postData)
      .then(res => {
        if (res.status) {
          dispatch({ type: Types.LOGIN_SUCESS });
          dispatch({ type: Types.LOGIN });
          dispatch({ type: Types.SAVE_USER, payload: res.result });
          if (Platform.OS !== "web") {
            dispatch(AppActions.pushTParticulatScreen(componentId, "Screen2"));
          } else {
            dispatch(AppActions.pushTParticulatScreen("/Screen2"));
          }
        } else {
          dispatch({ type: Types.LOGIN_FAIL });
          alert(res.message);
        }
      })
      .catch(e => {
        dispatch({ type: Types.LOGIN_FAIL });
        console.warn("error", e);
      });
  };
};

export const forgotPassword = postData => {
  return dispatch => {
    dispatch({ type: Types.FORGOT_REQUEST });
    RestClient.restCall("users/forgotpassword", postData)
      .then(res => {
        if (res.status) {
          dispatch({ type: Types.FORGOT_SUCESS });
          alert(res.message);
        } else {
          dispatch({ type: Types.FORGOT_FAIL });
          alert(res.message);
        }
      })
      .catch(e => {
        dispatch({ type: Types.FORGOT_FAIL });
        console.warn("error", e);
      });
  };
};

export const logOut = () => ({
  type: Types.LOGOUT
});
