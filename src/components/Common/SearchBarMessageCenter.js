/**
 * Name: Parshant Nagpal
 * File:
 * Date: 4 Feb 2019
 * Description : search bar component of message center
 */
import React from "react";
import { TextInput, Image, StyleSheet, View } from "react-native";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const SearchBar = ({ searchText, onSearch }) => {
  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.textInput}
        value={searchText}
        onChangeText={value => onSearch(value)}
        numberOfLines={1}
        underlineColorAndroid={Constants.Colors.Transparent}
      />
      <Image
        source={Constants.Images.SearchMessageCenter}
        style={Styles.image}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.Colors.Transparent,
    height: moderateScale(40),
    borderColor: Constants.Colors.Gray,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25%",
    borderRadius: moderateScale(25),
    margin: moderateScale(10)
  },
  textInput: {
    flex: 1,
    outline: "none",
    paddingHorizontal: moderateScale(20)
  },
  image: {
    height: moderateScale(15),
    width: moderateScale(15),
    right: moderateScale(5)
  }
});
export default SearchBar;
