/*
Name : Suraj Sanwal 
File Name : login.js
Description : Contains login screen.
Date : 11 Dec 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../actions";
import FormTextInput from "../components/common/FormTextInput";
import Header from "../components/common/Header";
import { moderateScale } from "../helpers/ResponsiveFonts";
import AuthButton from "../components/common/AuthButton";
import Constants from "../constants";

class ResetPssword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      reNewPass: "",
      deviceWidth: window.innerWidth
    };
  }
  static navigatorStyle = {
    navBarHidden: true
  };

  focusNext(next) {
    this[next].focus();
  }

  resetPssword = _.debounce(() => {
    let { appAction } = this.props;
    let { oldPassword, newPassword, reNewPass } = this.state;
    if (_.isEmpty(oldPassword.trim())) {
      appAction.showToast(
        Constants.AppCosntants.Notificaitons.Error,
        Constants.Strings.Common.OldPassword
      );
      return;
    }
    if (_.isEmpty(newPassword.trim())) {
      appAction.showToast(
        Constants.AppCosntants.Notificaitons.Error,
        Constants.Strings.Common.NewPassword
      );
      return;
    }
    if (_.isEmpty(reNewPass.trim())) {
      appAction.showToast(
        Constants.AppCosntants.Notificaitons.Error,
        Constants.Strings.Common.confirmPassword
      );
      return;
    }

    if (newPassword !== reNewPass) {
      appAction.showToast(
        Constants.AppCosntants.Notificaitons.Error,
        Constants.Strings.Common.PasswordNotMatched
      );
      return;
    }
    // appAction.ResetPssword({ username: email });
  });

  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  render() {
    let { deviceWidth } = this.state;
    return (
      <View style={Styles.containner}>
        <Header
          title={"Reset Password"}
          hideDrawer
          onBackPress={this.onBackPress}
        />
        <KeyboardAwareScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              ...Platform.select({
                web: {
                  height: Constants.BaseStyle.DEVICE_HEIGHT * 0.62,
                  width: deviceWidth > 600 ? deviceWidth / 2 : deviceWidth,
                  justifyContent: "space-evenly"
                },
                ios: {
                  height: Constants.BaseStyle.DEVICE_HEIGHT * 0.87,
                  width: Constants.BaseStyle.DEVICE_WIDTH,
                  justifyContent: "space-between"
                },
                android: {
                  height: Constants.BaseStyle.DEVICE_HEIGHT * 0.87,
                  width: Constants.BaseStyle.DEVICE_WIDTH,
                  justifyContent: "space-between"
                }
              }),

              overflow: "hidden"
            }}
          >
            <View style={Styles.FloatingInputContainer}>
              <FormTextInput
                image={Constants.Images.Password}
                placeHolderText={"Old Password"}
                onChangeText={oldPassword => {
                  this.setState({ oldPassword });
                }}
                value={this.state.oldPassword}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                secureText
                ref={ref => (this.oldPassword = ref)}
                onSubmitEditing={() => {
                  this.focusNext("newPassword");
                }}
              />
              <FormTextInput
                image={Constants.Images.Password}
                placeHolderText={"New Password"}
                onChangeText={newPassword => {
                  this.setState({ newPassword });
                }}
                value={this.state.newPassword}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                secureText
                ref={ref => (this.newPassword = ref)}
                onSubmitEditing={() => {
                  this.focusNext("reNewPass");
                }}
              />
              <FormTextInput
                image={Constants.Images.Password}
                placeHolderText={"Confirm New Password"}
                onChangeText={reNewPass => {
                  this.setState({ reNewPass });
                }}
                value={this.state.reNewPass}
                returnKeyType={"return"}
                autoCapitalize={"none"}
                secureText
                ref={ref => (this.reNewPass = ref)}
                onSubmitEditing={() => {
                  this.resetPssword();
                }}
              />
            </View>
            <AuthButton
              buttonName={"Reset Password"}
              gradientColors={Constants.Colors.ButtonGradients}
              onPress={this.resetPssword}
              gradientStyle={Styles.gradientStyle}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: "space-between"
  },
  FloatingInputContainer: {
    flex: 0.8,
    paddingVertical: moderateScale(40),
    paddingHorizontal: moderateScale(25),
    justifyContent: "center"
  },
  buttonStyle: {
    borderWidth: 0.4,
    borderColor: Constants.Colors.placehoder
  },
  gradientStyle: { borderRadius: 0 }
});

const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPssword);
