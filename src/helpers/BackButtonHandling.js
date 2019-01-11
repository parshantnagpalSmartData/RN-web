/*
 * @file: BackButtonHandling.js
 * @description: Function for handling back preess function.
 * @date: 24.Apr.2018
 * @author: Parshant Nagpal
 * */

"use strict";

import { BackHandler } from "react-native";
import { Dialog } from "./common";
/**
 * Function for handling back preess function
 */
export function handleBackPress() {
  Dialog(
    "Are You Sure You Want To Exit",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          BackHandler.exitApp();
        }
      }
    ],
    { cancelable: false }
  );
  return true;
}
