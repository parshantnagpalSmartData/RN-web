import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Constants from "../../constants";

const LinearGradientApp = props => {
  return (
    <LinearGradient
      key={props.index}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={Constants.Colors.SelectedMenu}
    >
      {props.children}
    </LinearGradient>
  );
};

export default LinearGradientApp;
