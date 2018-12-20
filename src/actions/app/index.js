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
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
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
    });
  };
};

export const goToHome = () => {
  return dispatch => {
    dispatch({ type: Types.SET_COMPONENT, payload: "MY_STACK" });
    dispatch({ type: Types.SET_SCREEN, payload: "Home" });
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
