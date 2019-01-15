import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import RenderForms from "./RenderForms";
import DivContainer from "../common/DivContainer";

const RenderPrintableForms = props => {
  let { data } = props;
  return (
    <DivContainer className={"myClass"}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <RenderForms form={item} key={index} />
        )}
      />
    </DivContainer>
  );
};

export default RenderPrintableForms;

RenderPrintableForms.defaultProps = {
  data: []
};

RenderPrintableForms.propTypes = {
  data: PropTypes.array
};
