/*
Name : Suraj Sanwal 
File Name : AuthHeader.js
Description : Contains the header screens.
Date : 17 Sept 2018
*/

import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Constants from "../../constants";
import SafeView from "./SafeView";
import FormTextInput from "./FormTextInput";
import { moderateScale } from "../../helpers/ResponsiveFonts";

const Header = props => {
  let {
    onDrawerPress,
    hideBack,
    hideDrawer,
    color,
    subTitle,
    title,
    rightIcon,
    onRightPress,
    rightText,
    headerText,
    onBackPress,
    searchBox,
    onChangeSearchText,
    searchText,
    searchPlaceHolder,
    rightComponent,
    gradientColors,
    gradientStyle
  } = props;

  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={gradientColors || Constants.Colors.ButtonGradients}
      style={[Styles.gradientStyle, gradientStyle]}
    >
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
          {!hideDrawer && Platform.OS !== "web" ? (
            <TouchableOpacity style={Styles.iconBtn} onPress={onDrawerPress}>
              <Image
                source={Constants.Images.Drawer}
                resizeMode={"contain"}
                style={Styles.icon}
              />
            </TouchableOpacity>
          ) : !hideBack && Platform.OS !== "web" ? (
            <TouchableOpacity style={Styles.iconBtn} onPress={onBackPress}>
              <Image
                source={Constants.Images.Back}
                resizeMode={"contain"}
                style={Styles.icon}
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
              <Image
                source={rightIcon}
                resizeMode={"contain"}
                style={Styles.icon}
              />
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
    </LinearGradient>
  );
};

export default Header;

const Styles = StyleSheet.create({
  gradientStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
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
  icon: {
    height: moderateScale(20),
    width: moderateScale(20)
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScale(40),
    width: Constants.BaseStyle.DEVICE_WIDTH - moderateScale(110)
  },
  headerText: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.White,
    fontSize: moderateScale(16),
    textAlign: "center",
    textAlignVertical: "center",
    ...Platform.select({
      web: {
        fontSize: moderateScale(20),
        ...Constants.Fonts.Regular
      }
    })
  },
  subHeaderText: {
    ...Constants.Fonts.SemiBold,
    color: Constants.Colors.White,
    fontSize: moderateScale(14),
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
