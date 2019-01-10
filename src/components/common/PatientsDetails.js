/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import moment from "moment";

const PatientsDetails = props => {
  let { date, StartTime, EndTime, age, gender, zip, birthday } = props;
  return (
    <View style={Styles.container}>
      {birthday ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Age</Text>
          <Text style={Styles.value}>
            {moment().diff(birthday, "years")} yrs
          </Text>
        </View>
      ) : null}
      {date ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Date</Text>
          <Text style={Styles.value}>
            {moment(date).format("MM-DD-YYYY ddd")}
          </Text>
        </View>
      ) : null}
      {StartTime && EndTime ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Time</Text>
          <Text style={Styles.value}>
            {StartTime} -{EndTime}
          </Text>
        </View>
      ) : null}
      {age ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Age</Text>
          <Text style={Styles.value}>{age} yrs</Text>
        </View>
      ) : null}
      {gender ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Patient Gender</Text>
          <Text style={Styles.value}>{gender}</Text>
        </View>
      ) : null}
      {zip ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading}>Zipcode</Text>
          <Text style={Styles.value}>{zip}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default PatientsDetails;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH - moderateScale(400)
        : Constants.BaseStyle.DEVICE_WIDTH,
    padding: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  boxStyle: {
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH * 0.1
        : Constants.BaseStyle.DEVICE_WIDTH / 3.2,
    paddingVertical: moderateScale(5),
    alignItems: "center",
    justifyContent: Platform.OS === "web" ? "flex-start" : "center"
  },
  heading: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(14),
    color: Constants.Colors.Black
  },
  value: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(12),
    color: Constants.Colors.Secondary,
    paddingVertical: moderateScale(5)
  }
});
