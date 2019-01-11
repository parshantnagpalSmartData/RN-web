/**
 * File: Skill
 * Author Name : Suraj Sanwal
 * Description : component for Skill
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Skill = props => {
  let { gradientStyle, gradientColors, skill, onSkillPress } = props;
  return (
    <TouchableOpacity style={Styles.container} onPress={onSkillPress}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={gradientColors || Constants.Colors.ButtonGradients}
        style={[Styles.gradientStyle, gradientStyle]}
      >
        <Text style={Styles.skill}>{skill}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Skill;

const Styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    ...Platform.select({
      ios: {
        alignItems: "center",
        justifyContent: "center"
      },
      android: {
        alignItems: "center",
        justifyContent: "center"
      }
    })
  },
  gradientStyle: {
    borderRadius: moderateScale(25),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: moderateScale(5)
  },
  skill: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(11),
    color: Constants.Colors.White
  }
});
