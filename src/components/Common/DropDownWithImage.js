/**
 * Name: Parshant Nagpal
 * File: DropDownWithImage.js
 * Date: 4 Feb 2019
 * Description:  Conatins the material dropdown With Image
 */

import React from "react";
import { Image } from "react-native";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import DropDownWeb from "./DropDownWeb";

const DropDownWithImage = ({
  value,
  handleChange,
  selectData,
  selectDataId
}) => {
  return (
    <div>
      <Image
        source={
          value === "inbox"
            ? Constants.Images.InboxActive
            : value === "sent"
            ? Constants.Images.SentActive
            : Constants.Images.TrashActive
        }
        style={{
          height: moderateScale(20),
          width: moderateScale(20)
        }}
      />
      <DropDownWeb
        value={value}
        selectDataId={selectDataId}
        handleChange={handleChange}
        selectData={selectData}
      />
    </div>
  );
};

export default DropDownWithImage;
