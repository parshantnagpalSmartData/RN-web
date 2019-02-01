/*
Name : Suraj Sanwal 
File Name : ListEmptyComponent.js
Description : Contains the Flatlist empty screens.
Date : 17 Sept 2018
*/

import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import propTypes from "prop-types";
import DivContainer from "./DivContainer";

const ListEmptyComponent = props => {
  let { message, loader } = props;
  if (!loader) {
    return (
      <DivContainer
        className={"listEmptycopmonent"}
        styleWeb={Styles.containner}
        styleApp={Styles.containner}
      >
        <Text style={Styles.noScheduleFoundText}>{message}</Text>
      </DivContainer>
    );
  }
  return null;
};
export default ListEmptyComponent;

const Styles = StyleSheet.create({
  containner: {
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8
      },
      android: {
        height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8
      }
    })
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
