import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import RenderForms from "./RenderForms";

const CommonUrlHandlerForms = props => {
  let { data, onFormPress, printable } = props;
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <RenderForms
          item={item}
          key={index}
          onFormPress={onFormPress}
          printable={printable}
        />
      )}
    />
  );
};

export default CommonUrlHandlerForms;

CommonUrlHandlerForms.defaultProps = {
  data: [],
  onFormPress: null,
  printable: false
};

CommonUrlHandlerForms.propTypes = {
  data: PropTypes.array,
  onFormPress: PropTypes.func,
  printable: PropTypes.bool
};
