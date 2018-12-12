/**
 * Name :Suraj Sanwal
 * File Name : Notificaitons.js
 * Description : Contains the side notificationStyle of the app
 * Date : 9 Sept 2018
 */
import React from "react";
import { Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import SafeView from "./SafeView";
import Constants from "../../constants";

const Notification = props => {
  let { type, message, notificationStyle, textStyle } = props; // type 1 for error, 2=for Notification
  let primaryColor =
    type == Constants.AppCosntants.Notificaitons.Error
      ? Constants.Colors.red
      : Constants.Colors.green;
  let gradientColors = [primaryColor, primaryColor];
  //let textColor = type == 1 ? Constants.Colors.White : Constants.Colors.White;
  return (
    <LinearGradient
      colors={gradientColors}
      style={[Styles.notificationStyle, notificationStyle]}
    >
      <SafeView backgroundColor={primaryColor} />
      <Text style={[Styles.textStyle, textStyle]}>{message}</Text>
    </LinearGradient>
  );
};

export default Notification;
const Styles = StyleSheet.create({
  notificationStyle: {
    width: width,
    alignItems: "center",
    padding: moderateScale(10),
    zIndex: 9999
  },
  textStyle: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.White,
    fontSize: moderateScale(16)
  }
});
