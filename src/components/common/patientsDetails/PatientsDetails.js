/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import moment from "moment";

import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import PatientInfo from "./patientInfo";
import DivContainer from "../DivContainer";

const PatientsDetails = props => {
  let {
    date,
    StartTime,
    EndTime,
    age,
    gender,
    zip,
    birthday,
    blankView
  } = props;
  return (
    <DivContainer>
      <View style={Styles.container}>
        {birthday ? (
          <PatientInfo
            image={Constants.Images.Age}
            heading={"Age"}
            value={`${moment().diff(birthday, "years")} yrs`}
          />
        ) : null}
        {date ? (
          <PatientInfo
            image={Constants.Images.Calander}
            heading={"Date"}
            value={`${moment(date).format("MM-DD-YYYY ddd")}`}
          />
        ) : null}
        {StartTime && EndTime ? (
          <PatientInfo
            image={Constants.Images.Date}
            heading={"Time"}
            value={`${StartTime}-${EndTime}`}
          />
        ) : null}
        {age ? (
          <PatientInfo
            image={Constants.Images.Age}
            heading={"Age"}
            value={`${age} yrs`}
          />
        ) : null}
        {gender ? (
          <PatientInfo
            image={Constants.Images.Gender}
            heading={"Patient Gender"}
            value={gender}
          />
        ) : null}
        {zip ? (
          <PatientInfo
            image={Constants.Images.ZipCode}
            heading={"Zipcode"}
            value={zip}
          />
        ) : null}
        {blankView ? <PatientInfo image={""} heading={""} value={""} /> : null}
      </View>
    </DivContainer>
  );
};

export default PatientsDetails;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH * 0.38
        : Constants.BaseStyle.DEVICE_WIDTH,
    paddingVertical: moderateScale(5),
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    ...Platform.select({
      web: {
        justifyContent: "space-between"
      }
    })
  }
});
