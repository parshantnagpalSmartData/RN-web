/**
 * Name: Parshant Nagpal
 * File : Checkbox.js
 * Description : contains the checkbox component
 */
import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const CheckBox = ({ onPress, isChecked }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={Styles.imageStyle}
        source={isChecked ? Constants.Images.Check : Constants.Images.UnCheck}
      />
    </TouchableOpacity>
  );
};
export default CheckBox;

const Styles = StyleSheet.create({
  imageStyle: { height: moderateScale(12), width: moderateScale(12) }
});
