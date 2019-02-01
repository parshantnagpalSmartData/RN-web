/*
FileName: index.js
Author :Parshant Nagpal
Description: Conatins all auth related actions for app 
Date : 9 January 2019
*/

import { Platform } from "react-native";

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const signIn = (postData, componentId) => {
  return dispatch => {
    dispatch(AppActions.startLoader());
    RestClient.restCall("users/login", postData)
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
          dispatch({ type: Types.SAVE_USER, payload: res.result });
          dispatch(AppActions.pushToParticularScreen(componentId, "OTPScreen"));
          dispatch({ type: Types.LOGIN });
        } else {
          dispatch(AppActions.stopLoader());
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const forgotPassword = postData => {
  return dispatch => {
    dispatch(AppActions.startLoader());
    RestClient.restCall("users/forgotpassword", postData)
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
        dispatch(AppActions.stopLoader());
      })
      .catch(e => {
        dispatch({ type: Types.FORGOT_FAIL });
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const logOut = () => {
  return dispatch => {
    dispatch(AppActions.startLoader());
    setTimeout(() => {
      // dispatch({ type: Types.LOGOUT });
      dispatch({ type: Types.RESET_USER });
      dispatch(AppActions.goAuth());
      dispatch(AppActions.stopLoader());
    }, 1000);
  };
};

export const verifyOTP = postData => {
  return dispatch => {
    setTimeout(() => {
      if (postData.otpValue === 1234) {
        // dispatch(
        //   AppActions.showToast(
        //     Constants.AppConstants.Notificaitons.Success,
        //     "OTP Verified Sucessfully"
        //   )
        // );
        if (Platform.OS !== "web") {
          dispatch(AppActions.goToHome());
        } else {
          dispatch(AppActions.pushToParticularScreen(null, "MySchedule"));
        }
      } else {
        dispatch(
          AppActions.showToast(
            Constants.AppConstants.Notificaitons.Error,
            "Invalid OTP"
          )
        );
      }
      dispatch(AppActions.stopLoader());
    }, 500);
    dispatch(AppActions.startLoader());
  };
};
