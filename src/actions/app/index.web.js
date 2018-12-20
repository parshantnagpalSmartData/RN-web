/*
FileName: index.js
Author :Parshant Nagpal
Description: Conatins all navigation actions for App 
Date : 13 december 2018
*/

import history from "../../utilities/history";

export const pushTParticulatScreen = screen => {
  return () => {
    history.push(screen);
  };
};

export const goBack = () => {
  return () => {
    history.goBack();
  };
};

export const pop = () => {
  return () => {
    history.goBack();
  };
};

export const goAuth = () => {
  return () => {
    // dispatch({ type: Types.SET_SCREEN, payload: "/" });
    history.replace("/");
  };
};
/* eslint-disable */
export const setScrenStack = (componentId = null, screen, visible) => {
  return () => {
    // dispatch({ type: Types.SET_COMPONENT, payload: componentId });
    // dispatch({ type: Types.SET_SCREEN, payload: screen });
    history.push(`/${screen}`);
  };
};
