/*
Name : Suraj Sanwal 
File Name : login.js
Description : Contains login screen.
Date : 11 Dec 2018
*/

import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FloatingInput from "../../components/common/FloatingInput";
import Header from "../../components/common/Header";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import AuthButton from "../../components/common/AuthButton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    let title = `ACT HOME HEALTH SERVICES, INC.
    NURSE PORTAL`;
    return (
      <View style={Styles.containner}>
        <Header title={title} hideBack hideDrawer />
        <ScrollView>
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
          <AuthButton buttonName={"Login"} />
        </ScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  },
  FloatingInputContainer: {
    paddingVertical: moderateScale(40),
    paddingHorizontal: moderateScale(25),
    justifyContent: "flex-start"
  }
});

export default Login;
