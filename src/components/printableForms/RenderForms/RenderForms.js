import React from "React";
import { View } from "react-native";
import PropTypes from "prop-types";

import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import Constants from "../../../constants";
import { moderateScale } from "../../../helpers/ResponsiveFonts";
import LinearGradient from "react-native-linear-gradient";
import DivContainer from "../../common/DivContainer";

const RenderForms = props => {
  let { form, key, onFormPress } = props;
  return (
    <DivContainer class={"formGredient"}>
      <LinearGradient
        key={key}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={Constants.Colors.FormGredient}
        angle={280}
        useAngle
        locations={[0.1]}
      >
        <View style={Styles.continer}>
          <Text style={Styles.formName}>{form.FormName}</Text>
          <TouchableOpacity
            style={Styles.iconView}
            onPress={() => onFormPress()}
          >
            <Image
              source={Constants.Images.SearchInactive}
              resizeMode={"contain"}
              style={Styles.icon}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </DivContainer>
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
    marginVertical: moderateScale(3)
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
  form: {},
  key: null,
  onFormPress: null
};

RenderForms.propTypes = {
  form: PropTypes.object,
  key: PropTypes.number,
  onFormPress: PropTypes.func
};
