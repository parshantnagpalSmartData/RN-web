import React from "react";
import MyShifts from "./Shifts";

const Shifts = props => {
  return (
    <div className={"mainView"}>
      <MyShifts {...props} />
    </div>
  );
};

export default Shifts;
