import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import RenderForms from "./RenderForms";

const RenderPrintableForms = props => {
  let { data, onFormPress } = props;
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <RenderForms form={item} key={index} onFormPress={onFormPress} />
      )}
    />
  );
};

export default RenderPrintableForms;

RenderPrintableForms.defaultProps = {
  data: [],
  onFormPress: null
};

RenderPrintableForms.propTypes = {
  data: PropTypes.array,
  onFormPress: PropTypes.func
};
