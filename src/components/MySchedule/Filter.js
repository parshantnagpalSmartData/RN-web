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
import moment from "moment";

const Filter = ({ prevDate, nextDate, onDateChange }) => {
  return (
    <View style={Styles.mainView}>
      <TouchableOpacity
        onPress={() => {
          onDateChange(
            moment(prevDate)
              .subtract(7, "d")
              .format("MM/DD/YYYY"),
            moment(nextDate)
              .subtract(7, "d")
              .format("MM/DD/YYYY")
          );
        }}
      >
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
        {`${moment(prevDate).format("ddd DD, MMM ")} - ${moment(
          nextDate
        ).format("DD MMM YYYY")}`}
      </Text>
      <TouchableOpacity
        onPress={() => {
          onDateChange(
            moment(prevDate)
              .add(7, "d")
              .format("MM/DD/YYYY"),
            moment(nextDate)
              .add(7, "d")
              .format("MM/DD/YYYY")
          );
        }}
      >
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
  imageNextPrevious: {
    height: moderateScale(20),
    width: moderateScale(20),
    ...Platform.select({
      web: {
        height: moderateScale(15),
        width: moderateScale(8)
      }
    })
  },
  mainView: {
    paddingVertical: moderateScale(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.4,
    borderBottomColor: Constants.Colors.Gray
  },
  commonFontColor: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(15),
    marginHorizontal: moderateScale(15),
    fontWeight: "500",
    ...Platform.select({
      web: {
        ...Constants.Fonts.Regular,
        color: Constants.Colors.Black,
        fontSize: moderateScale(16),
        marginHorizontal: moderateScale(25)
      }
    })
  }
});

Filter.propTypes = {
  nextDate: PropTypes.object,
  prevDate: PropTypes.object,
  onDateChange: PropTypes.func
};
Filter.defaultProps = {
  prevDate: null,
  nextDate: null,
  onDateChange: null
};
export default Filter;
