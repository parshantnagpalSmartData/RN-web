import React from "react";
import PatientsDetails from "./PatientsDetails";

const MyPatientsDetails = props => {
  return (
    <div className={"MyPatientsDetailsWrapper"}>
      <PatientsDetails {...props} />
    </div>
  );
};

export default MyPatientsDetails;
