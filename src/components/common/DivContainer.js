/*
Name : Suraj Sanwal 
File Name : DivContainer.js
Description : Contains the div for childrens.
Date : 15 Jan 2019
*/

import React from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";

const DivContainer = props => {
  let { className } = props;
  if (Platform.OS === "web") {
    return <div className={className}>{props.children}</div>;
  } else {
    return <View>{props.children}</View>;
  }
};

export default DivContainer;

DivContainer.defaultProps = {
  className: null
};

DivContainer.propTypes = {
  className: PropTypes.string
};
