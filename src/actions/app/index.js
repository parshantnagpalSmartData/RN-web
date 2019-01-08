/*
FileName: index.js
Author :Parshant Nagpal
Description: conatins all navigation actions for app 
Date : 13 december 2018
*/

import { Navigation } from "react-native-navigation";
import { goHome, goToAuth } from "../../config/navigation";
import * as Types from "../../actionTypes";

export const pushTParticulatScreen = (componentId, screenName) => {
  return dispatch => {
    dispatch({ type: Types.SET_COMPONENT, payload: componentId });
    Navigation.push(componentId, {
      component: {
        name: screenName
      }
    });
  };
};

export const pop = componentId => {
  return dispatch => {
    dispatch({ type: Types.SET_COMPONENT, payload: componentId });
    Navigation.pop(componentId);
  };
};
export const mergeOptions = (componentId, draweropen) => {
  return () => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen
        }
      }
    });
  };
};
export const setScrenStack = (componentId, screen, visible) => {
  return dispatch => {
    dispatch({ type: Types.SET_COMPONENT, payload: componentId });
    dispatch({ type: Types.SET_SCREEN, payload: screen });
    Navigation.setStackRoot(componentId, [
      {
        component: {
          name: screen,
          passProps: {
            text: "Root screen"
          },
          options: {
            animations: {
              // push: {
              //   waitForRender: true,
              //   content: {
              //     startAlpha: 0,
              //     endAlpha: 1,
              //     duration: 1,
              //     interpolation: "accelerate"
              //   }
              // },
              setStackRoot: {
                enabled: true
              }
            },
            topBar: {
              title: {
                text: "Pushed 1"
              }
            },
            bottomTabs: {
              visible,
              drawBehind: true
            }
          }
        }
      }
    ]);
  };
};

export const goToHome = () => {
  return dispatch => {
    // dispatch({ type: Types.SET_COMPONENT, payload: "MY_STACK" });
    dispatch({ type: Types.SET_SCREEN, payload: "OTPScreen" });
    goHome();
  };
};

export const goAuth = () => {
  return dispatch => {
    dispatch({ type: Types.SET_COMPONENT, payload: "App" });
    dispatch({ type: Types.SET_SCREEN, payload: "SignIn" });
    goToAuth();
  };
};

export const startLoader = () => {
  return dispatch => {
    dispatch({ type: Types.START_LOADER });
  };
};
export const stopLoader = () => {
  return dispatch => {
    dispatch({ type: Types.STOP_LOADER });
  };
};

export const startRefreshLoader = () => {
  return dispatch => {
    dispatch({ type: Types.START_REFRESH_LOADER });
  };
};
export const stopRefreshLoader = () => {
  return dispatch => {
    dispatch({ type: Types.STOP_REFRESH_LOADER });
  };
};

export const showToast = (type, message) => {
  return dispatch => {
    dispatch({
      type: Types.SHOW_TOAST,
      payload: { type, message, isVisible: true }
    });
  };
};

export const hideToast = () => {
  return dispatch => {
    dispatch({
      type: Types.HIDE_TOAST,
      payload: { isVisible: false }
    });
  };
};
