import React from "react";
import { View, Image, Text, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import SafeView from "../../components/common/SafeView";

const LogoText = props => {
  let { logo, text } = props;
  return (
    <View
      style={{
        backgroundColor: Constants.Colors.Transparent,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        top: moderateScale(25),
        //marginTop: moderateScale(25),
        ...Platform.select({
          web: {
            height: moderateScale(150)
          },
          ios: {
            flex: 1
          },
          android: {
            flex: 1
          }
        })
      }}
    >
      <SafeView />
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{
            height: moderateScale(100),
            width: moderateScale(100)
          }}
          source={logo || Constants.Images.Logo}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {text ? (
          <Text
            style={{
              ...Constants.Fonts.Bold,
              fontSize: moderateScale(20),
              color: Constants.Colors.Primary
            }}
          >
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default LogoText;
