/**
 * Name :Gurtej Singh
 * File Name : PopOver.js
 * Description : Contains the login PopOver
 * Date : 7 Sept 2018
 */
import React from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import Menu, {
  MenuItem,
  MenuDivider
} from "../../lib/react-native-material-menu";
import Constants from "../../constants";
import SafeView from "./SafeView";
import { moderateScale } from "../../helpers/ResponsiveFonts";

class PopOver extends React.Component {
  _menu = null;
  constructor(props) {
    super(props);
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  onChange = id => {
    let { onUserChange } = this.props;
    this.hideMenu();
    // if (id != Constants.AppCosntants.UserTypes.Rider) {
    //   setTimeout(() => {
    //     alert("Under Development");
    //   }, 300);
    // } else {
    onUserChange(id);
    // }
  };
  render() {
    let { userType } = this.props;
    let userTypes = [
      { id: Constants.AppCosntants.UserTypes.Rider, value: "User" },
      { id: Constants.AppCosntants.UserTypes.Driver, value: "Driver" },
      { id: Constants.AppCosntants.UserTypes.Admin, value: "Admin" }
    ];
    return (
      <TouchableOpacity
        style={{ alignItems: "flex-end" }}
        onPress={this.showMenu}
      >
        <SafeView />
        <Menu
          ref={this.setMenuRef}
          button={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={Styles.selectedMenu}>
                Sign in as{" "}
                {userType === Constants.AppCosntants.UserTypes.Rider
                  ? "User"
                  : userType === Constants.AppCosntants.UserTypes.Admin
                  ? "Admin"
                  : "Driver"}
              </Text>
              <Image
                source={
                  userType === Constants.AppCosntants.UserTypes.Rider
                    ? Constants.Images.Common.Rider
                    : userType === Constants.AppCosntants.UserTypes.Admin
                    ? Constants.Images.Common.Admin
                    : Constants.Images.Common.Driver
                }
                resizeMode={"contain"}
                style={{
                  marginLeft: 5,
                  height: moderateScale(40),
                  width: moderateScale(40)
                }}
              />
            </View>
          }
          // style={{
          //   top: Platform.OS == "ios" ? moderateScale(85) : moderateScale(30),
          //   right: moderateScale(30)
          // }}
        >
          {userTypes.map(item => {
            if (item.id != userType) {
              return (
                <View key={item.id}>
                  <MenuDivider color={Constants.Colors.placehoder} />
                  <MenuItem
                    key={item.id}
                    onPress={() => {
                      this.onChange(item.id);
                    }}
                    textStyle={{
                      ...Constants.Fonts.Regular,
                      fontSize: moderateScale(20),
                      color: Constants.Colors.Primary
                    }}
                    style={{ width: moderateScale(200) }}
                  >
                    {item.value}
                  </MenuItem>
                </View>
              );
            } else {
              return null;
            }
          })}
        </Menu>
      </TouchableOpacity>
    );
  }
}

export default PopOver;

const Styles = StyleSheet.create({
  mainAuthContainer: {
    flexDirection: "row",
    backgroundColor: Constants.Colors.Transparent,
    padding: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15)
  },
  backButtonContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(10)
  },
  headingContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center"
  },
  rightButton: {
    flex: 0.1
  },
  menuStyle: { alignSelf: "flex-end", paddingHorizontal: moderateScale(20) },
  triggerStyle: { flexDirection: "row", alignItems: "center" },
  images: { height: moderateScale(40), width: moderateScale(40) },
  optionsContainerStyle: { marginTop: 12, zIndex: 9999 },
  loginText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16)
  },
  menuText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(20)
  },
  selectedMenu: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(20),
    paddingHorizontal: moderateScale(5)
  }
});
