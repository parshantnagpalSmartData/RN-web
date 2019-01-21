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

import * as appAction from "../../actions";
import FormTextInput from "../../components/common/FormTextInput";
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
      password: "",
      deviceWidth: window.innerWidth
    };
  }

  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  submitEmail = _.debounce(() => {
    let { appAction } = this.props;
    let { email } = this.state;
    if (_.isEmpty(email.trim())) {
      appAction.showToast(
        Constants.AppConstants.Notificaitons.Error,
        Constants.Strings.Common.EmptyEmailMsg
      );
      return;
    }
    if (!Regex.validateEmail(email.trim())) {
      appAction.showToast(
        Constants.AppConstants.Notificaitons.Error,
        Constants.Strings.Common.ValidEmailAddress
      );
      return;
    }
    appAction.forgotPassword({ username: email });
  });

  render() {
    let { deviceWidth } = this.state;
    let title = "ACT HOME HEALTH SERVICES";
    return (
      <View style={Styles.containner}>
        <Header title={title} hideDrawer onBackPress={this.onBackPress} />
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center"
          }}
        >
          <View
            style={{
              height:
                Platform.OS === "web"
                  ? Constants.BaseStyle.DEVICE_HEIGHT * 0.62
                  : Constants.BaseStyle.DEVICE_HEIGHT * 0.7,
              width:
                Platform.OS === "web"
                  ? deviceWidth > 600
                    ? deviceWidth / 2
                    : deviceWidth
                  : Constants.BaseStyle.DEVICE_WIDTH,
              justifyContent: "space-evenly",
              overflow: "hidden"
            }}
          >
            <View style={Styles.FloatingInputContainer}>
              <FormTextInput
                image={Constants.Images.Email}
                placeHolderText={"Username"}
                onChangeText={email => {
                  this.setState({ email });
                }}
                value={this.state.email}
                keyboardType={"email-address"}
                returnKeyType={"next"}
                autoCapitalize={"none"}
                ref={ref => (this.email = ref)}
                onSubmitEditing={() => {
                  this.submitEmail();
                }}
              />
            </View>

            <View
              style={{
                flex: 0.25,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <AuthButton
                buttonName={"Forgot Password"}
                gradientColors={Constants.Colors.ButtonGradients}
                //textStyle={{ color: "#fff" }}
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
    justifyContent: "center",
    backgroundColor: Constants.Colors.White
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
