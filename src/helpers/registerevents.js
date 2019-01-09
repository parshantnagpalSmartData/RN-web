/*
 * @file: registerevets.js
 * @description: this file will be used to regiseter all events required in the app
 * @author: Parshant Nagpal
 * */
/* eslint-disable */
import { NetInfo } from "react-native";

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
  }
};
module.exports = Events;
