/*
Name : Suraj Sanwal 
File Name : AuthHeader.js
Description : Contains the header screens.
Date : 17 Sept 2018
*/

import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

import Constants from "../../constants";
import SafeView from "./SafeView";
import FormTextInput from "./FormTextInput";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Header = props => {
  let {
    hideBack,
    hideDrawer,
    color,
    subTitle,
    title,
    rightIcon,
    onRightPress,
    rightText,
    navigator,
    headerText,
    onBackPress,
    searchBox,
    onChangeSearchText,
    searchText,
    searchPlaceHolder,
    rightComponent
  } = props;

  return (
    <View style={{ backgroundColor: color || Constants.Colors.Transparent }}>
      <SafeView />
      <View
        style={[
          Styles.container,
          {
            backgroundColor: color,
            paddingVertical: !searchBox ? moderateScale(15) : 0
          }
        ]}
      >
        {!hideDrawer ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => {
              navigator.toggleDrawer({
                side: "left"
              });
            }}
          >
            <Image
              source={Constants.Images.Drawer.Toggle}
              resizeMode={"contain"}
              style={Styles.iconBtn}
            />
            {/* <Image
              source={{
                uri:
                  "https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
                width: 40,
                height: 40
              }}
            /> */}
          </TouchableOpacity>
        ) : !hideBack ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => {
              onBackPress ? onBackPress() : navigator.pop();
            }}
          >
            <Image
              source={Constants.Images.Common.Back}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        ) : (
          <View style={Styles.iconBtn} />
        )}
        <View
          style={[
            Styles.header,
            {
              justifyContent: searchBox ? "flex-start" : "center",
              alignItems: searchBox ? "flex-start" : "center"
            }
          ]}
        >
          {searchBox ? (
            <FormTextInput
              onChangeText={text => onChangeSearchText(text)}
              value={searchText}
              placeHolderText={searchPlaceHolder}
              style={Styles.searchBox}
              inputStyle={Styles.inputStyle}
            />
          ) : null}
          {title ? (
            <Text numberOfLines={2} style={[Styles.headerText, headerText]}>
              {title}
            </Text>
          ) : null}
          {subTitle ? (
            <Text numberOfLines={1} style={Styles.subHeaderText}>
              {subTitle}
            </Text>
          ) : null}
        </View>
        {rightIcon ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => onRightPress()}
          >
            <Image source={rightIcon} resizeMode={"contain"} />
          </TouchableOpacity>
        ) : rightText ? (
          <TouchableOpacity
            style={Styles.iconBtn}
            onPress={() => onRightPress()}
          >
            <Text style={Styles.skip}>{rightText}</Text>
          </TouchableOpacity>
        ) : rightComponent ? (
          <View style={Styles.iconBtn}>{rightComponent}</View>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    flexDirection: "row",
    backgroundColor: Constants.Colors.transparent
  },
  iconBtn: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(110)
  },
  headerText: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.Black,
    fontSize: moderateScale(21),
    textAlign: "center",
    textAlignVertical: "center"
  },
  subHeaderText: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.White,
    fontSize: moderateScale(16),
    textAlign: "center",
    textAlignVertical: "center"
  },
  searchBox: {
    borderColor: Constants.Colors.transparent,
    borderRadius: 0,
    marginTop: moderateScale(0),
    marginHorizontal: moderateScale(5),
    justifyContent: "flex-start",
    alignItems: "center",
    height: moderateScale(40),
    flexDirection: "row",
    width: Constants.BaseStyle.DEVICE_WIDTH / 1.4
  },
  inputStyle: {
    color: Constants.Colors.Primary,
    flex: 1,
    paddingHorizontal: moderateScale(5),
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(17),
    paddingVertical: moderateScale(5)
  },
  skip: {
    color: Constants.Colors.gray,
    paddingHorizontal: moderateScale(5),
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    textAlign: "right"
  }
});
