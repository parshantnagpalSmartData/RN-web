/*
Name : Suraj Sanwal 
File Name : login.js
Description : Contains login screen.
Date : 11 Dec 2018
*/

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import * as AppAction from '../../actions'
import FloatingInput from "../../components/common/FloatingInput";
import Header from "../../components/common/Header";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import Regex from "../../helpers/Regex";

class Login extends Component {
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
    if (_.isEmpty(password.trim())) {
      // toastMessage(navigator, {
      //   type: Constants.AppCosntants.Notificaitons.Error,
      //   message: Constants.Strings.Common.EnterPassword
      // });
      alert(Constants.Strings.Common.EnterPassword);
      return;
    }
   
    console.log('Platform.OS',Platform.OS)
    this.props.dispatch(AppAction.login());
    if(Platform.OS !== 'web'){
     this.props.dispatch(AppAction.pushTParticulatScreen(this.props.componentId,'Screen2'));
    }else{
     this.props.dispatch(AppAction.pushTParticulatScreen('/Screen2'));
     
    // this.props.history.push("/about")
    }

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
                  ? Constants.BaseStyle.DEVICE_HEIGHT * 0.848
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
              <FloatingInput
                label={"Password"}
                onChangeText={password => {
                  this.setState({ password });
                }}
                value={this.state.password}
                returnKey="done"
                onSubmitEditing={() => {
                  this.onLoginPress();
                }}
                autoCapitalize={"none"}
                secureTextEntry
                ref={ref => (this.password = ref)}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text onPress={() => alert("under development")}>
                Forgot Password
              </Text>
            </View>
            <View>
              <AuthButton
                buttonName={"Login"}
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

const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction : bindActionCreators(AppAction,dispatch)  
})


export default connect(mapStateToProps,null)(Login);
