/*
Name : Suraj Sanwal
File Name : RightComponent.js
Description : Contains the DriverTripListing  screen
Date : 29 Nov 2018
*/
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import DivContainer from "./DivContainer";

/**
 *
 * @param {source, icon} props used to pass default icon or if having source.
 */
const RightComponent = props => {
  let { source, icon } = props;
  return (
    <View style={Styles.container}>
      <DivContainer className={"replyTopIcon"}>
        {source ? (
          <Image
            source={{ uri: source }}
            style={Styles.imgStyle}
            resizeMode={"center"}
          />
        ) : (
          <Image source={icon} />
        )}
      </DivContainer>
    </View>
  );
};

export default RightComponent;

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(100),
    borderWidth: 0.4,
    overflow: "hidden",
    backgroundColor: Constants.Colors.Transparent,
    borderColor: Constants.Colors.Transparent,
    alignItems: "center",
    justifyContent: "center"
  },
  imgStyle: {
    height: moderateScale(40),
    width: moderateScale(40)
  },
  dotStyle: {
    bottom: moderateScale(5),
    right: moderateScale(5)
  }
});
