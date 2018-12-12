/*
Name : Suraj Sanwal 
File Name : login.js
Description : Contains login screen.
Date : 11 Dec 2018
*/

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";

import FloatingInput from "../../components/common/FloatingInput";
import Header from "../../components/common/Header";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import Regex from "../../helpers/Regex";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  submitLogin = _.debounce(() => {
    let { email, password } = this.state;
    if (_.isEmpty(email.trim())) {
      // toastMessage(navigator, {
      //   type: Constants.AppCosntants.Notificaitons.Error,
      //   message: Constants.Strings.Common.EmptyEmailMsg
      // });
      alert(Constants.Strings.Common.EmptyEmailMsg);
      return;
    }
    if (!Regex.validateEmail(email.trim())) {
      // toastMessage(navigator, {
      //   type: Constants.AppCosntants.Notificaitons.Error,
      //   message: Constants.Strings.Common.ValidEmailAddress
      // });
      alert(Constants.Strings.Common.ValidEmailAddress);
      return;
    }
    alert("mail has been sent to your email account");
    return;
  });

  render() {
    let title = `ACT HOME HEALTH SERVICES, INC.
    NURSE PORTAL`;
    return (
      <View style={Styles.containner}>
        <Header
          title={title}
          hideBack
          hideDrawer
          color="#009"
          headerText={{ color: "#fff" }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              height:
                Platform.OS === "web"
                  ? Constants.BaseStyle.DEVICE_HEIGHT * 0.845
                  : Constants.BaseStyle.DEVICE_HEIGHT * 0.87,
              width:
                Platform.OS === "web"
                  ? Constants.BaseStyle.DEVICE_WIDTH / 2
                  : Constants.BaseStyle.DEVICE_WIDTH,
              justifyContent: "space-between",
              overflow: "hidden"
            }}
          >
            <View style={Styles.FloatingInputContainer}>
              <FloatingInput
                label={"Username"}
                onChangeText={email => {
                  this.setState({ email });
                }}
                value={this.state.email}
                keyboardType={"email-address"}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => {
                  this.focusNext("password");
                }}
              />
            </View>
            <View>
              <AuthButton
                buttonName={"Reset Password"}
                gradientColors={["#009", "#009"]}
                textStyle={{ color: "#fff" }}
                buttonStyle={Styles.buttonStyle}
                gradientStyle={Styles.gradientStyle}
                onPress={this.submitLogin}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1,
    justifyContent: "center"
  },
  FloatingInputContainer: {
    paddingVertical: moderateScale(40),
    paddingHorizontal: moderateScale(25),
    justifyContent: "flex-start"
  },
  buttonStyle: {
    borderWidth: 0.4,
    borderColor: Constants.Colors.placehoder
  },
  gradientStyle: { borderRadius: 0 }
});

export default ForgotPassword;
