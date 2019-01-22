/*
Name : Suraj Sanwal 
File Name : ListEmptyComponent.js
Description : Contains the Flatlist empty screens.
Date : 17 Sept 2018
*/

import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import propTypes from "prop-types";

const ListEmptyComponent = props => {
  let { message, loader } = props;
  if (!loader) {
    return (
      <View style={Styles.containner}>
        <Text style={Styles.noScheduleFoundText}>{message}</Text>
      </View>
    );
  }
  return null;
};
export default ListEmptyComponent;

const Styles = StyleSheet.create({
  containner: {
    height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  noScheduleFoundText: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(20),
    color: Constants.Colors.placehoder,
    ...Platform.select({
      web: {
        fontSize: moderateScale(15)
      }
    })
  }
});

ListEmptyComponent.propTypes = {
  message: propTypes.string,
  loader: propTypes.bool
};

ListEmptyComponent.defaultProps = {
  message: null,
  loader: false
};
