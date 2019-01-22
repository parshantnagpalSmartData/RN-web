/**
 * @author Suraj Sanwal
 * @name DivContainer.js
 * @description Contains the div for childrens.
 * @date 15 Jan 2019
 */

import React from "react";
import { View, Platform } from "react-native";
import PropTypes from "prop-types";

/**
 * @function DivContainer return an div with class name for web
 * @prop described as @argument
 * @argument className for assign a div class in web
 * @argument styleApp for mobile based style
 * @argument hideFlex for hide flex in web part
 * @argument styleWeb for web based style
 */

const DivContainer = props => {
  let { className, styleApp, hideFlex, styleWeb } = props;
  if (Platform.OS === "web") {
    return (
      <div className={className}>
        <View style={[styleWeb, !hideFlex ? { flex: 1 } : null]}>
          {props.children}
        </View>
      </div>
    );
  } else {
    return <View style={[styleApp]}>{props.children}</View>;
  }
};

export default DivContainer;

DivContainer.defaultProps = {
  className: null,
  styleApp: null,
  styleWeb: null,
  hideFlex: false
};

DivContainer.propTypes = {
  className: PropTypes.string,
  styleApp: PropTypes.object,
  styleWeb: PropTypes.object,
  hideFlex: PropTypes.bool
};
