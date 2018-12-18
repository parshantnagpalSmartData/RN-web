/**
 * Name :Suraj Sanwal
 * File Name : SideMenu.js
 * Description : Contains the text input for the app
 * Date : 10 Sept 2018
 */
"use strict";

import React, { Component } from "react";
import { Image, View, TextInput, StyleSheet, Platform } from "react-native";

import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";

class FormTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      focusColor: Constants.Colors.Primary,
      borderWidth: 1
    };
  }

  // Function calls the parent class onBlur function
  onBlur() {
    this.setState({
      isFocused: false,
      focusColor: Constants.Colors.Secondary,
      borderWidth: 1
    });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onFocus() {
    let colour = this.props.focusColor
      ? this.props.focusColor
      : Constants.Colors.Secondary;
    this.setState({
      isFocused: true,
      focusColor: colour,
      borderWidth: 2
    });
    if (this.props.onFocus) this.props.onFocus();
  }

  focus() {
    this.inputBox.focus();
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    let {
      placeHolderText,
      placeHolderColor,
      keyboard,
      secureText,
      returnKey,
      onSubmitEditing,
      isPassword,
      multiline,
      inputStyle,
      autoFocus,
      editable,
      value,
      image,
      maximumLength,
      onChangeText
    } = this.props;
    return (
      <View
        style={[
          Styles.viewStyle,
          {
            borderBottomColor: this.state.focusColor,
            borderBottomWidth: this.state.borderWidth
          },
          this.props.style
        ]}
      >
        {image && (
          <View style={Styles.imgWrapper}>
            <Image
              source={image}
              style={Styles.imageStyle}
              resizeMode="contain"
            />
          </View>
        )}
        <TextInput
          ref={ref => (this.inputBox = ref || "inputbox")}
          autoFocus={autoFocus}
          underlineColorAndroid="transparent"
          style={[Styles.inputStyle, inputStyle]}
          blurOnSubmit={true}
          autoCapitalize={"none"}
          value={value}
          placeholder={placeHolderText}
          placeholderTextColor={placeHolderColor || Constants.Colors.Primary}
          keyboardType={keyboard}
          secureTextEntry={secureText || isPassword}
          editable={editable}
          onChangeText={onChangeText}
          onChange={event => this.onChange(event)}
          returnKeyType={returnKey}
          autoCorrect={false}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          multiline={multiline}
          maxLength={maximumLength}
        />
      </View>
    );
  }
}

export default FormTextInput;

const Styles = StyleSheet.create({
  viewStyle: {
    flexDirection: "row",
    borderColor: Constants.Colors.placehoder,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(15),
    marginHorizontal: moderateScale(25),
    justifyContent: "center"
    // alignItems: "center"
  },
  inputStyle: {
    flex: 1,
    color: Constants.Colors.Black,
    ...Constants.Fonts.Light,
    fontSize: moderateScale(16),
    margin: moderateScale(10),
    ...Platform.select({
      web: {
        outline: "none"
      }
    })
  },
  imgWrapper: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    height: moderateScale(25),
    width: moderateScale(25)
  }
});
