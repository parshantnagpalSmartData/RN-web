/*
 * @file: registerevets.js
 * @description: this file will be used to regiseter all events required in the app
 * @author:Gurtej Singh
 * */
/* eslint-disable */
import { NetInfo } from "react-native";

let Events = {
  RegisterNetEvents: () => {
    let handleFirstConnectivityChange = () => {
      NetInfo.isConnected.removeEventListener("connectionChange", handleFirstConnectivityChange);
    };
    NetInfo.isConnected.addEventListener("connectionChange", handleFirstConnectivityChange);
    NetInfo.isConnected.fetch().then(() => {});
  }
};
module.exports = Events;
