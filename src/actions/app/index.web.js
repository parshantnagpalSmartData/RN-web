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
