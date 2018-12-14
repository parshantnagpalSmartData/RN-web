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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
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
  static navigatorStyle = {
    navBarHidden: true
  };

  submitEmail = _.debounce(() => {
    let { appAction } = this.props;
    let { email, password } = this.state;
    if (_.isEmpty(email.trim())) {
      alert(Constants.Strings.Common.EmptyEmailMsg);
      return;
    }
    if (!Regex.validateEmail(email.trim())) {
      alert(Constants.Strings.Common.ValidEmailAddress);
      return;
    }
    appAction.forgotPassword({ username: email });
  });

  render() {
    let title = `ACT HOME HEALTH SERVICES, INC.
    NURSE PORTAL`;
    return (
      <View style={Styles.containner}>
        <Header
          title={title}
          hideDrawer
          color="#9999D6"
          headerText={{ color: "#fff" }}
        />
        <KeyboardAwareScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              height:
                Platform.OS === "web"
                  ? Constants.BaseStyle.DEVICE_HEIGHT
                  : Constants.BaseStyle.DEVICE_HEIGHT * 0.87,
              width:
                Platform.OS === "web"
                  ? Constants.BaseStyle.DEVICE_WIDTH / 2
                  : Constants.BaseStyle.DEVICE_WIDTH,
              justifyContent:
                Platform.OS === "web" ? "space-evenly" : "space-between",
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
            <View style={{ flex: 0.15 }}>
              <AuthButton
                buttonName={"Forgot Password"}
                gradientColors={["#9999D6", "#9999D6"]}
                textStyle={{ color: "#fff" }}
                buttonStyle={Styles.buttonStyle}
                gradientStyle={Styles.gradientStyle}
                onPress={this.submitEmail}
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
)(ForgotPassword);
