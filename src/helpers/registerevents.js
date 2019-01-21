/*
 * @file: registerevets.js
 * @description: this file will be used to regiseter all events required in the app
 * @author: Parshant Nagpal
 * */
/* eslint-disable */
import { NetInfo, BackHandler, Platform } from "react-native";
import { handleBackPress } from "./BackButtonHandling";
import { Navigation } from "react-native-navigation";
import _ from "lodash";

var Events = {
  RegisterNetEvents: () => {
    let handleFirstConnectivityChange = () => {
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        handleFirstConnectivityChange
      );
    };
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
    NetInfo.isConnected.fetch().then(() => {});
  },

  RegisterComponentDidAppearListener: store => {
    Platform.OS === "android" &&
      Navigation.events().registerComponentDidAppearListener(
        ({ componentId, componentName }) => {
          let { backHandlingScreens } = store.getState().app;

          var index = _.findIndex(
            backHandlingScreens,
            screen => screen === componentName
          );
          if (index !== -1) {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);
          } else {
            BackHandler.removeEventListener(
              "hardwareBackPress",
              handleBackPress
            );
          }
        }
      );
  }
};
module.exports = Events;
