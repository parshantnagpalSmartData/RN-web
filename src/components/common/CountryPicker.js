/*
Name : Suraj Sanwal 
File Name : AuthHeader.js
Description : Contains the header screens.
Date : 17 Sept 2018
*/

import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

import Constants from "../../constants";
import { getCountry } from "../../helpers/country";
import CountryPicker from "react-native-country-picker-modal";

const CountryPickerModal = props => {
  let {
    onChange,
    isdCode,
    SubmitEditing,
    filterable,
    closeable,
    cca2,
    animationType,
    translation,
    disabled
  } = props;
  return (
    <TouchableOpacity
      style={PickerTheme.picker}
      onPress={() => this.countryPicker.openModal()}
    >
      <View style={PickerTheme.flagStyle}>
        <CountryPicker
          ref={ref => (this.countryPicker = ref)}
          countryList={getCountry()}
          disabled={disabled}
          onChange={onChange}
          SubmitEditing={SubmitEditing}
          filterable={filterable}
          closeable={closeable}
          cca2={cca2}
          animationType={animationType}
          translation={translation}
          styles={PickerTheme}
          closeButtonImage={Constants.Images.Common.Cancel}
          filterPlaceholderTextColor={Constants.Colors.Primary}
        />
        <Text style={PickerTheme.TextStyle}>+{isdCode}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CountryPickerModal;
const PickerTheme = StyleSheet.create({
  picker: {
    paddingRight: moderateScale(10),
    paddingLeft: 0,
    marginTop: moderateScale(18),
    borderBottomColor: Constants.Colors.Secondary,
    borderBottomWidth: 1
  },
  flagStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingVertical: moderateScale(10)
  },
  modalContainer: {
    backgroundColor: Constants.Colors.Yellow
  },
  contentContainer: {
    backgroundColor: Constants.Colors.White
  },
  header: {
    backgroundColor: Constants.Colors.Yellow
  },
  itemCountryName: {
    borderBottomWidth: 0
  },
  countryName: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular
  },
  letterText: {
    color: Constants.Colors.Primary,
    ...Constants.Fonts.Regular
  },
  input: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.Primary
  },

  TextStyle: {
    ...Constants.Fonts.SemiBold,
    fontSize: moderateScale(18),
    color: Constants.Colors.Black,
    textAlign: "center",
    textAlignVertical: "bottom",
    paddingLeft: moderateScale(5)
  }
});
