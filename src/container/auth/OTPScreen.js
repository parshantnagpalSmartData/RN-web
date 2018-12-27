/*
Name : Suraj Sanwal
File Name : OTPScreen.js
Description : Contains OTPScreen.
Date : 12 Sept 2018
*/
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import OtpInputs from "react-native-otp-inputs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import Header from "../../components/common/Header";
import LogoText from "../../components/common/LogoText";
import { moderateScale } from "../../helpers/ResponsiveFonts";

class OTPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: null
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  };
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };

  resendOTP = _.debounce(() => {
    let { _id } = this.props.user;
    let { navigator } = this.props;
    this.props.appAction.resendOTP({ userId: _id }, navigator);
  });

  verifyOTP = _.debounce(() => {
    let { otp } = this.state;
    let { user, appAction } = this.props;
    let { _id } = user;
    if (_.isEmpty(otp)) {
      appAction.showToast(
        Constants.AppConstants.Notificaitons.Error,
        Constants.Strings.Common.EnterOTP
      );
      return;
    }
    appAction.verifyOTP({ otpValue: parseInt(otp), userId: _id });
  });

  render() {
    return (
      <View style={Styles.container}>
        {Platform.OS !== "web" ? (
          <Header hideDrawer onBackPress={this.onBackPress} />
        ) : null}
        <LogoText
          containerStyle={Styles.logoStyle}
          heading="Verification"
          message="We have sent OTP in your mobile number. Please enter below"
        />
        <KeyboardAwareScrollView
          scrollEnabled={false}
          contentContainerStyle={{
            justifyContent: "space-between",
            height: Constants.BaseStyle.DEVICE_HEIGHT * 0.45,
            alignItems: "center",
            ...Platform.select({
              web: { top: moderateScale(100) }
            })
          }}
        >
          <OtpInputs
            handleChange={otp => {
              this.setState({ otp });
            }}
            numberOfInputs={4}
            keyboardType={"numeric"}
            inputContainerStyles={Styles.inputContainerStyles}
            underlineColorAndroid={Constants.Colors.Gray}
            inputTextErrorColor={Constants.Colors.Primary}
            focusedBorderColor={Constants.Colors.Gray}
            inputStyles={{ color: Constants.Colors.Primary }}
          />
          <AuthButton
            gradientColors={Constants.Colors.ButtonGradients}
            buttonName={"Verify"}
            buttonStyle={{
              ...Platform.select({
                web: {
                  top: moderateScale(15)
                }
              })
            }}
            onPress={() => {
              this.verifyOTP();
            }}
          />
          <View style={Styles.resendOTP}>
            <Text style={Styles.newUser}>{"Don't receive OTP?"}</Text>
            <Text style={Styles.resend}>{"Resend"}</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

// which props do we want to inject, given the global state?

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapperScroll: {
    // flex: 1,
    paddingHorizontal: moderateScale(30),
    justifyContent: "space-between"
  },
  wrapperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  logoStyle: {},
  scrollHeight: {
    height: Constants.BaseStyle.DEVICE_HEIGHT * 0.52,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  wrapper: { zIndex: 999, flex: 0.9 },
  resendOTP: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "column"
  },
  FloatingInputContainer: {
    flex: 0.4,
    justifyContent: "center"
  },
  inputContainerStyles: {
    backgroundColor: Constants.Colors.White,
    borderBottomColor: Constants.Colors.Gray,
    color: Constants.Colors.Primary,
    ...Platform.select({
      web: {
        backgroundColor: Constants.Colors.Gray,
        borderColor: Constants.Colors.Primary
      }
    })
  },
  otpImage: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 0.8
  },
  otpText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(20),
    color: Constants.Colors.Primary
  },
  authPolicyContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: moderateScale(5)
  },
  buttonStyle: { flex: 1 },
  signBtn: { flexDirection: "row", alignItems: "center" },
  signBtnStyle: {},
  signTxtStyle: {
    ...Constants.Fonts.Bold,
    fontSize: moderateScale(18),
    color: Constants.Colors.Primary,
    textDecorationLine: "underline"
  },
  policy: {
    justifyContent: "center"
  },
  policyText: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Primary,
    textAlign: "right",
    textAlignVertical: "center"
  },
  newUser: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(14),
    color: Constants.Colors.Gray,
    textAlign: "right",
    textAlignVertical: "center",
    paddingTop: moderateScale(60),
    ...Platform.select({
      web: {
        paddingTop: moderateScale(20)
      }
    })
  },
  resend: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Primary,
    textAlign: "right",
    textAlignVertical: "center",
    paddingVertical: moderateScale(10)
  }
});
function mapStateToProps(state) {
  return {
    user: state.user,
    loader: state.loader
  };
}

const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPScreen);
