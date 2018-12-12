/*
Name : Suraj Sanwal 
File Name : AuthButton.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../constants";

const Button = props => {
  let {
    buttonName,
    buttonStyle,
    gradientStyle,
    textStyle,
    onPress,
    arrow,
    gradientColors,
    loading,
    icon,
    disabled
  } = props;

  return (
    <TouchableOpacity
      style={[Styles.buttonContainer, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={
          gradientColors || [
            Constants.Colors.Primary,
            Constants.Colors.Secondary
          ]
        }
        style={[Styles.gradientStyle, gradientStyle]}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Constants.Colors.White} />
        ) : (
          <View>
            <View style={{ flexDirection: "row" }}>
              {icon ? <Image source={icon} /> : null}
              <Text style={[Styles.buttonText, textStyle]}>{buttonName}</Text>
            </View>
            {arrow ? <Image source={Constants.Images.Common.Next} /> : null}
          </View>
        )}
      </LinearGradient>
      {/* <View style={{ flex: 0.7 }} /> */}
    </TouchableOpacity>
  );
};

export default Button;
const Styles = StyleSheet.create({
  gradientStyle: {
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(20)
  },
  buttonText: {
    ...Constants.Fonts.SemiBold,
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: Constants.Colors.Yellow,
    textAlignVertical: "center",
    paddingHorizontal: moderateScale(5)
  }
});
