/**
 * Name: Parshant Nagpal
 * File: MessageCounter.js
 * Date: 4 Feb 2019
 * Description: Contains the message center pagination component
 */

import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

const MessageCounter = () => (
  <View style={Styles.container}>
    {/* <Image
        source={Constants.Images.TrashInactive}
        style={{
          height: moderateScale(15),
          width: moderateScale(15),
          right: moderateScale(5)
        }}
      /> */}
    {/* <Text style={{width}}>1-50 of 200</Text> */}
    <View style={Styles.nextPrevContainer}>
      <Image source={Constants.Images.Next} style={Styles.nextImage} />
      <Image source={Constants.Images.Previous} style={Styles.PrevImage} />
    </View>
  </View>
);
export default MessageCounter;
const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",

    padding: moderateScale(10)
  },
  nextPrevContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    left: moderateScale(5)
  },
  nextImage: { height: moderateScale(15), width: moderateScale(15) },
  PrevImage: { height: moderateScale(15), width: moderateScale(15) }
});
