/**
 * Name :Suraj Sanwal
 * File Name : ToastNotification.js
 * Description : Contains the under Development component
 * Date : 25 Sept 2018
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const UnderDevelopment = () => {
  return (
    <View style={Styles.containner}>
      <Text style={Styles.text}>Under Development</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    ...Constants.Fonts.AlternatesExtraLightItalic,
    fontSize: moderateScale(20),
    color: Constants.Colors.Black
  }
});

export default UnderDevelopment;
