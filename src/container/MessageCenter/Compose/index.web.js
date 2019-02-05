/**
 * Name: Parshant Nagpal
 * Date: 5 feb 2019
 * Description: conatine the container for capose in app
 */

import React from "react";
import ComposeComponent from "./Compose";
import Constants from "../../../constants";
import { Platform, StyleSheet, View } from "react-native";
import { moderateScale } from "../../../helpers/ResponsiveFonts";

const Compose = props => {
  return (
    <View style={Styles.container}>
      <ComposeComponent {...props} />
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.White,
    ...Platform.select({
      web: {
        borderRadius: moderateScale(10),
        alignItems: "center",
        height: moderateScale(350),
        width: moderateScale(400),
        paddingTop: moderateScale(0),
        marginHorizontal: moderateScale(12)
      },
      ios: {
        height: Constants.BaseStyle.DEVICE_HEIGHT,
        width: Constants.BaseStyle.DEVICE_WIDTH
      },
      android: {
        height: Constants.BaseStyle.DEVICE_HEIGHT,
        width: Constants.BaseStyle.DEVICE_WIDTH
      }
    })
  }
});
export default Compose;
