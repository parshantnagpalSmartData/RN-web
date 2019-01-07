/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Favourite = props => {
  let { isSelected, onLikePress, patient, loading, scheduleId } = props;
  return (
    <TouchableOpacity
      style={Styles.buttonStyle}
      onPress={() => onLikePress(patient.SchedID)}
    >
      {loading && patient.SchedID === scheduleId ? (
        <ActivityIndicator />
      ) : isSelected ? (
        <Image
          source={Constants.Images.Like}
          resizeMode={"contain"}
          style={Styles.img}
        />
      ) : (
        <Image
          source={Constants.Images.UnLike}
          resizeMode={"contain"}
          style={Styles.img}
        />
      )}
    </TouchableOpacity>
  );
};

export default Favourite;

const Styles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    height: moderateScale(20),
    width: moderateScale(20)
  }
});
