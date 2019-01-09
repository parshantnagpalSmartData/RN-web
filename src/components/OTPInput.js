/*
 * @file: otpInput.js
 * @description: Contains all Otp input component
 * @date: 9 January 2019
 * @author:Parshant Nagpal
 */

import React, { Component } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Constants from "../constants";
import _ from "lodash";
import { moderateScale } from "../helpers/ResponsiveFonts";

export class OTPInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code1: "",
      code2: "",
      code3: "",
      code4: ""
    };
  }

  /**
   * Detect key press and handle back pressing on text inputs.
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.otpValuelisten !== this.props.otpValuelisten) {
      this.setState({
        code1: nextProps.otpValuelisten[0],
        code2: nextProps.otpValuelisten[1],
        code3: nextProps.otpValuelisten[2],
        code4: nextProps.otpValuelisten[3]
      });
    }
  }
  onKeyPress = e => {
    let context = this;
    const { key } = e.nativeEvent;
    if (key === "Backspace") {
      if (context.ref2.isFocused()) {
        if (_.isEmpty(context.state.code2)) {
          context.ref1.focus();
        }
      }
      if (context.ref3.isFocused()) {
        if (_.isEmpty(context.state.code3)) {
          context.ref2.focus();
        }
      }
      if (context.ref4.isFocused()) {
        if (_.isEmpty(context.state.code4)) {
          context.ref3.focus();
        }
      }
    }
  };

  render() {
    const textAttri = {
      keyboardType: "numeric",
      style: styles.textInput,
      placeholder: "",
      placeholderTextColor: Constants.Colors.LightGray,
      maxLength: 1,
      onKeyPress: this.onKeyPress.bind(this),
      returnKeyType: "next",
      underlineColorAndroid: "transparent"
    };
    const { code1, code2, code3, code4 } = this.state;
    return (
      <View>
        <View style={styles.otpRow}>
          <View style={styles.otpView}>
            <TextInput
              ref={ref => (this.ref1 = ref)}
              {...textAttri}
              onChangeText={digit1 => {
                this.setState({ code1: digit1 });
                if (digit1.trim().length !== 0) {
                  this.ref2.focus();
                }

                this.props.returnOtP(digit1 + code2 + code3 + code4);
              }}
              value={this.state.code1}
            />
          </View>
          <View style={styles.otpView}>
            <TextInput
              ref={ref => (this.ref2 = ref)}
              {...textAttri}
              onChangeText={digit1 => {
                this.setState({ code2: digit1 });
                if (digit1.trim().length !== 0) {
                  this.ref3.focus();
                }
                this.props.returnOtP(code1 + digit1 + code3 + code4);
              }}
              value={this.state.code2}
            />
          </View>
          <View style={styles.otpView}>
            <TextInput
              ref={ref => (this.ref3 = ref)}
              {...textAttri}
              onChangeText={digit1 => {
                this.setState({ code3: digit1 });
                if (digit1.trim().length !== 0) {
                  this.ref4.focus();
                }
                this.props.returnOtP(code1 + code2 + digit1 + code4);
              }}
              value={this.state.code3}
            />
          </View>
          <View style={styles.otpView}>
            <TextInput
              ref={ref => (this.ref4 = ref)}
              {...textAttri}
              onChangeText={digit1 => {
                this.setState({ code4: digit1 });
                if (digit1.trim().length !== 0) {
                  this.ref1.focus();
                }
                this.props.returnOtP(code1 + code2 + code3 + digit1);
              }}
              value={this.state.code4}
            />
          </View>
        </View>
      </View>
    );
  }
}

/**
 * default styles
 * */
const styles = StyleSheet.create({
  otpView: {
    alignItems: "center",
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(10),
    borderBottomColor: Constants.Colors.Gray,
    borderBottomWidth: 1,
    height: moderateScale(85),
    width: moderateScale(60)
  },
  otpRow: {
    paddingHorizontal: moderateScale(30),
    flexDirection: "row",
    alignSelf: "center"
  },
  textInput: {
    ...Constants.Fonts.Regular,
    color: Constants.Colors.Primary
  }
});

/**
 * declare prop's specific JS type.
 * */
// TextInputCompo.propTypes = {
//   returnOtP: PropTypes.func
// };
// TextInputCompo.defaultProps = {
//   returnOtP: null
// };

export default OTPInput;
