/*
Name : Suraj Sanwal
File Name : Searchbar.js
Description : Contains the Seachbar Component
Date : 14 Jan 2018
*/

import React from "react";
import { Image, View, TextInput, StyleSheet } from "react-native";
import propTypes from "prop-types";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

const SearchBar = props => {
  let { style, inputStyle, value, onTextChange, onEndEditing } = props;
  return (
    <View style={[Styles.container, style]}>
      <View style={Styles.SearchIconView}>
        <Image
          source={Constants.Images.Search}
          resizeMode={"contain"}
          style={Styles.searchIcon}
        />
      </View>
      <View style={Styles.inputView}>
        <TextInput
          onTextChange={onTextChange}
          onEndEditing={onEndEditing}
          value={value}
          style={[Styles.inputStyle, inputStyle]}
          placeholder={"Search"}
          placeholderTextColor={Constants.Colors.placehoder}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(50),
    flexDirection: "row",
    alignItems: "center",
    margin: moderateScale(25),
    borderRadius: moderateScale(25),
    borderColor: Constants.Colors.placehoder,
    borderWidth: 0.4,
    backgroundColor: Constants.Colors.White
  },
  SearchIconView: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    margin: moderateScale(5)
  },
  searchIcon: { height: moderateScale(40), width: moderateScale(40) },
  inputView: {
    justifyContent: "space-between",
    marginLeft: moderateScale(8)
  },
  inputStyle: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Black
  }
});

SearchBar.defaultProps = {
  style: null,
  inputStyle: null,
  value: "",
  onTextChange: null,
  onEndEditing: null
};

SearchBar.propTypes = {
  style: propTypes.object,
  inputStyle: propTypes.object,
  value: propTypes.string,
  onTextChange: propTypes.func,
  onEndEditing: propTypes.func
};
