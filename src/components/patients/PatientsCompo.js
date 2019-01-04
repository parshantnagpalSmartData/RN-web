/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import { View, StyleSheet, Text, FlatList, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Skill from "./Skill";
import Favourite from "./Favourite";
import PatientsDetails from "./PatientsDetails";

const PatientsCompo = props => {
  let {
    skills,
    patient,
    onSkillPress,
    showAll,
    isSelected,
    onLikePress
  } = props;
  if (showAll) {
    skills[skills.length + 1] = "Hide less";
  }
  return (
    <View style={Styles.container}>
      <View style={Styles.heading}>
        <Text style={Styles.skill}>Skill</Text>
        <Favourite isSelected={isSelected} onLikePress={onLikePress} />
      </View>
      <FlatList
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
        data={skills}
        keyExtractor={item => item.toString() + Math.random().toString()}
        key={`${
          showAll
            ? item => item.toString()
            : item => item + Math.random().toString()
        }`}
        numColumns={showAll ? (Platform.OS === "web" ? 8 : 3) : 4}
        renderItem={({ item, index }) => {
          if (!showAll) {
            if (index < 3) {
              return (
                <Skill
                  key={index}
                  skill={item}
                  onSkillPress={() => onSkillPress(index)}
                />
              );
            } else if (index === 3) {
              return (
                <Skill
                  key={index}
                  skill={`+ ${skills && skills.length - index}`}
                  onSkillPress={() => onSkillPress(index)}
                />
              );
            }
          } else {
            return (
              <Skill
                key={index}
                skill={item}
                onSkillPress={() => onSkillPress(index)}
              />
            );
          }
        }}
      />
      <PatientsDetails patient={patient} />
    </View>
  );
};

export default PatientsCompo;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: moderateScale(10),
    borderBottomColor: Constants.Colors.placehoder,
    borderBottomWidth: 0.4,
    ...Platform.select({
      ios: { flex: 1 },
      android: { flex: 1 }
    })
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  skill: {
    ...Constants.Fonts.Medium,
    fontSize: moderateScale(17),
    color: Constants.Colors.Secondary
  }
});
