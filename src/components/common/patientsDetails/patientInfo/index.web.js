import React from "react";
import PatientInfo from "./PatientInfo";

const MyPatientsDetails = props => {
  return (
    <div className={"PatientsDetails"}>
      <PatientInfo {...props} />
    </div>
  );
};

export default MyPatientsDetails;
