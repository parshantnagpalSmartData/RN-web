/*
Name : Suraj Sanwal 
File Name : AuthHeader.js
Description : Contains the header for auth screens.
Date : 12 Sept 2018
*/

import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

import Constants from "../../constants";
import SafeView from "./SafeView";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Header = props => {
  let { heading, disableBack, navigator } = props;

  return (
    <View>
      <SafeView />
      <View style={[Styles.mainAuthContainer]}>
        {!disableBack ? (
          <View>
            <TouchableOpacity
              style={Styles.backButtonContainer}
              onPress={() => {
                navigator.pop();
              }}
            >
              <Image source={Constants.Images.Common.Back} />
            </TouchableOpacity>
            <View style={Styles.headingContainer}>
              {heading ? <Text style={Styles.heading}>{heading}</Text> : null}
            </View>
            <View style={Styles.rightButton} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  mainAuthContainer: {
    flexDirection: "row",
    backgroundColor: Constants.Colors.Yellow,
    padding: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15)
  },
  backButtonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10)
  },
  headingContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  rightButton: {
    flex: 0.1
  },
  heading: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(18),
    color: Constants.Colors.Black
  },
  menuStyle: { alignSelf: "flex-end", paddingHorizontal: moderateScale(20) },
  triggerStyle: { flexDirection: "row", alignItems: "center" },
  images: { height: moderateScale(40), width: moderateScale(40) },
  optionsContainerStyle: { marginTop: 12, zIndex: 9999 },
  loginText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16)
  },
  menuText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(20)
  },
  selectedMenu: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(20),
    paddingHorizontal: moderateScale(5)
  }
});
