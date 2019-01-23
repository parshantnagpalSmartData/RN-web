import React from "react";
import { TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import PropTypes from "prop-types";

const ResourceButton = ({ source, onFormPress, formUrl }) => {
  return (
    <TouchableOpacity
      style={Styles.iconView}
      onPress={() => onFormPress(formUrl)}
    >
      <Image source={source} resizeMode={"contain"} style={Styles.icon} />
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  iconView: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(10),
    ...Platform.select({
      web: {
        height: moderateScale(30),
        width: moderateScale(30)
      }
    })
  },
  icon: {
    height: moderateScale(40),
    width: moderateScale(40),
    ...Platform.select({
      web: {
        height: moderateScale(30),
        width: moderateScale(30)
      }
    })
  }
});

/**
 * declare prop's specific JS type.
 * */
ResourceButton.propTypes = {
  source: PropTypes.object.isRequired,
  onFormPress: PropTypes.func.isRequired,
  formUrl: PropTypes.string
};
ResourceButton.defaultProps = {
  source: null,
  onFormPress: null,
  formUrl: ""
};
export default ResourceButton;
