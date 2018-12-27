import React from "react";
import { View, Image, Text, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const LogoText = props => {
  let { logo, text, heading, message, containerStyle } = props;
  return (
    <View
      style={[
        {
          backgroundColor: Constants.Colors.Transparent,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          ...Platform.select({
            web: {
              height: moderateScale(150),
              paddingVertical: moderateScale(25)
            },
            ios: {
              flex: 1
            },
            android: {
              flex: 1
            }
          })
        },
        containerStyle
      ]}
    >
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
          alignItems: "center",
          top: moderateScale(20)
          //backgroundColor: "green"
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
              textAlignVertical: "center"
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
