import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { Text, StyleSheet, Platform } from "react-native";
import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import LinearGradient from "react-native-linear-gradient";
import ResourceButton from "../../Common/ResourcesButton";

const RenderForms = props => {
  let { item, key, onFormPress, printable } = props;
  return (
    <LinearGradient
      key={key}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={Constants.Colors.PdfAndUrl}
      angle={280}
      useAngle
      locations={Platform.OS !== "android" ? [0.1] : null}
    >
      <View style={Styles.continer}>
        <Text style={Styles.formName}>{printable ? item.FormName : item.ResourceName}</Text>
        <ResourceButton
          source={printable ? Constants.Images.Downloads : Constants.Images.SearchInactive}
          onFormPress={onFormPress}
          formUrl={printable ? item.FormUrl : item.ResourceURL}
        />
      </View>
    </LinearGradient>
  );
};

export default RenderForms;

const Styles = StyleSheet.create({
  continer: {
    minHeight: moderateScale(40),
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(25),
    flexDirection: "row",
    alignItems: "center",
    marginVertical: moderateScale(10)
  },
  formName: {
    ...Constants.Fonts.Regular,
    fontSize: moderateScale(16),
    color: Constants.Colors.Primary
  },
  iconView: {
    height: moderateScale(40),
    width: moderateScale(40),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(10)
  },
  icon: { height: moderateScale(40), width: moderateScale(40) }
});

RenderForms.defaultProps = {
  item: {},
  key: null,
  onFormPress: null,
  printable: false
};

RenderForms.propTypes = {
  item: PropTypes.object,
  key: PropTypes.number,
  onFormPress: PropTypes.func,
  printable: PropTypes.bool
};
