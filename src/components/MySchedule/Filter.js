/**
 * Name :Parshant Nagpal
 * Description: Contains the filter component
 * Date : 3 Jan 2019
 * File: Filter.js
 */

import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Filter = ({ prevDate, prevPress, nextDate, nextPress }) => {
  return (
    <View style={Styles.mainView}>
      <TouchableOpacity onPress={() => prevPress()}>
        <Image
          style={Styles.imageNextPrevious}
          source={
            Platform.OS == "web"
              ? Constants.Images.BlackPrevious
              : Constants.Images.Next
          }
          resizeMode={"contain"}
        />
      </TouchableOpacity>
      <Text style={[Styles.commonFontColor]}>
        {prevDate + " - " + nextDate}{" "}
      </Text>
      <TouchableOpacity onPress={() => nextPress()}>
        <Image
          style={Styles.imageNextPrevious}
          source={
            Platform.OS == "web"
              ? Constants.Images.BlackNext
              : Constants.Images.Previous
          }
          resizeMode={"contain"}
        />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  imageNextPrevious: { height: moderateScale(20), width: moderateScale(20) },
  mainView: {
    marginVertical: moderateScale(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  commonFontColor: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(15),
    fontWeight: "500",
    ...Platform.select({
      web: {
        color: Constants.Colors.Black
      }
    })
  }
});

Filter.propTypes = {
  prevDate: PropTypes.string,
  prevPress: PropTypes.func,
  nextDate: PropTypes.string,
  nextPress: PropTypes.func
};
Filter.defaultProps = {
  prevDate: null,
  prevPress: null,
  nextDate: null,
  nextPress: null
};
export default Filter;
