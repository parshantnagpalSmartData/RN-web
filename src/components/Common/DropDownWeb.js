/**
 * Name: Parshant Nagpal
 * File : Select.js
 * Date : 4 Feb 2019
 * Description: Conatins the Material DropDown  component for web
 */

import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
const DropDownWeb = ({ value, handleChange, selectDataId, selectData }) => {
  return (
    <div>
      <Select
        value={value}
        inputProps={selectDataId}
        onChange={event => handleChange(event.target.value)}
      >
        {selectData.map((element, i) => {
          return (
            <MenuItem key={i} value={element.value}>
              {element.key}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
DropDownWeb.propTypes = {
  value: PropTypes.string,
  selectDataId: PropTypes.object,
  handleChange: PropTypes.func,
  selectData: PropTypes.array
};
DropDownWeb.defaultProps = {
  value: "",
  selectDataId: {},
  handleChange: null,
  selectData: []
};
export default DropDownWeb;
