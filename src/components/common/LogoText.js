import React from "react";
import { View, Image, Text, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import SafeView from "./SafeView";

const LogoText = props => {
  let { logo, text, heading, message, containerStyle } = props;
  return (
    <View
      style={[
        {
          backgroundColor: Constants.Colors.Transparent,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingVertical: moderateScale(25),
          ...Platform.select({
            web: {
              height: moderateScale(150),
              justifyContent: "space-between"
            },
            ios: {
              // flex: 1
            },
            android: {
              // flex: 1
            }
          })
        },
        containerStyle
      ]}
    >
      <SafeView />
      <Image
        style={{
          height: moderateScale(100),
          width: moderateScale(100)
        }}
        source={logo || Constants.Images.Logo}
      />
      <View
        style={{
          //flex: 0.5,
          justifyContent: "center",
          alignItems: "center"
          //top: moderateScale(20),
        }}
      >
        {heading ? (
          <Text
            style={{
              ...Constants.Fonts.Regular,
              fontSize: moderateScale(22),
              color: Constants.Colors.Secondary,
              paddingTop: moderateScale(25),
              textAlign: "center",
              textAlignVertical: "center"
            }}
          >
            {heading}
          </Text>
        ) : null}

        {text ? (
          <Text
            style={{
              ...Constants.Fonts.Bold,
              fontSize: moderateScale(20),
              color: Constants.Colors.Primary,
              textAlign: "center",
              textAlignVertical: "center",
              top: Platform.OS == "android" ? 20 : 40
            }}
          >
            {text}
          </Text>
        ) : message ? (
          <Text
            style={{
              ...Constants.Fonts.Regular,
              fontSize: moderateScale(14),
              color: Constants.Colors.Gray,
              textAlign: "center",
              textAlignVertical: "center",
              paddingVertical: moderateScale(25)
            }}
          >
            {message}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default LogoText;
