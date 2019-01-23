import React from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import Constants from "../../../../constants";
import { moderateScale } from "../../../../helpers/ResponsiveFonts";
import DivContainer from "../../DivContainer";

const PatientInfo = props => {
  let { image, heading, value } = props;
  return (
    <DivContainer className={"MyPatientsDetailsWrapper"}>
      <View style={[Styles.boxStyle, Styles.ageStyle]}>
        {Platform.OS == "web" ? (
          <DivContainer
            style={Styles.imageBottomPadding}
            className={"Patienticon"}
          >
            <Image source={image} style={Styles.imageIconWeb} />
          </DivContainer>
        ) : null}
        <DivContainer className={"patientTitle"}>
          <Text style={Styles.heading}>{heading}</Text>
        </DivContainer>

        <DivContainer className={"patientDate"}>
          <Text style={Styles.value}>{value}</Text>
        </DivContainer>
      </View>
    </DivContainer>
  );
};

export default PatientInfo;

const Styles = StyleSheet.create({
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
    fontSize: moderateScale(12),
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
    fontSize: moderateScale(14),
    color: Constants.Colors.Secondary,
    paddingVertical: moderateScale(5),
    ...Platform.select({
      web: {
        fontSize: moderateScale(11)
      }
    })
  },
  imageIconWeb: { height: moderateScale(17), width: moderateScale(17) },
  imageBottomPadding: { paddingBottom: moderateScale(5) }
});
