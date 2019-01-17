/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import { View, StyleSheet, Text, Platform, Image } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import moment from "moment";

const PatientsDetails = props => {
  let {
    date,
    StartTime,
    EndTime,
    age,
    gender,
    zip,
    agePatient,
    blankView
  } = props;
  return (
    <View style={Styles.container}>
      {agePatient ? (
        <View style={[Styles.boxStyle, Styles.ageStyle]}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.Age}
                style={Styles.imageIconWeb}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Age</Text>
          <Text style={Styles.value}>{agePatient}</Text>
        </View>
      ) : null}
      {date ? (
        <View style={Styles.boxStyle}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.Calander}
                style={Styles.imageIconWeb}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Date</Text>
          <Text style={Styles.value}>
            {moment(date).format("MM-DD-YYYY ddd")}
          </Text>
        </View>
      ) : null}
      {StartTime && EndTime ? (
        <View style={Styles.boxStyle}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.Date}
                style={Styles.imageIconWeb}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Time</Text>
          <Text style={Styles.value}>
            {StartTime} -{EndTime}
          </Text>
        </View>
      ) : null}
      {age ? (
        <View style={Styles.boxStyle}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.Age}
                style={Styles.imageIconWeb}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Age</Text>
          <Text style={Styles.value}>{age} yrs</Text>
        </View>
      ) : null}
      {gender ? (
        <View style={Styles.boxStyle}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.Gender}
                style={Styles.imageIconWeblargeGender}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Patient Gender</Text>
          <Text style={Styles.value}>{gender}</Text>
        </View>
      ) : null}
      {zip ? (
        <View style={Styles.boxStyle}>
          {Platform.OS == "web" ? (
            <View style={Styles.imageBottomPadding}>
              <Image
                source={Constants.Images.ZipCode}
                style={Styles.imageIconWeblargeHeightIcons}
              />
            </View>
          ) : null}
          <Text style={Styles.heading}>Zipcode</Text>
          <Text style={Styles.value}>{zip}</Text>
        </View>
      ) : null}
      {blankView ? (
        <View style={Styles.boxStyle}>
          <Text style={Styles.heading} />
          <Text style={Styles.value} />
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
  },
  ageStyle: {
    ...Platform.select({
      web: {
        width: Constants.BaseStyle.DEVICE_WIDTH * 0.04
      }
    })
  },
  boxStyle: {
    width:
      Platform.OS === "web"
        ? Constants.BaseStyle.DEVICE_WIDTH * 0.1
        : Constants.BaseStyle.DEVICE_WIDTH / 3,
    paddingVertical: moderateScale(5),
    paddingHorizontal:
      Platform.OS === "web" ? moderateScale(5) : moderateScale(10),
    alignItems: Platform.OS === "web" ? "center" : "flex-start",
    justifyContent: Platform.OS === "web" ? "flex-start" : "flex-start"
  },
  heading: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(14),
    color: Constants.Colors.Black,
    ...Platform.select({
      web: {
        textAlign: "center",
        fontSize: moderateScale(13)
      }
    })
  },
  value: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(12),
    color: Constants.Colors.Secondary,
    paddingVertical: moderateScale(5),
    ...Platform.select({
      web: {
        fontSize: moderateScale(11)
      }
    })
  },
  imageIconWeb: { height: moderateScale(17), width: moderateScale(17) },
  imageBottomPadding: { paddingBottom: moderateScale(5) },
  imageIconWeblargeHeightIcons: {
    height: moderateScale(20),
    width: moderateScale(14)
  },
  imageIconWeblargeGender: {
    height: moderateScale(21),
    width: moderateScale(18)
  }
});
