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
  let { patient } = props;
  return (
    <View style={Styles.container}>
      <View style={Styles.boxStyle}>
        <Text style={Styles.heading}>Date</Text>
        <Text style={Styles.value}>
          {moment(patient.SchedDate).format("MM-DD-YYYY ddd")}
        </Text>
      </View>
      <View style={Styles.boxStyle}>
        <Text style={Styles.heading}>Time</Text>
        <Text style={Styles.value}>
          {patient.StartTime} -{patient.EndTime}
        </Text>
      </View>
      <View style={Styles.boxStyle}>
        <Text style={Styles.heading}>Age</Text>
        <Text style={Styles.value}>{patient.Patient_Age} yrs</Text>
      </View>
      <View style={Styles.boxStyle}>
        <Text style={Styles.heading}>Patient Gender</Text>
        <Text style={Styles.value}>{patient.Patient_Gender}</Text>
      </View>
      <View style={Styles.boxStyle}>
        <Text style={Styles.heading}>Zipcode</Text>
        <Text style={Styles.value}>{patient.Patient_Zip}</Text>
      </View>
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
    padding: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  boxStyle: {
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH * 0.1
        : Constants.BaseStyle.DEVICE_WIDTH / 3.2,
    paddingVertical: moderateScale(10),
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
    paddingVertical: moderateScale(10)
  }
});
