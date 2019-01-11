/**
 * File: PatientsCompo
 * Author Name : Suraj Sanwal
 * Description : component for Patients details
 */

import React from "react";
import { View, StyleSheet, Text, FlatList, Platform } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Skill from "../common/Skill";
import Favourite from "../common/Favourite";
import PatientsDetails from "../common/PatientsDetails";

const Shifts = props => {
  let {
    skills,
    patient,
    onSkillPress,
    showAll,
    isSelected,
    onLikePress,
    loading,
    scheduleId,
    blankView
  } = props;
  if (showAll) {
    skills[skills.length + 1] = "Hide less";
  }
  return (
    <View style={Styles.container}>
      <View style={Styles.heading}>
        <Text style={Styles.skill}>Skills</Text>
        <Favourite
          isSelected={isSelected}
          onLikePress={onLikePress}
          patient={patient}
          loading={loading}
          scheduleId={scheduleId}
        />
      </View>
      {skills && (
        <FlatList
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center"
            // width: Constants.BaseStyle.DEVICE_WIDTH
          }}
          style={{
            ...Platform.select({
              web: {
                backgroundColor: Constants.Colors.LighBlueWhite,
                height: moderateScale(40),
                justifyContent: "center"
              }
            })
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={skills}
          keyExtractor={item => item.toString() + Math.random().toString()}
          listKey={(item, index) => "D" + index.toString()}
          key={`${
            showAll
              ? item => item.toString()
              : item => item + Math.random().toString()
          }`}
          numColumns={showAll ? (Platform.OS === "web" ? 6 : 3) : 4}
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
      )}
      <PatientsDetails
        // patient={patient}
        date={patient.SchedDate}
        StartTime={patient.StartTime}
        EndTime={patient.EndTime}
        age={patient.Patient_Age}
        gender={patient.Patient_Gender || patient.Sex}
        zip={patient.Patient_Zip || patient.Zip}
        birthday={patient.Bday}
        blankView={blankView}
      />
    </View>
  );
};

export default Shifts;

const Styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: moderateScale(10),
    borderBottomColor: Constants.Colors.placehoder,
    borderBottomWidth: 0.4,
    ...Platform.select({
      ios: { flex: 1 },
      android: { flex: 1 },
      web: {
        width: Constants.BaseStyle.DEVICE_WIDTH / 2.7,
        marginVertical: moderateScale(10),
        margin: moderateScale(10),
        backgroundColor: Constants.Colors.White,
        paddingHorizontal: moderateScale(0),
        borderBottomWidth: 0,
        shadowColor: "#000000",

        shadowOpacity: 0.1,
        shadowRadius: 2
      }
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
    color: Constants.Colors.Secondary,
    paddingLeft: moderateScale(10),
    ...Platform.select({
      web: {
        fontSize: moderateScale(13)
      }
    })
  }
});
