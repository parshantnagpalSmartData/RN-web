/*
FileName: index.js
Author :Parshant Nagpal
Description: conatins all navigation actions for app 
Date : 13 december 2018
*/

import { Navigation } from "react-native-navigation";

export const pushTParticulatScreen = (componentId, screenNAme) => {
  return () => {
    Navigation.push(componentId, {
      component: {
        name: screenNAme
      }
    });
  };
};

export const pop = componentId => {
  return () => {
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
  return () => {
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
