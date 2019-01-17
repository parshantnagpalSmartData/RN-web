/*
Name : Suraj Sanwal
File Name : OTPScreen.js
Description : Contains OTPScreen.
Date : 12 Sept 2018
*/
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import OtpInputs from "../../../modified_modules/react-native-otp-inputs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import AuthButton from "../../components/Common/AuthButton";
import Constants from "../../constants";
import Header from "../../components/Common/Header";
import LogoText from "../../components/Common/LogoText";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import DivContainer from "../../components/Common/DivContainer";

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
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{
            justifyContent: "space-around",
            alignItems: "center",
            flex: 1,
            flexDirection: "column"
          }}
        >
          <DivContainer className={"loginTopText"}>
            <LogoText
              containerStyle={Styles.logoStyle}
              heading="Verification"
              message="We have sent OTP in your mobile number. Please enter below"
            />
          </DivContainer>
          <DivContainer
            className={"otpinput"}
            styleApp={{
              height: moderateScale(80),
              alignItems: "center"
            }}
          >
            <OtpInputs
              handleChange={otp => {
                this.setState({ otp });
              }}
              numberOfInputs={4}
              keyboardType={"numeric"}
              containerStyles={{
                justifyContent: "center"
              }}
              inputContainerStyles={Styles.inputContainerStyles}
              underlineColorAndroid={Constants.Colors.Transparent}
              inputTextErrorColor={Constants.Colors.Primary}
              focusedBorderColor={Constants.Colors.Gray}
              inputStyles={{ color: Constants.Colors.Primary }}
            />
          </DivContainer>
          <DivContainer className={"verifyBTN"} styleApp={{}}>
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
          </DivContainer>

          <DivContainer
            styleWeb={Styles.resendOTP}
            styleApp={Styles.resendOTP}
            className={"resendOTP"}
          >
            <Text style={Styles.newUser}>{"Don't receive OTP?"}</Text>
            <Text style={Styles.resend}>{"Resend"}</Text>
          </DivContainer>
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
  logoStyle: {
    paddingVertical: moderateScale(10)
  },
  resendOTP: {
    flexDirection: "column",
    alignItems: "center",
    ...Platform.select({
      android: { top: moderateScale(20) }
    })
  },

  inputContainerStyles: {
    backgroundColor: Constants.Colors.Transparent,
    borderBottomColor: Constants.Colors.Gray,
    color: Constants.Colors.Primary,
    ...Platform.select({
      web: {
        backgroundColor: Constants.Colors.Gray,
        borderColor: Constants.Colors.Primary
      },
      android: { bottom: moderateScale(50) }
    })
  },
  buttonStyle: { flex: 1 },
  newUser: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(14),
    color: Constants.Colors.Gray,
    textAlign: "right",
    textAlignVertical: "center",
    // paddingTop: moderateScale(60),
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
